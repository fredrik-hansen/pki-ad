
"""
Document processing service for handling DOCX resume files.
Extracts and structures resume data for analysis.
"""

import docx
from typing import Dict, List, Any
import re
import io
import logging
from models.schemas import ResumeData

logger = logging.getLogger(__name__)

class DocumentService:
    """Service for processing DOCX resume documents"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    async def process_docx_resume(self, content: bytes) -> Dict[str, Any]:
        """
        Process a DOCX resume file and extract structured data.
        
        Args:
            content: DOCX file content as bytes
            
        Returns:
            Structured resume data dictionary
        """
        try:
            # Load the DOCX document
            doc = docx.Document(io.BytesIO(content))
            
            # Extract text content
            full_text = []
            for paragraph in doc.paragraphs:
                if paragraph.text.strip():
                    full_text.append(paragraph.text.strip())
            
            # Join all text
            text_content = '\n'.join(full_text)
            
            # Extract structured data
            resume_data = {
                "name": self._extract_name(text_content),
                "title": self._extract_title(text_content),
                "summary": self._extract_summary(text_content),
                "email": self._extract_email(text_content),
                "location": self._extract_location(text_content),
                "skills": self._extract_skills(text_content),
                "experience": self._extract_experience(text_content),
                "education": self._extract_education(text_content),
                "certifications": self._extract_certifications(text_content),
                "languages": self._extract_languages(text_content),
                "cybersecurity_domains": self._extract_cybersecurity_domains(text_content),
                "operating_systems": self._extract_operating_systems(text_content),
                "raw_text": text_content
            }
            
            self.logger.info("Successfully processed DOCX resume")
            return resume_data
            
        except Exception as e:
            self.logger.error(f"Error processing DOCX resume: {str(e)}")
            raise

    def _extract_name(self, text: str) -> str:
        """Extract candidate name from resume text"""
        lines = text.split('\n')
        # Usually the name is in the first few lines and is in all caps or title case
        for line in lines[:5]:
            if line.strip() and len(line.strip()) > 2:
                # Skip lines that look like titles or contact info
                if not any(keyword in line.lower() for keyword in ['email', 'phone', 'linkedin', 'github', '@']):
                    return line.strip()
        return "Unknown"
    
    def _extract_title(self, text: str) -> str:
        """Extract professional title from resume text"""
        lines = text.split('\n')
        # Look for common title patterns after the name
        for i, line in enumerate(lines[:10]):
            if any(keyword in line.lower() for keyword in ['engineer', 'developer', 'manager', 'analyst', 'consultant', 'specialist', 'architect']):
                return line.strip()
        return "Professional"
    
    def _extract_summary(self, text: str) -> str:
        """Extract professional summary from resume text"""
        # Look for summary section
        summary_patterns = [
            r'SUMMARY\s*[:\-_]*\s*(.*?)(?=\n\s*[A-Z][A-Z\s]{3,}|\n\s*\n|\Z)',
            r'PROFESSIONAL SUMMARY\s*[:\-_]*\s*(.*?)(?=\n\s*[A-Z][A-Z\s]{3,}|\n\s*\n|\Z)',
            r'EXECUTIVE SUMMARY\s*[:\-_]*\s*(.*?)(?=\n\s*[A-Z][A-Z\s]{3,}|\n\s*\n|\Z)'
        ]
        
        for pattern in summary_patterns:
            match = re.search(pattern, text, re.DOTALL | re.IGNORECASE)
            if match:
                return match.group(1).strip()
        
        # If no summary section found, return first paragraph that's not name/title
        lines = text.split('\n')
        for line in lines[2:]:
            if len(line.strip()) > 100:  # Assume summary is substantial
                return line.strip()
        
        return "Experienced professional with expertise in cybersecurity and technology."
    
    def _extract_email(self, text: str) -> str:
        """Extract email address from resume text"""
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        match = re.search(email_pattern, text)
        return match.group(0) if match else None
    
    def _extract_location(self, text: str) -> str:
        """Extract location from resume text"""
        # Look for location patterns
        location_patterns = [
            r'([A-Z][a-z]+,\s*[A-Z]{2,})',  # City, State
            r'([A-Z][a-z]+,\s*[A-Z][a-z]+)',  # City, Country
        ]
        
        for pattern in location_patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(1)
        
        return None
    
    def _extract_skills(self, text: str) -> List[str]:
        """Extract technical skills from resume text"""
        # Common cybersecurity and technical skills
        common_skills = [
            'Python', 'Java', 'JavaScript', 'C++', 'SQL', 'Docker', 'Kubernetes',
            'AWS', 'Azure', 'GCP', 'Linux', 'Windows', 'MacOS', 'FreeBSD', 'OpenBSD',
            'SIEM', 'SOC', 'IDS', 'IPS', 'Firewall', 'VPN', 'PKI', 'SAST', 'DAST',
            'Penetration Testing', 'Vulnerability Assessment', 'Risk Management',
            'Incident Response', 'Threat Intelligence', 'Malware Analysis',
            'Network Security', 'Cloud Security', 'Application Security',
            'Identity Management', 'Access Control', 'Cryptography',
            'ISO 27001', 'NIST', 'PCI DSS', 'GDPR', 'SOC 2', 'ITIL'
        ]
        
        found_skills = []
        text_lower = text.lower()
        
        for skill in common_skills:
            if skill.lower() in text_lower:
                found_skills.append(skill)
        
        return found_skills
    
    def _extract_experience(self, text: str) -> List[Dict[str, Any]]:
        """Extract work experience from resume text"""
        # Look for experience section
        experience_pattern = r'PROFESSIONAL EXPERIENCE\s*[:\-_]*\s*(.*?)(?=\n\s*[A-Z][A-Z\s]{3,}|\Z)'
        match = re.search(experience_pattern, text, re.DOTALL | re.IGNORECASE)
        
        experiences = []
        if match:
            experience_text = match.group(1)
            # Split by common job entry patterns
            job_entries = re.split(r'\n(?=[A-Z].*\|.*\|)', experience_text)
            
            for entry in job_entries:
                if entry.strip():
                    lines = entry.strip().split('\n')
                    if lines:
                        # Parse title, company, period from first line
                        first_line = lines[0]
                        parts = first_line.split('|')
                        if len(parts) >= 3:
                            experiences.append({
                                'title': parts[0].strip(),
                                'company': parts[1].strip(),
                                'period': parts[2].strip(),
                                'description': '\n'.join(lines[1:]).strip()
                            })
        
        return experiences
    
    def _extract_education(self, text: str) -> List[Dict[str, Any]]:
        """Extract education information from resume text"""
        # This is a simplified extraction - in practice, you'd want more sophisticated parsing
        education = []
        
        # Look for degree keywords
        degree_keywords = ['Bachelor', 'Master', 'PhD', 'MBA', 'BS', 'MS', 'University', 'College']
        lines = text.split('\n')
        
        for line in lines:
            if any(keyword in line for keyword in degree_keywords):
                education.append({
                    'degree': line.strip(),
                    'institution': 'Unknown',
                    'year': 'Unknown'
                })
        
        return education
    
    def _extract_certifications(self, text: str) -> List[Dict[str, Any]]:
        """Extract certifications from resume text"""
        certifications = []
        
        # Look for certification keywords
        cert_keywords = ['CISSP', 'CISM', 'CISA', 'CEH', 'OSCP', 'Security+', 'Network+', 'ITIL', 'PMP']
        
        for keyword in cert_keywords:
            if keyword in text:
                certifications.append({
                    'name': keyword,
                    'issuer': 'Unknown',
                    'date': 'Unknown'
                })
        
        return certifications
    
    def _extract_languages(self, text: str) -> List[Dict[str, Any]]:
        """Extract language skills from resume text"""
        # Look for language section
        language_pattern = r'LANGUAGES\s*[:\-_]*\s*(.*?)(?=\n\s*[A-Z][A-Z\s]{3,}|\n\s*\n|\Z)'
        match = re.search(language_pattern, text, re.DOTALL | re.IGNORECASE)
        
        languages = []
        if match:
            language_text = match.group(1)
            # Parse language entries
            for line in language_text.split('\n'):
                if line.strip() and ' - ' in line:
                    parts = line.split(' - ')
                    if len(parts) >= 2:
                        languages.append({
                            'name': parts[0].strip(),
                            'level': parts[1].strip()
                        })
        
        return languages
    
    def _extract_cybersecurity_domains(self, text: str) -> List[Dict[str, Any]]:
        """Extract cybersecurity domain expertise from resume text"""
        # Look for cybersecurity domains section
        domains_pattern = r'CYBERSECURITY DOMAIN EXPERTISE\s*[:\-_]*\s*(.*?)(?=\n\s*[A-Z][A-Z\s]{3,}|\Z)'
        match = re.search(domains_pattern, text, re.DOTALL | re.IGNORECASE)
        
        domains = []
        if match:
            domains_text = match.group(1)
            # Parse domain entries - this would need to be customized based on your format
            current_domain = None
            for line in domains_text.split('\n'):
                if line.strip():
                    if '(expert)' in line.lower() or '(advanced)' in line.lower():
                        current_domain = {
                            'category': line.strip(),
                            'level': 'expert' if '(expert)' in line.lower() else 'advanced',
                            'skills': []
                        }
                        domains.append(current_domain)
                    elif current_domain and line.strip():
                        # Add skills to current domain
                        skills = [skill.strip() for skill in line.split('•') if skill.strip()]
                        current_domain['skills'].extend(skills)
        
        return domains
    
    def _extract_operating_systems(self, text: str) -> List[Dict[str, Any]]:
        """Extract operating systems experience from resume text"""
        # Look for operating systems section
        os_pattern = r'OPERATING SYSTEMS\s*[:\-_]*\s*(.*?)(?=\n\s*[A-Z][A-Z\s]{3,}|\Z)'
        match = re.search(os_pattern, text, re.DOTALL | re.IGNORECASE)
        
        operating_systems = []
        if match:
            os_text = match.group(1)
            # Parse OS entries
            for line in os_text.split('\n'):
                if line.strip() and '•' in line:
                    os_name = line.replace('•', '').strip()
                    operating_systems.append({
                        'name': os_name,
                        'level': 'Expert',  # Default - you'd parse this from the text
                        'experience': 'Years of experience'
                    })
        
        return operating_systems
