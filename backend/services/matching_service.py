
"""
Matching service using LangChain and LangGraph.
Performs intelligent matching between job descriptions and resumes.
"""

import logging
from typing import Dict, List, Any, Tuple
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langgraph.graph import StateGraph, END
from langchain.tools import tool
import json
import re
from models.schemas import MatchResult, SkillMatch, ExperienceMatch

logger = logging.getLogger(__name__)

class MatchingState:
    """State for matching workflow"""
    def __init__(self):
        self.job_description: str = ""
        self.resume_data: Dict[str, Any] = {}
        self.skill_matches: List[SkillMatch] = []
        self.experience_matches: List[ExperienceMatch] = []
        self.overall_score: float = 0.0
        self.strengths: List[str] = []
        self.gaps: List[str] = []
        self.recommendations: List[str] = []
        self.summary: str = ""
        self.errors: List[str] = []

class MatchingService:
    """Service for matching job descriptions to resumes using LangGraph agents"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.llm = ChatOpenAI(
            model="gpt-4-turbo-preview",
            temperature=0.1,
            max_tokens=3000
        )
        
        # Create the matching workflow
        self.workflow = self._create_matching_workflow()
    
    def _create_matching_workflow(self) -> StateGraph:
        """Create LangGraph workflow for job-resume matching"""
        
        workflow = StateGraph(MatchingState)
        
        # Add nodes
        workflow.add_node("analyze_skills_match", self._analyze_skills_match)
        workflow.add_node("analyze_experience_match", self._analyze_experience_match)
        workflow.add_node("identify_strengths", self._identify_strengths)
        workflow.add_node("identify_gaps", self._identify_gaps)
        workflow.add_node("generate_recommendations", self._generate_recommendations)
        workflow.add_node("calculate_overall_score", self._calculate_overall_score)
        workflow.add_node("generate_summary", self._generate_summary)
        
        # Define edges
        workflow.add_edge("analyze_skills_match", "analyze_experience_match")
        workflow.add_edge("analyze_experience_match", "identify_strengths")
        workflow.add_edge("identify_strengths", "identify_gaps")
        workflow.add_edge("identify_gaps", "generate_recommendations")
        workflow.add_edge("generate_recommendations", "calculate_overall_score")
        workflow.add_edge("calculate_overall_score", "generate_summary")
        workflow.add_edge("generate_summary", END)
        
        # Set entry point
        workflow.set_entry_point("analyze_skills_match")
        
        return workflow.compile()
    
    async def match_job_to_resume(self, job_description: str, resume_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Match a job description to resume data using LangGraph workflow.
        
        Args:
            job_description: Job description text
            resume_data: Structured resume data
            
        Returns:
            Comprehensive match result
        """
        try:
            self.logger.info("Starting job-resume matching...")
            
            # Initialize state
            state = MatchingState()
            state.job_description = job_description
            state.resume_data = resume_data
            
            # Run the workflow
            result = await self.workflow.ainvoke(state)
            
            # Format final result
            match_result = {
                "overall_score": result.overall_score,
                "skill_matches": [skill.__dict__ for skill in result.skill_matches],
                "experience_matches": [exp.__dict__ for exp in result.experience_matches],
                "strengths": result.strengths,
                "gaps": result.gaps,
                "recommendations": result.recommendations,
                "summary": result.summary,
                "metadata": {
                    "processed_at": "2024-01-01T00:00:00Z",  # You'd use actual timestamp
                    "errors": result.errors,
                    "candidate_name": resume_data.get("name", "Unknown"),
                    "job_title": self._extract_job_title(job_description)
                }
            }
            
            self.logger.info("Job-resume matching completed")
            return match_result
            
        except Exception as e:
            self.logger.error(f"Error in job-resume matching: {str(e)}")
            raise
    
    def _analyze_skills_match(self, state: MatchingState) -> MatchingState:
        """Analyze skill matching between job and resume"""
        
        prompt = ChatPromptTemplate.from_template("""
        Analyze the skill match between this job description and resume:
        
        Job Description:
        {job_description}
        
        Resume Skills:
        {resume_skills}
        
        Resume Cybersecurity Domains:
        {cybersecurity_domains}
        
        Please analyze the skill match and return a JSON object with:
        - skill_matches: Array of objects with:
          - skill: skill name
          - required: true/false (whether required in job)
          - candidate_has: true/false (whether candidate has skill)
          - proficiency_level: estimated proficiency level
          - match_score: score from 0-1
        
        Focus on technical skills, tools, frameworks, and domain expertise.
        
        Return only valid JSON.
        """)
        
        try:
            # Format resume skills and domains
            resume_skills = state.resume_data.get("skills", [])
            cybersecurity_domains = state.resume_data.get("cybersecurity_domains", [])
            
            skills_text = ", ".join(resume_skills)
            domains_text = json.dumps(cybersecurity_domains, indent=2)
            
            response = self.llm.invoke(prompt.format(
                job_description=state.job_description,
                resume_skills=skills_text,
                cybersecurity_domains=domains_text
            ))
            
            skill_data = json.loads(response.content)
            
            # Convert to SkillMatch objects
            for skill_info in skill_data.get("skill_matches", []):
                skill_match = SkillMatch(
                    skill=skill_info["skill"],
                    required=skill_info["required"],
                    candidate_has=skill_info["candidate_has"],
                    proficiency_level=skill_info.get("proficiency_level"),
                    match_score=skill_info["match_score"]
                )
                state.skill_matches.append(skill_match)
                
        except Exception as e:
            self.logger.error(f"Error analyzing skills match: {str(e)}")
            state.errors.append(f"Skills match analysis failed: {str(e)}")
            
        return state
    
    def _analyze_experience_match(self, state: MatchingState) -> MatchingState:
        """Analyze experience matching between job and resume"""
        
        prompt = ChatPromptTemplate.from_template("""
        Analyze the experience match between this job description and resume:
        
        Job Description:
        {job_description}
        
        Resume Experience:
        {resume_experience}
        
        Please analyze the experience match and return a JSON object with:
        - experience_matches: Array of objects with:
          - domain: experience domain/area
          - years_required: years required (if mentioned)
          - years_candidate: estimated years candidate has
          - match_score: score from 0-1
        
        Focus on relevant experience domains, years of experience, and seniority level.
        
        Return only valid JSON.
        """)
        
        try:
            experience_text = json.dumps(state.resume_data.get("experience", []), indent=2)
            
            response = self.llm.invoke(prompt.format(
                job_description=state.job_description,
                resume_experience=experience_text
            ))
            
            experience_data = json.loads(response.content)
            
            # Convert to ExperienceMatch objects
            for exp_info in experience_data.get("experience_matches", []):
                experience_match = ExperienceMatch(
                    domain=exp_info["domain"],
                    years_required=exp_info.get("years_required"),
                    years_candidate=exp_info.get("years_candidate"),
                    match_score=exp_info["match_score"]
                )
                state.experience_matches.append(experience_match)
                
        except Exception as e:
            self.logger.error(f"Error analyzing experience match: {str(e)}")
            state.errors.append(f"Experience match analysis failed: {str(e)}")
            
        return state
    
    def _identify_strengths(self, state: MatchingState) -> MatchingState:
        """Identify candidate's key strengths for this role"""
        
        prompt = ChatPromptTemplate.from_template("""
        Based on this job description and resume analysis, identify the candidate's key strengths:
        
        Job Description:
        {job_description}
        
        Resume Summary:
        {resume_summary}
        
        Skills Analysis:
        {skills_analysis}
        
        Please identify 5-7 key strengths that make this candidate suitable for the role.
        Return as a JSON object with:
        - strengths: Array of strength descriptions
        
        Return only valid JSON.
        """)
        
        try:
            skills_analysis = json.dumps([skill.__dict__ for skill in state.skill_matches], indent=2)
            
            response = self.llm.invoke(prompt.format(
                job_description=state.job_description,
                resume_summary=state.resume_data.get("summary", ""),
                skills_analysis=skills_analysis
            ))
            
            strengths_data = json.loads(response.content)
            state.strengths = strengths_data.get("strengths", [])
            
        except Exception as e:
            self.logger.error(f"Error identifying strengths: {str(e)}")
            state.errors.append(f"Strengths identification failed: {str(e)}")
            
        return state
    
    def _identify_gaps(self, state: MatchingState) -> MatchingState:
        """Identify gaps between job requirements and candidate qualifications"""
        
        prompt = ChatPromptTemplate.from_template("""
        Based on this job description and resume analysis, identify key gaps:
        
        Job Description:
        {job_description}
        
        Skills Analysis:
        {skills_analysis}
        
        Experience Analysis:
        {experience_analysis}
        
        Please identify 3-5 key gaps or areas where the candidate may need development.
        Return as a JSON object with:
        - gaps: Array of gap descriptions
        
        Return only valid JSON.
        """)
        
        try:
            skills_analysis = json.dumps([skill.__dict__ for skill in state.skill_matches], indent=2)
            experience_analysis = json.dumps([exp.__dict__ for exp in state.experience_matches], indent=2)
            
            response = self.llm.invoke(prompt.format(
                job_description=state.job_description,
                skills_analysis=skills_analysis,
                experience_analysis=experience_analysis
            ))
            
            gaps_data = json.loads(response.content)
            state.gaps = gaps_data.get("gaps", [])
            
        except Exception as e:
            self.logger.error(f"Error identifying gaps: {str(e)}")
            state.errors.append(f"Gaps identification failed: {str(e)}")
            
        return state
    
    def _generate_recommendations(self, state: MatchingState) -> MatchingState:
        """Generate recommendations for the candidate"""
        
        prompt = ChatPromptTemplate.from_template("""
        Based on the analysis, generate actionable recommendations for this candidate:
        
        Job Description:
        {job_description}
        
        Strengths:
        {strengths}
        
        Gaps:
        {gaps}
        
        Please provide 5-7 specific, actionable recommendations for how the candidate can improve their match for this role.
        Return as a JSON object with:
        - recommendations: Array of recommendation descriptions
        
        Return only valid JSON.
        """)
        
        try:
            response = self.llm.invoke(prompt.format(
                job_description=state.job_description,
                strengths=json.dumps(state.strengths),
                gaps=json.dumps(state.gaps)
            ))
            
            recommendations_data = json.loads(response.content)
            state.recommendations = recommendations_data.get("recommendations", [])
            
        except Exception as e:
            self.logger.error(f"Error generating recommendations: {str(e)}")
            state.errors.append(f"Recommendations generation failed: {str(e)}")
            
        return state
    
    def _calculate_overall_score(self, state: MatchingState) -> MatchingState:
        """Calculate overall match score"""
        
        try:
            # Calculate weighted score based on skills and experience
            skill_scores = [skill.match_score for skill in state.skill_matches]
            experience_scores = [exp.match_score for exp in state.experience_matches]
            
            # Weight skills and experience
            avg_skill_score = sum(skill_scores) / len(skill_scores) if skill_scores else 0.0
            avg_experience_score = sum(experience_scores) / len(experience_scores) if experience_scores else 0.0
            
            # Weighted average (60% skills, 40% experience)
            overall_score = (avg_skill_score * 0.6) + (avg_experience_score * 0.4)
            
            # Apply penalties for major gaps
            if len(state.gaps) > 5:
                overall_score *= 0.9  # 10% penalty for many gaps
            
            state.overall_score = min(max(overall_score, 0.0), 1.0)  # Clamp to [0, 1]
            
        except Exception as e:
            self.logger.error(f"Error calculating overall score: {str(e)}")
            state.errors.append(f"Overall score calculation failed: {str(e)}")
            state.overall_score = 0.5  # Default score
            
        return state
    
    def _generate_summary(self, state: MatchingState) -> MatchingState:
        """Generate executive summary of the match"""
        
        prompt = ChatPromptTemplate.from_template("""
        Generate an executive summary of this job-candidate match:
        
        Overall Score: {overall_score}
        
        Key Strengths:
        {strengths}
        
        Key Gaps:
        {gaps}
        
        Candidate Name: {candidate_name}
        Job Title: {job_title}
        
        Please write a 2-3 paragraph executive summary that covers:
        1. Overall assessment and recommendation
        2. Key strengths and how they align with the role
        3. Areas for development and next steps
        
        Return as a JSON object with:
        - summary: The executive summary text
        
        Return only valid JSON.
        """)
        
        try:
            response = self.llm.invoke(prompt.format(
                overall_score=f"{state.overall_score:.1%}",
                strengths=json.dumps(state.strengths[:3]),  # Top 3 strengths
                gaps=json.dumps(state.gaps[:3]),  # Top 3 gaps
                candidate_name=state.resume_data.get("name", "The candidate"),
                job_title=self._extract_job_title(state.job_description)
            ))
            
            summary_data = json.loads(response.content)
            state.summary = summary_data.get("summary", "Analysis completed successfully.")
            
        except Exception as e:
            self.logger.error(f"Error generating summary: {str(e)}")
            state.errors.append(f"Summary generation failed: {str(e)}")
            state.summary = f"Overall match score: {state.overall_score:.1%}. Analysis completed with some limitations."
            
        return state
    
    def _extract_job_title(self, job_description: str) -> str:
        """Extract job title from job description"""
        lines = job_description.split('\n')
        for line in lines[:5]:
            if line.strip() and len(line.strip()) > 5:
                return line.strip()
        return "Unknown Position"

@tool
def calculate_skill_similarity(skill1: str, skill2: str) -> float:
    """
    Calculate similarity between two skills.
    
    Args:
        skill1: First skill
        skill2: Second skill
        
    Returns:
        Similarity score from 0-1
    """
    # Simple similarity - in practice, you'd use more sophisticated matching
    skill1_lower = skill1.lower()
    skill2_lower = skill2.lower()
    
    if skill1_lower == skill2_lower:
        return 1.0
    
    # Check for partial matches
    if skill1_lower in skill2_lower or skill2_lower in skill1_lower:
        return 0.8
    
    # Check for common abbreviations/variations
    skill_variants = {
        'js': 'javascript',
        'ts': 'typescript',
        'k8s': 'kubernetes',
        'aws': 'amazon web services',
        'gcp': 'google cloud platform'
    }
    
    normalized_skill1 = skill_variants.get(skill1_lower, skill1_lower)
    normalized_skill2 = skill_variants.get(skill2_lower, skill2_lower)
    
    if normalized_skill1 == normalized_skill2:
        return 0.9
    
    return 0.0
