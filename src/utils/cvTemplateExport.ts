import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { speakingEngagements } from '../data/speakingEngagements';
import { projectTechnologies } from '../data/aiProjects';
import {
  languages,
  highlights,
  industries,
  operatingSystems,
  cybersecurityDomains,
  certificates,
  recognition
} from '../data/profileData';

const extractTextFromElement = (element: Element | null): string => {
  if (!element) return '';
  return element.textContent?.trim() || '';
};

const extractDataFromPage = () => {
  // Extract personal information from DOM
  const name = extractTextFromElement(document.querySelector('[data-name]'));
  const title = extractTextFromElement(document.querySelector('[data-title]'));
  const summary = extractTextFromElement(document.querySelector('[data-summary]'));

  // Extract contact information
  const email = document.querySelector('[data-email]')?.getAttribute('data-email') || '';
  const location = document.querySelector('[data-location]')?.getAttribute('data-location') || '';

  // Extract professional roles from DOM
  const roleElements = document.querySelectorAll('[data-role]');
  const professionalRoles = Array.from(roleElements).map(el => ({
    role: extractTextFromElement(el.querySelector('h4')),
    description: extractTextFromElement(el.querySelector('p'))
  }));

  // Extract volunteer work from DOM
  const volunteerElements = document.querySelectorAll('[data-volunteer-role]');
  const volunteerWork = Array.from(volunteerElements).map(el => ({
    title: el.getAttribute('data-title') || '',
    organization: el.getAttribute('data-organization') || '',
    period: el.getAttribute('data-period') || '',
    description: el.getAttribute('data-description') || '',
    impact: el.getAttribute('data-impact') || ''
  }));

  // Extract current role information
  const currentRole = extractTextFromElement(document.querySelector('[data-current-role]'));
  const availability = extractTextFromElement(document.querySelector('[data-availability]'));
  const specialization = extractTextFromElement(document.querySelector('[data-specialization]'));

  // Extract professional experience from the Experience section
  const experienceSection = document.querySelector('#experience');
  let experiences: any[] = [];
  if (experienceSection) {
    const expCards = experienceSection.querySelectorAll('.group.relative');
    experiences = Array.from(expCards).map(card => {
      const titleElement = card.querySelector('h3');
      const companyElement = card.querySelector('.text-blue-400.font-medium');
      const periodElement = card.querySelector('.text-slate-400.text-sm');
      const industryElement = card.querySelector('.text-slate-500.text-xs');
      const highlightElements = card.querySelectorAll('.flex.items-start.space-x-2 p');

      return {
        title: extractTextFromElement(titleElement),
        company: extractTextFromElement(companyElement),
        period: extractTextFromElement(periodElement),
        industry: extractTextFromElement(industryElement),
        highlights: Array.from(highlightElements).map(el => extractTextFromElement(el))
      };
    });
  }

  // Extract AI projects from DOM
  const aiProjectElements = document.querySelectorAll('[data-ai-project]');
  const aiProjects = Array.from(aiProjectElements).map(el => ({
    name: el.getAttribute('data-project-name') || '',
    category: el.getAttribute('data-category') || '',
    year: el.getAttribute('data-year') || '',
    description: el.getAttribute('data-description') || '',
    technologies: (el.getAttribute('data-technologies') || '').split(', ').filter(t => t)
  }));

  return {
    name,
    title,
    summary,
    email,
    location,
    // Use imported data directly - single source of truth
    highlights,
    industries,
    languages,
    operatingSystems,
    cybersecurityDomains,
    certifications: certificates,
    recognition,
    // DOM-extracted data
    volunteerWork,
    speakingEngagements,
    professionalRoles,
    currentRole,
    availability,
    specialization,
    experiences,
    aiProjects,
    languages
  };
};

// Template 1: Executive Summary Focus - Complete 3-page layout
const generateExecutiveTemplate = (data: any) => {
  const doc = new Document({
    sections: [
      {
        // PAGE 1: Header, Summary, and Core Competencies
        properties: {},
        children: [
          // Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.name.toUpperCase(),
                bold: true,
                size: 48,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.title,
                size: 28,
                font: "Arial",
                color: "666666"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${data.email} | ${data.location}`,
                size: 20,
                font: "Arial"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          // Executive Summary
          new Paragraph({
            children: [
              new TextRun({
                text: "EXECUTIVE SUMMARY",
                bold: true,
                size: 24,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "_".repeat(80),
                color: "2C5AA0"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({
                text: data.summary,
                size: 18,
                font: "Arial"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          // Key Achievements
          new Paragraph({
            children: [
              new TextRun({
                text: "KEY ACHIEVEMENTS",
                bold: true,
                size: 20,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          ...data.highlights.map((highlight: string) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `▶ ${highlight}`,
                  size: 16,
                  font: "Arial"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Core Competencies
          new Paragraph({
            children: [
              new TextRun({
                text: "CORE COMPETENCIES",
                bold: true,
                size: 20,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          ...data.cybersecurityDomains.map((domain: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${domain.category}`,
                  bold: true,
                  size: 16,
                  font: "Arial"
                }),
                new TextRun({
                  text: ` (${domain.level})`,
                  size: 14,
                  font: "Arial",
                  color: "666666"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Professional Roles
          new Paragraph({
            children: [
              new TextRun({
                text: "KEY PROFESSIONAL ROLES",
                bold: true,
                size: 20,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          ...data.professionalRoles.map((role: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `▶ ${role.role}: `,
                  bold: true,
                  size: 16,
                  font: "Arial"
                }),
                new TextRun({
                  text: role.description,
                  size: 16,
                  font: "Arial"
                })
              ]
            })
          )
        ]
      },
      
      {
        // PAGE 2: Professional Experience
        properties: {},
        children: [
          new Paragraph({ children: [new PageBreak()] }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL EXPERIENCE",
                bold: true,
                size: 24,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.experiences.flatMap((exp: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.title} | ${exp.company}`,
                  bold: true,
                  size: 18,
                  font: "Arial"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.period} | ${exp.industry}`,
                  size: 14,
                  font: "Arial",
                  color: "666666"
                })
              ]
            }),
            ...exp.highlights.map((highlight: string) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${highlight}`,
                    size: 14,
                    font: "Arial"
                  })
                ]
              })
            ),
            new Paragraph({ text: "" })
          ]),

          // AI & Personal Projects
          ...(data.aiProjects && data.aiProjects.length > 0 ? [
            new Paragraph({ children: [new PageBreak()] }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "AI & PERSONAL PROJECTS",
                  bold: true,
                  size: 24,
                  font: "Arial",
                  color: "2C5AA0"
                })
              ]
            }),
            new Paragraph({ text: "" }),
            ...data.aiProjects.flatMap((project: any) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.name,
                    bold: true,
                    size: 18,
                    font: "Arial"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${project.category} | ${project.year}`,
                    size: 14,
                    font: "Arial",
                    color: "666666",
                    italics: true
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.description,
                    size: 14,
                    font: "Arial"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Technologies: ",
                    bold: true,
                    size: 13,
                    font: "Arial"
                  }),
                  new TextRun({
                    text: project.technologies.join(', '),
                    size: 13,
                    font: "Arial",
                    color: "475569"
                  })
                ]
              }),
              new Paragraph({ text: "" })
            ])
          ] : []),

          // Key Technologies Section
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({
                text: "KEY TECHNOLOGIES",
                bold: true,
                size: 20,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          ...Object.entries(projectTechnologies).flatMap(([category, techs]) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${category}: `,
                  bold: true,
                  size: 14,
                  font: "Arial"
                }),
                new TextRun({
                  text: techs.join(', '),
                  size: 14,
                  font: "Arial",
                  color: "475569"
                })
              ]
            })
          ])
        ]
      },

      {
        // PAGE 3: Additional Qualifications
        properties: {},
        children: [
          new Paragraph({ children: [new PageBreak()] }),

          // Certifications
          new Paragraph({
            children: [
              new TextRun({
                text: "CERTIFICATIONS & CREDENTIALS",
                bold: true,
                size: 20,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.certifications.map((cert: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `▶ ${cert.title}`,
                  bold: true,
                  size: 16,
                  font: "Arial"
                }),
                new TextRun({
                  text: ` - ${cert.issuer} (${cert.date})`,
                  size: 14,
                  font: "Arial",
                  color: "666666"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Languages and Operating Systems
          new Paragraph({
            children: [
              new TextRun({
                text: "LANGUAGES & TECHNICAL PROFICIENCY",
                bold: true,
                size: 20,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Languages: ",
                bold: true,
                size: 16,
                font: "Arial"
              }),
              new TextRun({
                text: data.languages.map((lang: any) => `${lang.name} (${lang.level})`).join(", "),
                size: 16,
                font: "Arial"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Operating Systems:",
                bold: true,
                size: 16,
                font: "Arial"
              })
            ]
          }),
          ...data.operatingSystems.map((os: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `▶ ${os.name} (${os.level}) - ${os.experience}`,
                  size: 14,
                  font: "Arial"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Volunteer Work
          new Paragraph({
            children: [
              new TextRun({
                text: "VOLUNTEER WORK & COMMUNITY ENGAGEMENT",
                bold: true,
                size: 20,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.volunteerWork.map((volunteer: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `▶ ${volunteer.title}`,
                  bold: true,
                  size: 16,
                  font: "Arial"
                }),
                new TextRun({
                  text: ` | ${volunteer.organization} (${volunteer.period})`,
                  size: 14,
                  font: "Arial",
                  color: "666666"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: volunteer.description,
                  size: 14,
                  font: "Arial"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]).flat(),
          
          // Speaking Engagements
          new Paragraph({
            children: [
              new TextRun({
                text: "SPEAKING ENGAGEMENTS",
                bold: true,
                size: 20,
                font: "Arial",
                color: "2C5AA0"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.speakingEngagements.map((engagement: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `▶ ${engagement.topic}`,
                  bold: true,
                  size: 14,
                  font: "Arial"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `   ${engagement.event}, ${engagement.location}`,
                  size: 14,
                  font: "Arial",
                  color: "666666"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `   ${engagement.description}`,
                  size: 12,
                  font: "Arial"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]).flat()
        ]
      }
    ]
  });
  return doc;
};

// Template 2: Technical Skills Focus - Complete 3-page layout
const generateTechnicalTemplate = (data: any) => {
  const doc = new Document({
    sections: [
      {
        // PAGE 1: Header and Technical Domains
        properties: {},
        children: [
          // Header
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: data.name.toUpperCase(),
                bold: true,
                size: 40,
                font: "Consolas",
                color: "1a1a1a"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `>>> ${data.title}`,
                size: 24,
                font: "Consolas",
                color: "0066cc"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `>>> Contact: ${data.email} | Location: ${data.location}`,
                size: 16,
                font: "Consolas"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          // Summary in code style
          new Paragraph({
            children: [
              new TextRun({
                text: "=== PROFESSIONAL SUMMARY ===",
                bold: true,
                size: 20,
                font: "Consolas",
                color: "0066cc"
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: data.summary,
                size: 14,
                font: "Consolas"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          // Technical Skills Matrix
          new Paragraph({
            children: [
              new TextRun({
                text: "=== CYBERSECURITY DOMAIN EXPERTISE ===",
                bold: true,
                size: 20,
                font: "Consolas",
                color: "0066cc"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.cybersecurityDomains.map((domain: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `[${domain.level.toUpperCase()}] ${domain.category}`,
                  bold: true,
                  size: 16,
                  font: "Consolas"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `    Technologies: ${domain.domains.join(" | ")}`,
                  size: 12,
                  font: "Consolas",
                  color: "333333"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]).flat(),
          
          // Operating Systems
          new Paragraph({
            children: [
              new TextRun({
                text: "=== OPERATING SYSTEMS PROFICIENCY ===",
                bold: true,
                size: 20,
                font: "Consolas",
                color: "0066cc"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.operatingSystems.map((os: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `${os.name.padEnd(20)} [${os.level}] ${os.experience}`,
                  size: 14,
                  font: "Consolas"
                })
              ]
            })
          )
        ]
      },
      
      {
        // PAGE 2: Experience and Professional Roles
        properties: {},
        children: [
          new Paragraph({ children: [new PageBreak()] }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "=== PROFESSIONAL EXPERIENCE ===",
                bold: true,
                size: 20,
                font: "Consolas",
                color: "0066cc"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.experiences.flatMap((exp: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `>>> ${exp.title}`,
                  bold: true,
                  size: 16,
                  font: "Consolas",
                  color: "0066cc"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `    Company: ${exp.company} | Period: ${exp.period}`,
                  size: 14,
                  font: "Consolas"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `    Industry: ${exp.industry}`,
                  size: 14,
                  font: "Consolas",
                  color: "666666"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "    Achievements:",
                  size: 14,
                  font: "Consolas",
                  color: "666666"
                })
              ]
            }),
            ...exp.highlights.map((highlight: string) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `    - ${highlight}`,
                    size: 12,
                    font: "Consolas"
                  })
                ]
              })
            ),
            new Paragraph({ text: "" })
          ]),
          
          // Professional Roles
          new Paragraph({
            children: [
              new TextRun({
                text: "=== KEY PROFESSIONAL ROLES ===",
                bold: true,
                size: 20,
                font: "Consolas",
                color: "0066cc"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.professionalRoles.map((role: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `>>> ${role.role}`,
                  bold: true,
                  size: 14,
                  font: "Consolas"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `    ${role.description}`,
                  size: 12,
                  font: "Consolas"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]).flat(),

          // AI & Personal Projects
          ...(data.aiProjects && data.aiProjects.length > 0 ? [
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "=== AI & PERSONAL PROJECTS ===",
                  bold: true,
                  size: 20,
                  font: "Consolas",
                  color: "0066cc"
                })
              ]
            }),
            new Paragraph({ text: "" }),
            ...data.aiProjects.flatMap((project: any) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `>>> ${project.name}`,
                    bold: true,
                    size: 16,
                    font: "Consolas",
                    color: "0066cc"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `    Category: ${project.category} | Year: ${project.year}`,
                    size: 14,
                    font: "Consolas"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `    ${project.description}`,
                    size: 12,
                    font: "Consolas"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `    Tech Stack: ${project.technologies.join(' | ')}`,
                    size: 12,
                    font: "Consolas",
                    color: "475569"
                  })
                ]
              }),
              new Paragraph({ text: "" })
            ])
          ] : [])
        ]
      },

      {
        // PAGE 3: Certifications, Languages, and Additional Info
        properties: {},
        children: [
          new Paragraph({ children: [new PageBreak()] }),

          // Certifications in code style
          new Paragraph({
            children: [
              new TextRun({
                text: "=== CERTIFICATIONS & CREDENTIALS ===",
                bold: true,
                size: 20,
                font: "Consolas",
                color: "0066cc"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.certifications.map((cert: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${cert.title} | ${cert.issuer} | ${cert.date}`,
                  size: 14,
                  font: "Consolas"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Languages
          new Paragraph({
            children: [
              new TextRun({
                text: "=== LANGUAGES ===",
                bold: true,
                size: 20,
                font: "Consolas",
                color: "0066cc"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.languages.map((lang: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `${lang.name.padEnd(15)} [${lang.level}]`,
                  size: 14,
                  font: "Consolas"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Volunteer Work
          new Paragraph({
            children: [
              new TextRun({
                text: "=== VOLUNTEER_WORK & COMMUNITY_ENGAGEMENT ===",
                bold: true,
                size: 18,
                font: "Consolas",
                color: "0066cc"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.volunteerWork.map((volunteer: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `>>> ${volunteer.title}`,
                  bold: true,
                  size: 14,
                  font: "Consolas"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `    Organization: ${volunteer.organization} | Period: ${volunteer.period}`,
                  size: 12,
                  font: "Consolas"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `    Description: ${volunteer.description}`,
                  size: 12,
                  font: "Consolas"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]).flat(),
          
          // Speaking Engagements
          new Paragraph({
            children: [
              new TextRun({
                text: "=== SPEAKING_ENGAGEMENTS ===",
                bold: true,
                size: 18,
                font: "Consolas",
                color: "0066cc"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.speakingEngagements.map((engagement: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `>>> ${engagement.topic}`,
                  bold: true,
                  size: 12,
                  font: "Consolas"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `    Event: ${engagement.event} | Location: ${engagement.location}`,
                  size: 11,
                  font: "Consolas",
                  color: "666666"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]).flat()
        ]
      }
    ]
  });
  return doc;
};

// Template 3: Modern Professional - Complete 3-page layout
const generateModernTemplate = (data: any) => {
  const doc = new Document({
    sections: [
      {
        // PAGE 1: Header, Summary, and Core Competencies
        properties: {},
        children: [
          // Modern header with accent
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 75, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: data.name,
                            bold: true,
                            size: 36,
                            font: "Segoe UI"
                          })
                        ]
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: data.title,
                            size: 20,
                            font: "Segoe UI",
                            color: "6B46C1"
                          })
                        ]
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: 25, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({
                            text: data.email,
                            size: 14,
                            font: "Segoe UI"
                          })
                        ]
                      }),
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new TextRun({
                            text: data.location,
                            size: 14,
                            font: "Segoe UI"
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          
          new Paragraph({ text: "" }),
          
          // Professional Summary
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL SUMMARY",
                bold: true,
                size: 18,
                font: "Segoe UI",
                color: "6B46C1"
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: data.summary,
                size: 14,
                font: "Segoe UI"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          // Key Highlights
          new Paragraph({
            children: [
              new TextRun({
                text: "KEY ACHIEVEMENTS",
                bold: true,
                size: 18,
                font: "Segoe UI",
                color: "6B46C1"
              })
            ]
          }),
          ...data.highlights.slice(0, 6).map((highlight: string) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `▪ ${highlight}`,
                  size: 14,
                  font: "Segoe UI"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Core Competencies in grid
          new Paragraph({
            children: [
              new TextRun({
                text: "CORE COMPETENCIES",
                bold: true,
                size: 18,
                font: "Segoe UI",
                color: "6B46C1"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      ...data.cybersecurityDomains.slice(0, 6).map((domain: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `■ ${domain.category}`,
                              bold: true,
                              size: 13,
                              font: "Segoe UI"
                            }),
                            new TextRun({
                              text: ` (${domain.level})`,
                              size: 11,
                              font: "Segoe UI",
                              color: "666666"
                            })
                          ]
                        })
                      )
                    ]
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      ...data.cybersecurityDomains.slice(6, 12).map((domain: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `■ ${domain.category}`,
                              bold: true,
                              size: 13,
                              font: "Segoe UI"
                            }),
                            new TextRun({
                              text: ` (${domain.level})`,
                              size: 11,
                              font: "Segoe UI",
                              color: "666666"
                            })
                          ]
                        })
                      )
                    ]
                  })
                ]
              })
            ]
          })
        ]
      },
      
      {
        // PAGE 2: Professional Experience
        properties: {},
        children: [
          new Paragraph({ children: [new PageBreak()] }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL EXPERIENCE",
                bold: true,
                size: 20,
                font: "Segoe UI",
                color: "6B46C1"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.experiences.flatMap((exp: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.title,
                  bold: true,
                  size: 16,
                  font: "Segoe UI"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.company} | ${exp.period}`,
                  size: 13,
                  font: "Segoe UI",
                  color: "666666"
                }),
                new TextRun({
                  text: ` | ${exp.industry}`,
                  size: 13,
                  font: "Segoe UI",
                  color: "666666",
                  italics: true
                })
              ]
            }),
            ...exp.highlights.slice(0, 3).map((highlight: string) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${highlight}`,
                    size: 12,
                    font: "Segoe UI"
                  })
                ]
              })
            ),
            new Paragraph({ text: "" })
          ]),

          // AI & Personal Projects
          ...(data.aiProjects && data.aiProjects.length > 0 ? [
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "AI & PERSONAL PROJECTS",
                  bold: true,
                  size: 20,
                  font: "Segoe UI",
                  color: "6B46C1"
                })
              ]
            }),
            new Paragraph({ text: "" }),
            ...data.aiProjects.flatMap((project: any) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.name,
                    bold: true,
                    size: 16,
                    font: "Segoe UI"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${project.category} | ${project.year}`,
                    size: 13,
                    font: "Segoe UI",
                    color: "666666",
                    italics: true
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.description,
                    size: 12,
                    font: "Segoe UI"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Tech: ",
                    bold: true,
                    size: 11,
                    font: "Segoe UI"
                  }),
                  new TextRun({
                    text: project.technologies.join(', '),
                    size: 11,
                    font: "Segoe UI",
                    color: "475569"
                  })
                ]
              }),
              new Paragraph({ text: "" })
            ])
          ] : [])
        ]
      },

      {
        // PAGE 3: Certifications, Languages, Volunteer Work, and Speaking
        properties: {},
        children: [
          new Paragraph({ children: [new PageBreak()] }),

          // Professional Roles
          new Paragraph({
            children: [
              new TextRun({
                text: "KEY PROFESSIONAL ROLES",
                bold: true,
                size: 18,
                font: "Segoe UI",
                color: "6B46C1"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.professionalRoles.map((role: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `▪ ${role.role}: `,
                  bold: true,
                  size: 13,
                  font: "Segoe UI"
                }),
                new TextRun({
                  text: role.description,
                  size: 13,
                  font: "Segoe UI"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Certifications and Languages in two columns
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "CERTIFICATIONS",
                            bold: true,
                            size: 16,
                            font: "Segoe UI",
                            color: "6B46C1"
                          })
                        ]
                      }),
                      new Paragraph({ text: "" }),
                      ...data.certifications.map((cert: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `▸ ${cert.title}`,
                              size: 11,
                              font: "Segoe UI"
                            }),
                            new TextRun({
                              text: ` (${cert.date})`,
                              size: 10,
                              font: "Segoe UI",
                              color: "666666"
                            })
                          ]
                        })
                      )
                    ]
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "LANGUAGES",
                            bold: true,
                            size: 16,
                            font: "Segoe UI",
                            color: "6B46C1"
                          })
                        ]
                      }),
                      new Paragraph({ text: "" }),
                      ...data.languages.map((lang: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `▸ ${lang.name}: ${lang.level}`,
                              size: 12,
                              font: "Segoe UI"
                            })
                          ]
                        })
                      ),
                      new Paragraph({ text: "" }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "OPERATING SYSTEMS",
                            bold: true,
                            size: 16,
                            font: "Segoe UI",
                            color: "6B46C1"
                          })
                        ]
                      }),
                      ...data.operatingSystems.slice(0, 6).map((os: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `▸ ${os.name} (${os.level})`,
                              size: 11,
                              font: "Segoe UI"
                            })
                          ]
                        })
                      )
                    ]
                  })
                ]
              })
            ]
          }),
          
          new Paragraph({ text: "" }),
          
          // Volunteer Work
          new Paragraph({
            children: [
              new TextRun({
                text: "VOLUNTEER WORK & COMMUNITY ENGAGEMENT",
                bold: true,
                size: 16,
                font: "Segoe UI",
                color: "6B46C1"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.volunteerWork.map((volunteer: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `▪ ${volunteer.title}`,
                  bold: true,
                  size: 12,
                  font: "Segoe UI"
                }),
                new TextRun({
                  text: ` | ${volunteer.organization} | ${volunteer.period}`,
                  size: 11,
                  font: "Segoe UI",
                  color: "666666"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: volunteer.description,
                  size: 11,
                  font: "Segoe UI"
                })
              ]
            })
          ]).flat(),
          
          new Paragraph({ text: "" }),
          
          // Speaking Engagements
          new Paragraph({
            children: [
              new TextRun({
                text: "SPEAKING ENGAGEMENTS",
                bold: true,
                size: 16,
                font: "Segoe UI",
                color: "6B46C1"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.speakingEngagements.map((engagement: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `▪ ${engagement.topic}`,
                  bold: true,
                  size: 11,
                  font: "Segoe UI"
                }),
                new TextRun({
                  text: ` - ${engagement.event}, ${engagement.location}`,
                  size: 11,
                  font: "Segoe UI",
                  color: "666666"
                })
              ]
            })
          )
        ]
      }
    ]
  });
  return doc;
};

// Template 4: Academic/Research Style - Complete 3-page layout
const generateAcademicTemplate = (data: any) => {
  const doc = new Document({
    sections: [
      {
        // PAGE 1: Header, Summary, and Research Interests
        properties: {},
        children: [
          // Academic header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.name,
                bold: true,
                size: 32,
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.title,
                italics: true,
                size: 18,
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${data.email} • ${data.location}`,
                size: 14,
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "═".repeat(60),
                size: 14,
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          // Research Interests / Specializations
          new Paragraph({
            children: [
              new TextRun({
                text: "RESEARCH INTERESTS & SPECIALIZATIONS",
                bold: true,
                size: 16,
                font: "Times New Roman",
                smallCaps: true
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: data.summary,
                size: 14,
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          // Key Research Areas (Cybersecurity Domains)
          new Paragraph({
            children: [
              new TextRun({
                text: "AREAS OF EXPERTISE",
                bold: true,
                size: 16,
                font: "Times New Roman",
                smallCaps: true
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.cybersecurityDomains.map((domain: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${domain.category}`,
                  bold: true,
                  size: 13,
                  font: "Times New Roman"
                }),
                new TextRun({
                  text: ` (${domain.level})`,
                  size: 11,
                  font: "Times New Roman",
                  italics: true
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Professional Roles
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL ROLES & RESPONSIBILITIES",
                bold: true,
                size: 16,
                font: "Times New Roman",
                smallCaps: true
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.professionalRoles.map((role: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${role.role}: `,
                  bold: true,
                  size: 13,
                  font: "Times New Roman"
                }),
                new TextRun({
                  text: role.description,
                  size: 13,
                  font: "Times New Roman"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Languages and Technical Skills
          new Paragraph({
            children: [
              new TextRun({
                text: "LANGUAGES & TECHNICAL PROFICIENCIES",
                bold: true,
                size: 16,
                font: "Times New Roman",
                smallCaps: true
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Languages: ",
                bold: true,
                size: 13,
                font: "Times New Roman"
              }),
              new TextRun({
                text: data.languages.map((lang: any) => `${lang.name} (${lang.level})`).join(", "),
                size: 13,
                font: "Times New Roman"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          new Paragraph({
            children: [
              new TextRun({
                text: "Operating Systems: ",
                bold: true,
                size: 13,
                font: "Times New Roman"
              }),
              new TextRun({
                text: data.operatingSystems.slice(0, 5).map((os: any) => `${os.name} (${os.level})`).join(", "),
                size: 13,
                font: "Times New Roman"
              })
            ]
          })
        ]
      },
      
      {
        // PAGE 2: Professional Appointments
        properties: {},
        children: [
          new Paragraph({ children: [new PageBreak()] }),
          
          // Academic-style experience
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL APPOINTMENTS",
                bold: true,
                size: 16,
                font: "Times New Roman",
                smallCaps: true
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.experiences.map((exp: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.title}`,
                  bold: true,
                  size: 14,
                  font: "Times New Roman"
                }),
                new TextRun({
                  text: `, ${exp.company}`,
                  size: 14,
                  font: "Times New Roman"
                }),
                new TextRun({
                  text: ` (${exp.period})`,
                  italics: true,
                  size: 14,
                  font: "Times New Roman"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Industry: ${exp.industry}`,
                  size: 12,
                  font: "Times New Roman",
                  italics: true
                })
              ]
            }),
            ...exp.highlights.map((highlight: string, index: number) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${index + 1}. ${highlight}`,
                    size: 12,
                    font: "Times New Roman"
                  })
                ]
              })
            ),
            new Paragraph({ text: "" })
          ]).flat()
        ]
      },
      
      {
        // PAGE 3: Publications, Credentials, and Service
        properties: {},
        children: [
          new Paragraph({ children: [new PageBreak()] }),
          
          // Publications equivalent (Speaking Engagements)
          new Paragraph({
            children: [
              new TextRun({
                text: "PRESENTATIONS & SPEAKING ENGAGEMENTS",
                bold: true,
                size: 16,
                font: "Times New Roman",
                smallCaps: true
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.speakingEngagements.map((engagement: any, index: number) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. `,
                  size: 12,
                  font: "Times New Roman"
                }),
                new TextRun({
                  text: `"${engagement.topic}"`,
                  italics: true,
                  size: 12,
                  font: "Times New Roman"
                }),
                new TextRun({
                  text: ` ${engagement.event}, ${engagement.location}.`,
                  size: 12,
                  font: "Times New Roman"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `   ${engagement.description}`,
                  size: 11,
                  font: "Times New Roman",
                  color: "666666"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]).flat(),
          
          // Academic credentials
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL DEVELOPMENT & CREDENTIALS",
                bold: true,
                size: 16,
                font: "Times New Roman",
                smallCaps: true
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.certifications.map((cert: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${cert.title}`,
                  size: 12,
                  font: "Times New Roman"
                }),
                new TextRun({
                  text: `, ${cert.issuer} (${cert.date})`,
                  italics: true,
                  size: 12,
                  font: "Times New Roman"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Service and Volunteer Work
          new Paragraph({
            children: [
              new TextRun({
                text: "PROFESSIONAL SERVICE & COMMUNITY ENGAGEMENT",
                bold: true,
                size: 16,
                font: "Times New Roman",
                smallCaps: true
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.volunteerWork.map((volunteer: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${volunteer.title}`,
                  bold: true,
                  size: 12,
                  font: "Times New Roman"
                }),
                new TextRun({
                  text: `, ${volunteer.organization}`,
                  size: 12,
                  font: "Times New Roman"
                }),
                new TextRun({
                  text: ` (${volunteer.period})`,
                  italics: true,
                  size: 12,
                  font: "Times New Roman"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `  ${volunteer.description}`,
                  size: 11,
                  font: "Times New Roman"
                })
              ]
            }),
            volunteer.impact ? new Paragraph({
              children: [
                new TextRun({
                  text: `  Impact: ${volunteer.impact}`,
                  size: 11,
                  font: "Times New Roman",
                  italics: true
                })
              ]
            }) : new Paragraph({ text: "" }),
            new Paragraph({ text: "" })
          ]).flat()
        ]
      }
    ]
  });
  return doc;
};

// Template 5: Dark Professional Layout (Based on Screenshot)
const generateCreativeTemplate = (data: any) => {
  const doc = new Document({
    sections: [
      {
        // PAGE 1: Personal Information and Summary
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720
            }
          }
        },
        children: [
          // Header with name and title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.name.toUpperCase(),
                bold: true,
                size: 54,
                font: "Arial",
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.title,
                size: 24,
                font: "Arial",
                color: "2A2A2A"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${data.email} | ${data.location}`,
                size: 18,
                font: "Arial",
                color: "666666"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),

          // Executive Summary
          new Paragraph({
            children: [
              new TextRun({
                text: "EXECUTIVE SUMMARY",
                bold: true,
                size: 20,
                font: "Arial",
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "═".repeat(50),
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({
                text: data.summary,
                size: 16,
                font: "Arial",
                color: "2A2A2A"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),

          // Core Competencies in two columns
          new Paragraph({
            children: [
              new TextRun({
                text: "CORE COMPETENCIES",
                bold: true,
                size: 20,
                font: "Arial",
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "═".repeat(50),
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({ text: "" }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      ...data.cybersecurityDomains.slice(0, 6).map((domain: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `▶ ${domain.category}`,
                              bold: true,
                              size: 14,
                              font: "Arial",
                              color: "2A2A2A"
                            }),
                            new TextRun({
                              text: ` (${domain.level})`,
                              size: 12,
                              font: "Arial",
                              color: "666666",
                              italics: true
                            })
                          ]
                        })
                      )
                    ]
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      ...data.cybersecurityDomains.slice(6, 12).map((domain: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `▶ ${domain.category}`,
                              bold: true,
                              size: 14,
                              font: "Arial",
                              color: "2A2A2A"
                            }),
                            new TextRun({
                              text: ` (${domain.level})`,
                              size: 12,
                              font: "Arial",
                              color: "666666",
                              italics: true
                            })
                          ]
                        })
                      )
                    ]
                  })
                ]
              })
            ]
          }),

          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),

          // Languages and Operating Systems
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
              insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "LANGUAGES",
                            bold: true,
                            size: 16,
                            font: "Arial",
                            color: "D4AF37"
                          })
                        ]
                      }),
                      ...data.languages.map((lang: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `• ${lang.name}: ${lang.level}`,
                              size: 14,
                              font: "Arial",
                              color: "2A2A2A"
                            })
                          ]
                        })
                      )
                    ]
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "OPERATING SYSTEMS",
                            bold: true,
                            size: 16,
                            font: "Arial",
                            color: "D4AF37"
                          })
                        ]
                      }),
                      ...data.operatingSystems.slice(0, 8).map((os: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `• ${os.name} (${os.level})`,
                              size: 14,
                              font: "Arial",
                              color: "2A2A2A"
                            })
                          ]
                        })
                      )
                    ]
                  })
                ]
              })
            ]
          })
        ]
      },

      {
        // PAGE 2: Professional Experience (Most Recent Roles)
        properties: {},
        children: [
          // Page break and header
          new Paragraph({
            children: [new PageBreak()]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "PROFESSIONAL EXPERIENCE",
                bold: true,
                size: 28,
                font: "Arial",
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "═".repeat(40),
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),

          // Professional Experience entries (first 10 roles)
          ...data.experiences.slice(0, 10).flatMap((exp: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.title,
                  bold: true,
                  size: 18,
                  font: "Arial",
                  color: "2A2A2A"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.company,
                  bold: true,
                  size: 16,
                  font: "Arial",
                  color: "D4AF37"
                }),
                new TextRun({
                  text: ` | ${exp.period}`,
                  size: 14,
                  font: "Arial",
                  color: "666666"
                }),
                new TextRun({
                  text: ` | ${exp.industry}`,
                  size: 14,
                  font: "Arial",
                  color: "666666",
                  italics: true
                })
              ]
            }),
            new Paragraph({ text: "" }),
            ...exp.highlights.slice(0, 3).map((highlight: string) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `▪ ${highlight}`,
                    size: 13,
                    font: "Arial",
                    color: "2A2A2A"
                  })
                ]
              })
            ),
            new Paragraph({ text: "" }),
            new Paragraph({ text: "" })
          ]),

          // AI & Personal Projects
          ...(data.aiProjects && data.aiProjects.length > 0 ? [
            new Paragraph({ text: "" }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "AI & PERSONAL PROJECTS",
                  bold: true,
                  size: 24,
                  font: "Arial",
                  color: "D4AF37"
                })
              ]
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "═".repeat(40),
                  color: "D4AF37"
                })
              ]
            }),
            new Paragraph({ text: "" }),
            ...data.aiProjects.flatMap((project: any) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.name,
                    bold: true,
                    size: 18,
                    font: "Arial",
                    color: "2A2A2A"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.category,
                    bold: true,
                    size: 16,
                    font: "Arial",
                    color: "D4AF37"
                  }),
                  new TextRun({
                    text: ` | ${project.year}`,
                    size: 14,
                    font: "Arial",
                    color: "666666",
                    italics: true
                  })
                ]
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.description,
                    size: 13,
                    font: "Arial",
                    color: "2A2A2A"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Technologies: ",
                    bold: true,
                    size: 12,
                    font: "Arial"
                  }),
                  new TextRun({
                    text: project.technologies.join(', '),
                    size: 12,
                    font: "Arial",
                    color: "475569"
                  })
                ]
              }),
              new Paragraph({ text: "" })
            ])
          ] : [])
        ]
      },

      {
        // PAGE 3: Additional Experience, Certifications, and Volunteer Work
        properties: {},
        children: [
          // Page break and header
          new Paragraph({
            children: [new PageBreak()]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "ADDITIONAL EXPERIENCE & QUALIFICATIONS",
                bold: true,
                size: 24,
                font: "Arial",
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "═".repeat(50),
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({ text: "" }),

          // Additional Experience (remaining roles)
          new Paragraph({
            children: [
              new TextRun({
                text: "EARLIER ROLES",
                bold: true,
                size: 18,
                font: "Arial",
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({ text: "" }),

          ...data.experiences.slice(10).flatMap((exp: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.title} | ${exp.company}`,
                  bold: true,
                  size: 14,
                  font: "Arial",
                  color: "2A2A2A"
                }),
                new TextRun({
                  text: ` | ${exp.period}`,
                  size: 12,
                  font: "Arial",
                  color: "666666"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.highlights[0] || "Key responsibilities and achievements",
                  size: 12,
                  font: "Arial",
                  color: "2A2A2A"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]),

          new Paragraph({ text: "" }),

          // Certifications
          new Paragraph({
            children: [
              new TextRun({
                text: "CERTIFICATIONS & RECOGNITION",
                bold: true,
                size: 18,
                font: "Arial",
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({ text: "" }),

          ...data.certifications.map((cert: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `▪ ${cert.title}`,
                  bold: true,
                  size: 13,
                  font: "Arial",
                  color: "2A2A2A"
                }),
                new TextRun({
                  text: ` - ${cert.issuer} (${cert.date})`,
                  size: 12,
                  font: "Arial",
                  color: "666666"
                })
              ]
            })
          ]).flat(),

          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),

          // AI & Personal Projects
          ...(data.aiProjects && data.aiProjects.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: "AI & PERSONAL PROJECTS",
                  bold: true,
                  size: 18,
                  font: "Arial",
                  color: "D4AF37"
                })
              ]
            }),
            new Paragraph({ text: "" }),
            ...data.aiProjects.flatMap((project: any) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `▪ ${project.name}`,
                    bold: true,
                    size: 13,
                    font: "Arial",
                    color: "2A2A2A"
                  }),
                  new TextRun({
                    text: ` - ${project.category} (${project.year})`,
                    size: 12,
                    font: "Arial",
                    color: "666666"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.description,
                    size: 12,
                    font: "Arial",
                    color: "2A2A2A"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Tech: ",
                    bold: true,
                    size: 11,
                    font: "Arial"
                  }),
                  new TextRun({
                    text: project.technologies.join(', '),
                    size: 11,
                    font: "Arial",
                    color: "475569"
                  })
                ]
              }),
              new Paragraph({ text: "" })
            ]),
            new Paragraph({ text: "" })
          ] : []),

          // Volunteer Work
          new Paragraph({
            children: [
              new TextRun({
                text: "VOLUNTEER WORK & COMMUNITY ENGAGEMENT",
                bold: true,
                size: 18,
                font: "Arial",
                color: "D4AF37"
              })
            ]
          }),
          new Paragraph({ text: "" }),

          ...data.volunteerWork.map((volunteer: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `▪ ${volunteer.title}`,
                  bold: true,
                  size: 13,
                  font: "Arial",
                  color: "2A2A2A"
                }),
                new TextRun({
                  text: ` - ${volunteer.organization} (${volunteer.period})`,
                  size: 12,
                  font: "Arial",
                  color: "666666"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: volunteer.description,
                  size: 12,
                  font: "Arial",
                  color: "2A2A2A"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]).flat()
        ]
      }
    ]
  });
  return doc;
};

export const generateCVTemplate = (templateNumber: number) => {
  const data = extractDataFromPage();
  
  let doc: Document;
  let filename: string;
  
  switch (templateNumber) {
    case 1:
      doc = generateExecutiveTemplate(data);
      filename = `Executive_CV_${data.name.replace(/\s+/g, '_')}.docx`;
      break;
    case 2:
      doc = generateTechnicalTemplate(data);
      filename = `Technical_CV_${data.name.replace(/\s+/g, '_')}.docx`;
      break;
    case 3:
      doc = generateModernTemplate(data);
      filename = `Modern_CV_${data.name.replace(/\s+/g, '_')}.docx`;
      break;
    case 4:
      doc = generateAcademicTemplate(data);
      filename = `Academic_CV_${data.name.replace(/\s+/g, '_')}.docx`;
      break;
    case 5:
      doc = generateCreativeTemplate(data);
      filename = `Creative_CV_${data.name.replace(/\s+/g, '_')}.docx`;
      break;
    default:
      doc = generateExecutiveTemplate(data);
      filename = `Executive_CV_${data.name.replace(/\s+/g, '_')}.docx`;
  }
  
  // Generate and download the document
  Packer.toBlob(doc).then(blob => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
};