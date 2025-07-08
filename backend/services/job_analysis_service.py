
"""
Job analysis service using LangChain and LangGraph.
Analyzes job descriptions to extract requirements and structure.
"""

import logging
from typing import Dict, List, Any
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import HumanMessage, AIMessage
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolExecutor
from langchain.tools import tool
import json
import re
from models.schemas import JobAnalysis

logger = logging.getLogger(__name__)

class JobAnalysisState:
    """State for job analysis workflow"""
    def __init__(self):
        self.job_text: str = ""
        self.extracted_info: Dict[str, Any] = {}
        self.analysis_result: Dict[str, Any] = {}
        self.errors: List[str] = []

class JobAnalysisService:
    """Service for analyzing job descriptions using LangGraph agents"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.llm = ChatOpenAI(
            model="gpt-4-turbo-preview",
            temperature=0.1,
            max_tokens=2000
        )
        
        # Create the analysis workflow
        self.workflow = self._create_analysis_workflow()
    
    def _create_analysis_workflow(self) -> StateGraph:
        """Create LangGraph workflow for job analysis"""
        
        # Define the workflow steps
        workflow = StateGraph(JobAnalysisState)
        
        # Add nodes
        workflow.add_node("extract_basic_info", self._extract_basic_info)
        workflow.add_node("extract_requirements", self._extract_requirements)
        workflow.add_node("extract_skills", self._extract_skills)
        workflow.add_node("classify_job", self._classify_job)
        workflow.add_node("finalize_analysis", self._finalize_analysis)
        
        # Define the workflow edges
        workflow.add_edge("extract_basic_info", "extract_requirements")
        workflow.add_edge("extract_requirements", "extract_skills")
        workflow.add_edge("extract_skills", "classify_job")
        workflow.add_edge("classify_job", "finalize_analysis")
        workflow.add_edge("finalize_analysis", END)
        
        # Set entry point
        workflow.set_entry_point("extract_basic_info")
        
        return workflow.compile()
    
    async def analyze_job_description(self, job_text: str) -> Dict[str, Any]:
        """
        Analyze a job description using the LangGraph workflow.
        
        Args:
            job_text: Job description text to analyze
            
        Returns:
            Structured analysis results
        """
        try:
            self.logger.info("Starting job description analysis...")
            
            # Initialize state
            state = JobAnalysisState()
            state.job_text = job_text
            
            # Run the workflow
            result = await self.workflow.ainvoke(state)
            
            self.logger.info("Job description analysis completed")
            return result.analysis_result
            
        except Exception as e:
            self.logger.error(f"Error in job analysis: {str(e)}")
            raise
    
    def _extract_basic_info(self, state: JobAnalysisState) -> JobAnalysisState:
        """Extract basic job information (title, company, location)"""
        
        prompt = ChatPromptTemplate.from_template("""
        Extract the following basic information from this job description:
        
        Job Description:
        {job_text}
        
        Please extract and return a JSON object with:
        - title: Job title
        - company: Company name
        - location: Job location (if mentioned)
        - job_type: Type of job (full-time, part-time, contract, etc.)
        - salary_range: Salary range (if mentioned)
        
        Return only valid JSON.
        """)
        
        try:
            response = self.llm.invoke(prompt.format(job_text=state.job_text))
            basic_info = json.loads(response.content)
            state.extracted_info.update(basic_info)
            
        except Exception as e:
            self.logger.error(f"Error extracting basic info: {str(e)}")
            state.errors.append(f"Basic info extraction failed: {str(e)}")
            
        return state
    
    def _extract_requirements(self, state: JobAnalysisState) -> JobAnalysisState:
        """Extract job requirements and responsibilities"""
        
        prompt = ChatPromptTemplate.from_template("""
        Analyze this job description and extract requirements and responsibilities:
        
        Job Description:
        {job_text}
        
        Please extract and return a JSON object with:
        - responsibilities: List of key responsibilities
        - education_requirements: List of education requirements
        - experience_requirements: List of experience requirements (with years if mentioned)
        - certifications: List of required or preferred certifications
        
        Return only valid JSON.
        """)
        
        try:
            response = self.llm.invoke(prompt.format(job_text=state.job_text))
            requirements = json.loads(response.content)
            state.extracted_info.update(requirements)
            
        except Exception as e:
            self.logger.error(f"Error extracting requirements: {str(e)}")
            state.errors.append(f"Requirements extraction failed: {str(e)}")
            
        return state
    
    def _extract_skills(self, state: JobAnalysisState) -> JobAnalysisState:
        """Extract technical skills and competencies"""
        
        prompt = ChatPromptTemplate.from_template("""
        Analyze this job description and extract all technical skills and competencies:
        
        Job Description:
        {job_text}
        
        Please extract and return a JSON object with:
        - required_skills: List of explicitly required technical skills
        - preferred_skills: List of preferred or nice-to-have skills
        - tools_technologies: List of specific tools, technologies, or platforms mentioned
        - soft_skills: List of soft skills or interpersonal skills mentioned
        
        Focus on technical skills, programming languages, frameworks, tools, and methodologies.
        
        Return only valid JSON.
        """)
        
        try:
            response = self.llm.invoke(prompt.format(job_text=state.job_text))
            skills = json.loads(response.content)
            state.extracted_info.update(skills)
            
        except Exception as e:
            self.logger.error(f"Error extracting skills: {str(e)}")
            state.errors.append(f"Skills extraction failed: {str(e)}")
            
        return state
    
    def _classify_job(self, state: JobAnalysisState) -> JobAnalysisState:
        """Classify the job level and industry"""
        
        prompt = ChatPromptTemplate.from_template("""
        Analyze this job description and classify it:
        
        Job Description:
        {job_text}
        
        Please classify and return a JSON object with:
        - seniority_level: Level of seniority (entry, junior, mid, senior, principal, director, executive)
        - industry: Primary industry sector
        - job_function: Primary job function (engineering, management, consulting, etc.)
        - remote_work: Whether remote work is mentioned (yes/no/hybrid)
        
        Return only valid JSON.
        """)
        
        try:
            response = self.llm.invoke(prompt.format(job_text=state.job_text))
            classification = json.loads(response.content)
            state.extracted_info.update(classification)
            
        except Exception as e:
            self.logger.error(f"Error classifying job: {str(e)}")
            state.errors.append(f"Job classification failed: {str(e)}")
            
        return state
    
    def _finalize_analysis(self, state: JobAnalysisState) -> JobAnalysisState:
        """Finalize the analysis and create structured output"""
        
        # Create final analysis result
        analysis_result = {
            "title": state.extracted_info.get("title", "Unknown"),
            "company": state.extracted_info.get("company", "Unknown"),
            "location": state.extracted_info.get("location"),
            "job_type": state.extracted_info.get("job_type", "Unknown"),
            "salary_range": state.extracted_info.get("salary_range"),
            "seniority_level": state.extracted_info.get("seniority_level", "Unknown"),
            "industry": state.extracted_info.get("industry", "Unknown"),
            "job_function": state.extracted_info.get("job_function", "Unknown"),
            "remote_work": state.extracted_info.get("remote_work", "Unknown"),
            "responsibilities": state.extracted_info.get("responsibilities", []),
            "education_requirements": state.extracted_info.get("education_requirements", []),
            "experience_requirements": state.extracted_info.get("experience_requirements", []),
            "certifications": state.extracted_info.get("certifications", []),
            "required_skills": state.extracted_info.get("required_skills", []),
            "preferred_skills": state.extracted_info.get("preferred_skills", []),
            "tools_technologies": state.extracted_info.get("tools_technologies", []),
            "soft_skills": state.extracted_info.get("soft_skills", []),
            "analysis_metadata": {
                "processed_at": "2024-01-01T00:00:00Z",  # You'd use actual timestamp
                "errors": state.errors,
                "confidence_score": 0.85 if not state.errors else 0.6
            }
        }
        
        state.analysis_result = analysis_result
        return state

@tool
def extract_keywords_from_text(text: str) -> List[str]:
    """
    Tool to extract keywords from job description text.
    
    Args:
        text: Text to extract keywords from
        
    Returns:
        List of extracted keywords
    """
    # Simple keyword extraction - in practice, you'd use more sophisticated NLP
    keywords = []
    
    # Technical keywords
    tech_keywords = [
        'python', 'java', 'javascript', 'react', 'angular', 'vue', 'node.js',
        'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform',
        'jenkins', 'gitlab', 'github', 'jira', 'confluence',
        'sql', 'mongodb', 'postgresql', 'redis', 'elasticsearch',
        'machine learning', 'ai', 'data science', 'analytics',
        'cybersecurity', 'security', 'penetration testing', 'soc', 'siem'
    ]
    
    text_lower = text.lower()
    for keyword in tech_keywords:
        if keyword in text_lower:
            keywords.append(keyword)
    
    return keywords

@tool
def calculate_experience_years(requirement: str) -> int:
    """
    Tool to extract years of experience from requirement text.
    
    Args:
        requirement: Requirement text mentioning years
        
    Returns:
        Number of years extracted
    """
    # Extract years using regex
    years_pattern = r'(\d+)\s*(?:years?|yrs?)'
    match = re.search(years_pattern, requirement.lower())
    
    if match:
        return int(match.group(1))
    
    return 0
