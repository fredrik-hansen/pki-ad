
# Job Description Matcher API

A FastAPI backend service that uses LangChain and LangGraph to analyze job descriptions and match them against resume documents (DOCX format). The service provides intelligent analysis, scoring, and recommendations.

## Features

- **Job Description Analysis**: Parse and extract requirements from job descriptions
- **Resume Processing**: Extract structured data from DOCX resume files
- **Intelligent Matching**: Use LangGraph agents to match jobs to resumes
- **Comprehensive Scoring**: Multi-dimensional scoring with detailed feedback
- **Actionable Recommendations**: Generate specific improvement suggestions

## Prerequisites

- Python 3.9+
- OpenAI API key (for LLM functionality)
- Virtual environment (recommended)

## Installation

1. **Clone and Setup**:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Configure Environment**:
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

3. **Run the Server**:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Health Check
- `GET /` - Basic health check
- `GET /health` - Detailed health check with service status

### Job Analysis
- `POST /analyze/job-description` - Analyze a job description
  ```json
  {
    "job_description": "Software Engineer position at TechCorp..."
  }
  ```

### Resume Processing
- `POST /upload/resume` - Upload and process a DOCX resume
  - Form data with file upload

### Job Matching
- `POST /match/job-to-resume` - Match job to resume
  ```json
  {
    "job_description": "Job description text...",
    "resume_data": {...}
  }
  ```

### Complete Analysis
- `POST /analyze/complete` - End-to-end analysis
  - Form data with file upload and job description

## Architecture

### LangGraph Workflows

The service uses LangGraph to create intelligent agent workflows:

1. **Job Analysis Workflow**:
   - Extract basic info (title, company, location)
   - Extract requirements and responsibilities
   - Extract skills and technologies
   - Classify job level and industry
   - Finalize structured analysis

2. **Matching Workflow**:
   - Analyze skill matches
   - Analyze experience matches
   - Identify strengths
   - Identify gaps
   - Generate recommendations
   - Calculate overall score
   - Generate executive summary

### Services

- **DocumentService**: DOCX resume processing and text extraction
- **JobAnalysisService**: Job description analysis using LangGraph
- **MatchingService**: Job-resume matching with scoring and recommendations

## Data Models

### Job Analysis Output
```json
{
  "title": "Senior Software Engineer",
  "company": "TechCorp",
  "required_skills": ["Python", "React", "AWS"],
  "preferred_skills": ["Docker", "Kubernetes"],
  "seniority_level": "senior",
  "industry": "technology",
  "responsibilities": [...],
  "education_requirements": [...],
  "experience_requirements": [...]
}
```

### Match Result Output
```json
{
  "overall_score": 0.85,
  "skill_matches": [
    {
      "skill": "Python",
      "required": true,
      "candidate_has": true,
      "proficiency_level": "Expert",
      "match_score": 0.9
    }
  ],
  "experience_matches": [...],
  "strengths": ["Strong Python expertise", "Relevant cloud experience"],
  "gaps": ["Limited React experience", "No Kubernetes exposure"],
  "recommendations": ["Consider React training", "Gain Kubernetes certification"],
  "summary": "Strong candidate with 85% match..."
}
```

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: Required for LLM functionality
- `DEBUG`: Enable debug mode
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)
- `CORS_ORIGINS`: Allowed CORS origins
- `LOG_LEVEL`: Logging level (INFO, DEBUG, WARNING, ERROR)

### LLM Configuration

The service uses OpenAI's GPT-4 Turbo by default. You can modify the model in the service classes:

```python
self.llm = ChatOpenAI(
    model="gpt-4-turbo-preview",
    temperature=0.1,
    max_tokens=2000
)
```

## Usage Examples

### Analyze Job Description
```bash
curl -X POST "http://localhost:8000/analyze/job-description" \
  -H "Content-Type: application/json" \
  -d '{"job_description": "Senior Software Engineer position..."}'
```

### Upload Resume
```bash
curl -X POST "http://localhost:8000/upload/resume" \
  -F "file=@resume.docx"
```

### Complete Analysis
```bash
curl -X POST "http://localhost:8000/analyze/complete" \
  -F "file=@resume.docx" \
  -F "job_description=Senior Software Engineer position..."
```

## Development

### Adding New Features

1. **New Analysis Step**: Add nodes to the LangGraph workflow
2. **New Data Fields**: Update Pydantic models in `models/schemas.py`
3. **Custom Tools**: Add tools for specific analysis tasks
4. **Alternative LLMs**: Modify service initialization to use different providers

### Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest tests/
```

### Performance Optimization

- **Caching**: Add Redis caching for repeated analyses
- **Parallel Processing**: Use asyncio for concurrent LLM calls
- **Model Optimization**: Fine-tune prompts for better accuracy
- **Batch Processing**: Process multiple resumes simultaneously

## Deployment

### Docker Deployment
```bash
# Build image
docker build -t job-matcher-api .

# Run container
docker run -p 8000:8000 --env-file .env job-matcher-api
```

### Production Considerations

- Use environment-specific configurations
- Implement rate limiting
- Add authentication/authorization
- Set up monitoring and logging
- Configure load balancing for high traffic

## Troubleshooting

### Common Issues

1. **OpenAI API Errors**: Check API key and quota
2. **DOCX Processing Errors**: Ensure file format is correct
3. **Memory Issues**: Reduce batch sizes or add memory limits
4. **CORS Issues**: Configure allowed origins properly

### Logs

Check application logs for detailed error information:
```bash
tail -f logs/app.log
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper tests
4. Submit a pull request

## License

This project is licensed under the MIT License.
