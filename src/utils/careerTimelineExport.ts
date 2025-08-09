import { experiences } from '../components/experience/ExperienceData';

// Format period to match screenshot format (YYYY-MM to YYYY-MM)
const formatPeriod = (period: string): string => {
  // Handle "Present" case
  if (period.includes('Present')) {
    const startYear = period.split(' - ')[0];
    return `${startYear}-01 to Present`;
  }
  
  // Handle single year (e.g., "2019")
  if (!period.includes(' - ')) {
    return `${period}-01 to ${period}-12`;
  }
  
  // Handle year ranges (e.g., "2019 - 2023")
  const [startYear, endYear] = period.split(' - ').map(y => y.trim());
  return `${startYear}-01 to ${endYear}-12`;
};

// Categorize experiences
const categorizeExperiences = () => {
  const workExperience: typeof experiences = [];
  const employment: typeof experiences = [];
  
  experiences.forEach(exp => {
    // Consulting, speaking, research roles go to work experience
    if (
      exp.title.toLowerCase().includes('consultant') ||
      exp.title.toLowerCase().includes('speaker') ||
      exp.title.toLowerCase().includes('researcher') ||
      exp.title.toLowerCase().includes('advisor') ||
      exp.title.toLowerCase().includes('expert') ||
      exp.company.includes('Digital Companion') ||
      exp.company.includes('IS3C') ||
      exp.company.includes('UN Internet') ||
      exp.company.includes('Swedish Institute') ||
      exp.company.includes("Afric'up") ||
      exp.company.includes('TrueSec')
    ) {
      workExperience.push(exp);
    } else {
      employment.push(exp);
    }
  });
  
  return { workExperience, employment };
};

export const generateCareerTimelineExport = () => {
  const { workExperience, employment } = categorizeExperiences();
  
  const generateSection = (title: string, experiences: typeof workExperience) => {
    return `
      <div class="section">
        <h2 class="section-title">${title}</h2>
        ${experiences.map(exp => `
          <div class="experience-item">
            <div class="date-range">${formatPeriod(exp.period)}</div>
            <div class="experience-content">
              <div class="company-title">
                <div class="company-name">${exp.company}</div>
                <div class="job-title">${exp.title}</div>
                <div class="industry">${exp.industry}</div>
              </div>
              <div class="highlights">
                ${exp.highlights.slice(0, 2).map(highlight => `
                  <div class="highlight">• ${highlight}</div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  };
  
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Career Timeline Export</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #0f172a;
          color: #e2e8f0;
          padding: 40px 20px;
          line-height: 1.6;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 2px solid #334155;
        }
        
        .main-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }
        
        .subtitle {
          font-size: 1.2rem;
          color: #94a3b8;
        }
        
        .section {
          margin-bottom: 50px;
        }
        
        .section-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 30px;
          padding-left: 20px;
          border-left: 4px solid #3b82f6;
        }
        
        .experience-item {
          display: flex;
          margin-bottom: 30px;
          padding: 25px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid #334155;
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .experience-item:hover {
          border-color: #3b82f6;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15);
          transform: translateY(-2px);
        }
        
        .date-range {
          min-width: 180px;
          margin-right: 30px;
          font-weight: 600;
          color: #60a5fa;
          font-size: 0.95rem;
          padding-right: 20px;
          border-right: 2px solid #334155;
          display: flex;
          align-items: flex-start;
          padding-top: 2px;
        }
        
        .experience-content {
          flex: 1;
        }
        
        .company-title {
          margin-bottom: 15px;
        }
        
        .company-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 5px;
        }
        
        .job-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #06b6d4;
          margin-bottom: 3px;
        }
        
        .industry {
          font-size: 0.9rem;
          color: #94a3b8;
          font-style: italic;
        }
        
        .highlights {
          margin-top: 15px;
        }
        
        .highlight {
          margin-bottom: 8px;
          color: #cbd5e1;
          font-size: 0.95rem;
          padding-left: 10px;
        }
        
        @media print {
          body {
            background: white;
            color: black;
          }
          
          .main-title {
            -webkit-text-fill-color: #1e40af;
          }
          
          .experience-item {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
          }
          
          .section-title {
            color: #1e293b;
            border-left-color: #3b82f6;
          }
          
          .company-name {
            color: #1e293b;
          }
          
          .job-title {
            color: #0891b2;
          }
          
          .date-range {
            color: #3b82f6;
            border-right-color: #e2e8f0;
          }
          
          .highlight {
            color: #475569;
          }
          
          .industry {
            color: #64748b;
          }
        }
        
        @media (max-width: 768px) {
          .experience-item {
            flex-direction: column;
          }
          
          .date-range {
            min-width: auto;
            margin-right: 0;
            margin-bottom: 15px;
            border-right: none;
            border-bottom: 2px solid #334155;
            padding-bottom: 10px;
            padding-right: 0;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="main-title">Career Timeline</h1>
          <p class="subtitle">Professional Experience Overview</p>
        </div>
        
        ${generateSection('Work Experience', workExperience)}
        ${generateSection('Employment', employment)}
      </div>
    </body>
    </html>
  `;
  
  // Create and download the HTML file
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'career-timeline-export.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};