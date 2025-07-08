
"""
FastAPI backend for job description analysis and matching.
Uses LangChain and LangGraph to create intelligent agents that can:
1. Parse job descriptions (LinkedIn format)
2. Analyze DOCX resume documents
3. Generate match summaries with scoring
"""

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Dict, List, Optional
import os
from dotenv import load_dotenv
import logging

from services.document_service import DocumentService
from services.job_analysis_service import JobAnalysisService
from services.matching_service import MatchingService
from models.schemas import JobDescription, MatchResult, AnalysisRequest

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Job Description Matcher API",
    description="AI-powered job description analysis and resume matching using LangChain and LangGraph",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
document_service = DocumentService()
job_analysis_service = JobAnalysisService()
matching_service = MatchingService()

@app.on_event("startup")
async def startup_event():
    """Initialize services on startup"""
    logger.info("Starting Job Description Matcher API...")
    
    # Verify required environment variables
    required_vars = ["OPENAI_API_KEY"]
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        logger.error(f"Missing required environment variables: {missing_vars}")
        raise RuntimeError(f"Missing required environment variables: {missing_vars}")
    
    logger.info("API started successfully")

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Job Description Matcher API is running"}

@app.get("/health")
async def health_check():
    """Health check with service status"""
    return {
        "status": "healthy",
        "services": {
            "document_service": "active",
            "job_analysis_service": "active",
            "matching_service": "active"
        }
    }

@app.post("/analyze/job-description")
async def analyze_job_description(request: AnalysisRequest):
    """
    Analyze a job description and extract key requirements.
    
    Args:
        request: AnalysisRequest containing job description text
        
    Returns:
        Analyzed job description with extracted requirements
    """
    try:
        logger.info("Analyzing job description...")
        
        # Use LangGraph agent to analyze job description
        analysis_result = await job_analysis_service.analyze_job_description(
            request.job_description
        )
        
        return JSONResponse(
            status_code=200,
            content={
                "status": "success",
                "analysis": analysis_result,
                "message": "Job description analyzed successfully"
            }
        )
        
    except Exception as e:
        logger.error(f"Error analyzing job description: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error analyzing job description: {str(e)}"
        )

@app.post("/upload/resume")
async def upload_resume(file: UploadFile = File(...)):
    """
    Upload and process a DOCX resume document.
    
    Args:
        file: DOCX file upload
        
    Returns:
        Processed resume data
    """
    try:
        logger.info(f"Processing uploaded resume: {file.filename}")
        
        # Validate file type
        if not file.filename.endswith('.docx'):
            raise HTTPException(
                status_code=400,
                detail="Only DOCX files are supported"
            )
        
        # Read and process the document
        content = await file.read()
        resume_data = await document_service.process_docx_resume(content)
        
        return JSONResponse(
            status_code=200,
            content={
                "status": "success",
                "resume_data": resume_data,
                "message": "Resume processed successfully"
            }
        )
        
    except Exception as e:
        logger.error(f"Error processing resume: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing resume: {str(e)}"
        )

@app.post("/match/job-to-resume")
async def match_job_to_resume(request: Dict):
    """
    Match a job description to a resume and generate a comprehensive match summary.
    
    Args:
        request: Dictionary containing job_description and resume_data
        
    Returns:
        Match result with scoring and recommendations
    """
    try:
        logger.info("Matching job description to resume...")
        
        job_description = request.get("job_description")
        resume_data = request.get("resume_data")
        
        if not job_description or not resume_data:
            raise HTTPException(
                status_code=400,
                detail="Both job_description and resume_data are required"
            )
        
        # Use LangGraph agent to perform intelligent matching
        match_result = await matching_service.match_job_to_resume(
            job_description, resume_data
        )
        
        return JSONResponse(
            status_code=200,
            content={
                "status": "success",
                "match_result": match_result,
                "message": "Job matching completed successfully"
            }
        )
        
    except Exception as e:
        logger.error(f"Error matching job to resume: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error matching job to resume: {str(e)}"
        )

@app.post("/analyze/complete")
async def complete_analysis(file: UploadFile = File(...), job_description: str = None):
    """
    Complete end-to-end analysis: upload resume, analyze job description, and generate match.
    
    Args:
        file: DOCX resume file
        job_description: Job description text (can be from form data)
        
    Returns:
        Complete analysis with match results
    """
    try:
        logger.info("Starting complete analysis workflow...")
        
        if not job_description:
            raise HTTPException(
                status_code=400,
                detail="Job description is required"
            )
        
        # Step 1: Process resume
        content = await file.read()
        resume_data = await document_service.process_docx_resume(content)
        
        # Step 2: Analyze job description
        job_analysis = await job_analysis_service.analyze_job_description(job_description)
        
        # Step 3: Generate match
        match_result = await matching_service.match_job_to_resume(
            job_description, resume_data
        )
        
        return JSONResponse(
            status_code=200,
            content={
                "status": "success",
                "resume_data": resume_data,
                "job_analysis": job_analysis,
                "match_result": match_result,
                "message": "Complete analysis finished successfully"
            }
        )
        
    except Exception as e:
        logger.error(f"Error in complete analysis: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error in complete analysis: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
