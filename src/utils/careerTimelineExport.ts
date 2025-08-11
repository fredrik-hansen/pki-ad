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
        ${experiences
          .map((exp) => {
            const parsePeriod = (period: string): [string, string] => {
              // Examples: "2019", "2019 - 2023", "2023 - Present"
              if (!period.includes(' - ')) {
                return [`${period}-01`, `${period}-12`];
              }
              const [startRaw, endRaw] = period.split(' - ').map((p) => p.trim());
              const start = `${startRaw}-01`;
              const end = endRaw.toLowerCase().includes('present') ? 'current' : `${endRaw}-12`;
              return [start, end];
            };

            const [startLabel, endLabel] = parsePeriod(exp.period);

            const nameEl = document.querySelector('[data-name]') as HTMLElement | null;
            const authorName = nameEl?.getAttribute('data-name') || 'My';

            const toSentence = (s: string) => (s.endsWith('.') ? s : `${s}.`);
            const lowerFirst = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
            const stripTrailingPunct = (s: string) => s.replace(/[\.;:!\s]+$/g, '');

            const companyDescription = exp.industry
              ? `${exp.company} is a ${exp.industry.toLowerCase()}.`
              : `${exp.company} is an organization.`;

            const firstHighlight = exp.highlights?.[0] || '';
            const responsibility = firstHighlight
              ? `${authorName}’s responsibility was to ${lowerFirst(stripTrailingPunct(firstHighlight))}.`
              : '';

            const allText = (exp.highlights || []).join(' ').toLowerCase();
            const techKeywords = [
              'react',
              'python',
              'cuda',
              'kubernetes',
              'gitlab',
              'github',
              'opensearch',
              'memgraph',
              'dnssec',
              'rpki',
              'pki',
              'iso 27001',
              'gdpr',
              'pci dss',
              'cspm',
              'neovim',
              'zed',
              'aws',
              'azure',
              'gcp',
              'node',
              'typescript',
              'javascript'
            ];
            const capitalize = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);
            const techFound = techKeywords
              .filter((k) => allText.includes(k))
              .map((k) => (k === 'iso 27001' ? 'ISO 27001' : k === 'pci dss' ? 'PCI DSS' : k.toUpperCase() === k ? k : capitalize(k)));
            const techEnv = techFound.join(', ');

            return `
          <div class="experience-item">
            <div class="date-range">
              <div class="date-pill">${startLabel}</div>
              <div class="date-pill">${endLabel}</div>
            </div>
            <div class="experience-content">
              <div class="company-title">
                <div class="company-name">${exp.company}</div>
                <div class="job-title">${exp.title}</div>
              </div>
              <div class="description">
                <p>${toSentence(companyDescription)}</p>
                ${responsibility ? `<p>${toSentence(responsibility)}</p>` : ''}
                ${techEnv ? `<p><span class="label-strong">Technical environment:</span> ${techEnv}</p>` : ''}
              </div>
            </div>
          </div>`;
          })
          .join('')}
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
        :root {
          --bg: #0b0b0b;
          --fg: #e7e2d6;
          --muted: #c2bbad;
          --gold: #c5a463;
          --gold-dark: #6b5a2e;
          --panel: #111111;
          --border: #2a2a2a;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Georgia, "Times New Roman", serif;
          background: var(--bg);
          color: var(--fg);
          padding: 40px 20px;
          line-height: 1.6;
        }

        .container { max-width: 1200px; margin: 0 auto; }

        .header { margin-bottom: 28px; border-bottom: 1px solid var(--border); padding-bottom: 16px; }
        .main-title { font-size: 2rem; font-weight: 700; color: var(--fg); }
        .subtitle { font-size: 1rem; color: var(--muted); }

        .section { margin-top: 18px; }
        .section-title { display: none; }

        .experience-item {
          display: flex;
          gap: 24px;
          padding: 20px 0 28px 0;
          border-bottom: 1px solid var(--border);
        }

        .date-range { min-width: 140px; display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
        .date-pill {
          background: var(--gold-dark);
          color: #0b0b0b;
          font-weight: 800;
          letter-spacing: 0.5px;
          padding: 4px 8px;
          border-radius: 3px;
          font-size: 0.95rem;
        }

        .experience-content { flex: 1; }
        .company-title { margin-bottom: 8px; }
        .company-name { color: var(--gold); font-size: 1.25rem; font-weight: 700; }
        .job-title { color: var(--fg); font-size: 1rem; font-weight: 600; margin-top: -2px; }

        .description p { margin: 14px 0; color: var(--fg); }
        .label-strong { font-weight: 700; color: var(--fg); }

        @media print {
          body { background: white; color: #111; }
          .date-pill { color: #111; background: #e5d5b0; }
          .company-name { color: #8b6b2f; }
          .experience-item { border-color: #ddd; }
        }

        @media (max-width: 768px) {
          .experience-item { flex-direction: column; }
          .date-range { flex-direction: row; gap: 8px; }
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