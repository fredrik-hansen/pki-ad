
"""
Pydantic models for request/response schemas.
Defines the data structures used throughout the API.
"""

from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from datetime import datetime

class JobDescription(BaseModel):
    """Schema for job description input"""
    title: str = Field(..., description="Job title")
    company: str = Field(..., description="Company name")
    description: str = Field(..., description="Full job description text")
    requirements: Optional[List[str]] = Field(None, description="Extracted requirements")
    location: Optional[str] = Field(None, description="Job location")
    salary_range: Optional[str] = Field(None, description="Salary information")

class AnalysisRequest(BaseModel):
    """Schema for job description analysis request"""
    job_description: str = Field(..., description="Job description text to analyze")

class SkillMatch(BaseModel):
    """Schema for individual skill matching"""
    skill: str = Field(..., description="Skill name")
    required: bool = Field(..., description="Whether skill is required")
    candidate_has: bool = Field(..., description="Whether candidate has this skill")
    proficiency_level: Optional[str] = Field(None, description="Candidate's proficiency level")
    match_score: float = Field(..., description="Match score for this skill (0-1)")

class ExperienceMatch(BaseModel):
    """Schema for experience matching"""
    domain: str = Field(..., description="Experience domain")
    years_required: Optional[int] = Field(None, description="Required years of experience")
    years_candidate: Optional[int] = Field(None, description="Candidate's years of experience")
    match_score: float = Field(..., description="Match score for this experience (0-1)")

class MatchResult(BaseModel):
    """Schema for complete match result"""
    overall_score: float = Field(..., description="Overall match score (0-1)")
    skills_match: List[SkillMatch] = Field(..., description="Individual skill matches")
    experience_match: List[ExperienceMatch] = Field(..., description="Experience matches")
    strengths: List[str] = Field(..., description="Candidate's key strengths for this role")
    gaps: List[str] = Field(..., description="Areas where candidate may need development")
    recommendations: List[str] = Field(..., description="Recommendations for the candidate")
    summary: str = Field(..., description="Executive summary of the match")

class ResumeData(BaseModel):
    """Schema for processed resume data"""
    name: str = Field(..., description="Candidate name")
    title: str = Field(..., description="Professional title")
    summary: str = Field(..., description="Professional summary")
    email: Optional[str] = Field(None, description="Email address")
    location: Optional[str] = Field(None, description="Location")
    skills: List[str] = Field(default_factory=list, description="Technical skills")
    experience: List[Dict[str, Any]] = Field(default_factory=list, description="Work experience")
    education: List[Dict[str, Any]] = Field(default_factory=list, description="Education")
    certifications: List[Dict[str, Any]] = Field(default_factory=list, description="Certifications")
    languages: List[Dict[str, Any]] = Field(default_factory=list, description="Languages")

class JobAnalysis(BaseModel):
    """Schema for job description analysis results"""
    title: str = Field(..., description="Job title")
    company: str = Field(..., description="Company name")
    required_skills: List[str] = Field(..., description="Required technical skills")
    preferred_skills: List[str] = Field(..., description="Preferred skills")
    required_experience: List[str] = Field(..., description="Required experience areas")
    education_requirements: List[str] = Field(..., description="Education requirements")
    responsibilities: List[str] = Field(..., description="Key responsibilities")
    seniority_level: str = Field(..., description="Seniority level (entry, mid, senior, etc.)")
    industry: str = Field(..., description="Industry sector")
    job_type: str = Field(..., description="Job type (full-time, contract, etc.)")
    location: Optional[str] = Field(None, description="Job location")
    salary_range: Optional[str] = Field(None, description="Salary range if mentioned")
