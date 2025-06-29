
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

const extractTextFromElement = (element: Element | null): string => {
  if (!element) return '';
  return element.textContent?.trim() || '';
};

const extractDataFromPage = () => {
  // Extract personal information
  const heroSection = document.querySelector('[data-section="hero"]');
  const name = extractTextFromElement(document.querySelector('[data-name]'));
  const title = extractTextFromElement(document.querySelector('[data-title]'));
  const summary = extractTextFromElement(document.querySelector('[data-summary]'));
  
  // Extract contact information
  const email = document.querySelector('[data-email]')?.getAttribute('data-email') || '';
  const location = document.querySelector('[data-location]')?.getAttribute('data-location') || '';
  
  // Extract highlights from About section
  const highlightElements = document.querySelectorAll('[data-highlight]');
  const highlights = Array.from(highlightElements).map(el => 
    el.getAttribute('data-highlight') || extractTextFromElement(el)
  );
  
  // Extract industries
  const industryElements = document.querySelectorAll('[data-industry]');
  const industries = Array.from(industryElements).map(el => 
    el.getAttribute('data-industry') || extractTextFromElement(el)
  );
  
  // Extract languages
  const languageElements = document.querySelectorAll('[data-language]');
  const languages = Array.from(languageElements).map(el => ({
    name: el.getAttribute('data-language') || '',
    level: el.getAttribute('data-level') || ''
  }));
  
  // Extract technical competencies
  const competencyElements = document.querySelectorAll('[data-category]');
  const competencies = Array.from(competencyElements).map(categoryEl => {
    const category = categoryEl.getAttribute('data-category') || '';
    const skillElements = categoryEl.querySelectorAll('[data-skill]');
    const skills = Array.from(skillElements).map(skillEl => 
      skillEl.getAttribute('data-skill') || extractTextFromElement(skillEl)
    );
    return { category, skills };
  });
  
  // Extract volunteer work
  const volunteerElements = document.querySelectorAll('[data-volunteer-role]');
  const volunteerWork = Array.from(volunteerElements).map(el => ({
    title: el.getAttribute('data-title') || '',
    organization: el.getAttribute('data-organization') || '',
    period: el.getAttribute('data-period') || '',
    description: el.getAttribute('data-description') || '',
    impact: el.getAttribute('data-impact') || ''
  }));
  
  // Extract speaking engagements
  const speakingElements = document.querySelectorAll('[data-speaking-engagement]');
  const speakingEngagements = Array.from(speakingElements).map(el => ({
    event: el.getAttribute('data-event') || '',
    location: el.getAttribute('data-location') || '',
    topic: el.getAttribute('data-topic') || '',
    audience: el.getAttribute('data-audience') || '',
    description: el.getAttribute('data-description') || ''
  }));
  
  // Extract current role information
  const currentRole = extractTextFromElement(document.querySelector('[data-current-role]'));
  const availability = extractTextFromElement(document.querySelector('[data-availability]'));
  const specialization = extractTextFromElement(document.querySelector('[data-specialization]'));
  
  // Extract experience data from read-only components if available
  const experienceSection = document.querySelector('#experience');
  let experiences: any[] = [];
  if (experienceSection) {
    const expItems = experienceSection.querySelectorAll('[data-experience-item]');
    experiences = Array.from(expItems).map(item => ({
      title: extractTextFromElement(item.querySelector('[data-job-title]')),
      company: extractTextFromElement(item.querySelector('[data-company]')),
      period: extractTextFromElement(item.querySelector('[data-period]')),
      description: extractTextFromElement(item.querySelector('[data-description]')),
      achievements: Array.from(item.querySelectorAll('[data-achievement]')).map(el => extractTextFromElement(el))
    }));
  }
  
  // Extract certifications if available
  const certificationSection = document.querySelector('#certifications');
  let certifications: any[] = [];
  if (certificationSection) {
    const certItems = certificationSection.querySelectorAll('[data-certification]');
    certifications = Array.from(certItems).map(item => ({
      title: extractTextFromElement(item.querySelector('[data-cert-title]')),
      issuer: extractTextFromElement(item.querySelector('[data-cert-issuer]')),
      date: extractTextFromElement(item.querySelector('[data-cert-date]')),
      category: extractTextFromElement(item.querySelector('[data-cert-category]'))
    }));
  }
  
  return {
    name,
    title,
    summary,
    email,
    location,
    highlights,
    industries,
    languages,
    competencies,
    volunteerWork,
    speakingEngagements,
    currentRole,
    availability,
    specialization,
    experiences,
    certifications
  };
};

export const generateDOCX = () => {
  const data = extractDataFromPage();
  
  // Create the document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header with name and title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.name,
                bold: true,
                size: 32,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.title,
                size: 24,
                font: "Calibri",
                color: "2563EB"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${data.email} | ${data.location}`,
                size: 20,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({ text: "" }), // Empty line

          // Professional Summary
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: "PROFESSIONAL SUMMARY",
                bold: true,
                size: 24,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: data.summary,
                size: 22,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          // Key Highlights
          ...data.highlights.map(highlight => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${highlight}`,
                  size: 20,
                  font: "Calibri"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),

          // Professional Experience (if available)
          ...(data.experiences.length > 0 ? [
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              children: [
                new TextRun({
                  text: "PROFESSIONAL EXPERIENCE",
                  bold: true,
                  size: 24,
                  font: "Calibri"
                })
              ]
            }),
            ...data.experiences.flatMap((exp: any) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.title} - ${exp.company}`,
                    bold: true,
                    size: 22,
                    font: "Calibri"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.period,
                    italics: true,
                    size: 20,
                    font: "Calibri"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.description,
                    size: 20,
                    font: "Calibri"
                  })
                ]
              }),
              ...exp.achievements.map((achievement: string) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `• ${achievement}`,
                      size: 20,
                      font: "Calibri"
                    })
                  ]
                })
              ),
              new Paragraph({ text: "" })
            ]),
            new Paragraph({ text: "" })
          ] : []),

          // Current Role
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: "CURRENT ROLE",
                bold: true,
                size: 24,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${data.currentRole} • ${data.availability} • ${data.specialization}`,
                size: 20,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({ text: "" }),

          // Technical Competencies
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: "TECHNICAL COMPETENCIES",
                bold: true,
                size: 24,
                font: "Calibri"
              })
            ]
          }),
          ...data.competencies.flatMap((comp: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: comp.category,
                  bold: true,
                  size: 22,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: comp.skills.join(" • "),
                  size: 20,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]),

          // Certifications (if available)
          ...(data.certifications.length > 0 ? [
            new Paragraph({
              heading: HeadingLevel.HEADING_1,
              children: [
                new TextRun({
                  text: "CERTIFICATIONS",
                  bold: true,
                  size: 24,
                  font: "Calibri"
                })
              ]
            }),
            ...data.certifications.map((cert: any) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `• ${cert.title} - ${cert.issuer} (${cert.date})`,
                    size: 20,
                    font: "Calibri"
                  })
                ]
              })
            ),
            new Paragraph({ text: "" })
          ] : []),

          // Volunteer Work & Leadership
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: "VOLUNTEER & LEADERSHIP",
                bold: true,
                size: 24,
                font: "Calibri"
              })
            ]
          }),
          ...data.volunteerWork.flatMap((vol: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${vol.title} - ${vol.organization}`,
                  bold: true,
                  size: 22,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${vol.period} | ${vol.impact}`,
                  italics: true,
                  size: 20,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: vol.description,
                  size: 20,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]),

          // Speaking Engagements
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: "SPEAKING ENGAGEMENTS",
                bold: true,
                size: 24,
                font: "Calibri"
              })
            ]
          }),
          ...data.speakingEngagements.flatMap((engagement: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${engagement.event} - ${engagement.location}`,
                  bold: true,
                  size: 22,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: engagement.topic,
                  italics: true,
                  size: 20,
                  font: "Calibri"
                })
              ]
            }),
            ...(engagement.audience ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: engagement.audience,
                    size: 18,
                    font: "Calibri",
                    color: "666666"
                  })
                ]
              })
            ] : []),
            new Paragraph({
              children: [
                new TextRun({
                  text: engagement.description,
                  size: 20,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]),

          // Industry Experience
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: "INDUSTRY EXPERIENCE",
                bold: true,
                size: 24,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: data.industries.join(" • "),
                size: 20,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({ text: "" }),

          // Languages
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: "LANGUAGES",
                bold: true,
                size: 24,
                font: "Calibri"
              })
            ]
          }),
          ...data.languages.map((lang: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${lang.name}: ${lang.level}`,
                  size: 20,
                  font: "Calibri"
                })
              ]
            })
          )
        ]
      }
    ]
  });

  // Generate and download the document
  Packer.toBlob(doc).then(blob => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resume_${data.name.replace(/\s+/g, '_')}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
};
