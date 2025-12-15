
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, Table, TableRow, TableCell, WidthType } from 'docx';
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
    aiProjects
  };
};

export const generateDOCX = () => {
  const data = extractDataFromPage();
  
  // Create left column content (Summary, Industry Experience, Operating Systems, Certifications, Languages)
  const leftColumnContent = [
    // SUMMARY
    new Paragraph({
      children: [
        new TextRun({
          text: "SUMMARY",
          bold: true,
          size: 22,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 18,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.summary,
          size: 16,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // Key highlights (compact)
    ...data.highlights.slice(0, 3).map(highlight => 
      new Paragraph({
        children: [
          new TextRun({
            text: `• ${highlight}`,
            size: 14,
            font: "Calibri"
          })
        ]
      })
    ),
    new Paragraph({ text: "" }),
    
    // INDUSTRY EXPERIENCE
    new Paragraph({
      children: [
        new TextRun({
          text: "INDUSTRY EXPERIENCE",
          bold: true,
          size: 22,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 18,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // Compact industry list
    new Paragraph({
      children: [
        new TextRun({
          text: data.industries.join(" • "),
          size: 14,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // OPERATING SYSTEMS
    new Paragraph({
      children: [
        new TextRun({
          text: "OPERATING SYSTEMS",
          bold: true,
          size: 22,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 18,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // Expert level OS
    new Paragraph({
      children: [
        new TextRun({
          text: "Expert Level:",
          bold: true,
          size: 14,
          font: "Calibri"
        })
      ]
    }),
    ...data.operatingSystems.filter((os: any) => os.level === "Expert").map((os: any) => 
      new Paragraph({
        children: [
          new TextRun({
            text: `• ${os.name}`,
            size: 12,
            font: "Calibri"
          })
        ]
      })
    ),
    new Paragraph({ text: "" }),
    
    // Advanced level OS
    new Paragraph({
      children: [
        new TextRun({
          text: "Advanced Level:",
          bold: true,
          size: 14,
          font: "Calibri"
        })
      ]
    }),
    ...data.operatingSystems.filter((os: any) => os.level === "Advanced").map((os: any) => 
      new Paragraph({
        children: [
          new TextRun({
            text: `• ${os.name}`,
            size: 12,
            font: "Calibri"
          })
        ]
      })
    ),
    new Paragraph({ text: "" }),
    
    // CERTIFICATIONS & RECOGNITION
    new Paragraph({
      children: [
        new TextRun({
          text: "CERTIFICATIONS & RECOGNITION",
          bold: true,
          size: 22,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 18,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // All UN Certificates grouped by issuer
    new Paragraph({
      children: [
        new TextRun({
          text: "UN Disarmament Affairs:",
          bold: true,
          size: 14,
          font: "Calibri"
        })
      ]
    }),
    ...data.certifications.filter((cert: any) => cert.issuer === "United Nations Office for Disarmament Affairs").map((cert: any) => 
      new Paragraph({
        children: [
          new TextRun({
            text: `• ${cert.title} (${cert.date})`,
            size: 12,
            font: "Calibri"
          })
        ]
      })
    ),
    new Paragraph({ text: "" }),
    
    // Other Certifications
    new Paragraph({
      children: [
        new TextRun({
          text: "Professional Certifications:",
          bold: true,
          size: 14,
          font: "Calibri"
        })
      ]
    }),
    ...data.certifications.filter((cert: any) => cert.issuer !== "United Nations Office for Disarmament Affairs").map((cert: any) => 
      new Paragraph({
        children: [
          new TextRun({
            text: `• ${cert.title} - ${cert.issuer} (${cert.date})`,
            size: 12,
            font: "Calibri"
          })
        ]
      })
    ),
    new Paragraph({ text: "" }),
    
    // International Recognition
    new Paragraph({
      children: [
        new TextRun({
          text: "International Recognition:",
          bold: true,
          size: 14,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `• ${data.recognition.title}`,
          size: 12,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `  ${data.recognition.issuer} (${data.recognition.date})`,
          size: 10,
          font: "Calibri",
          color: "666666"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // LANGUAGES
    new Paragraph({
      children: [
        new TextRun({
          text: "LANGUAGES",
          bold: true,
          size: 22,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 18,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    ...data.languages.map((lang: any) =>
      new Paragraph({
        children: [
          new TextRun({
            text: lang.name,
            bold: true,
            size: 16,
            font: "Calibri"
          }),
          new TextRun({
            text: ` - ${lang.level}`,
            size: 14,
            font: "Calibri",
            color: "666666"
          })
        ]
      })
    )
  ];

  // Create right column content (Cybersecurity Domain Expertise)
  const rightColumnContent = [
    new Paragraph({
      children: [
        new TextRun({
          text: "CYBERSECURITY DOMAIN EXPERTISE",
          bold: true,
          size: 22,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 18,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // Include ALL cybersecurity domains (more compact format)
    ...data.cybersecurityDomains.flatMap((domain: any) => [
      new Paragraph({
        children: [
          new TextRun({
            text: `${domain.category} (${domain.level})`,
            bold: true,
            size: 14,
            font: "Calibri"
          })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: domain.domains.slice(0, 8).join(" • "),
            size: 12,
            font: "Calibri"
          })
        ]
      }),
      new Paragraph({ text: "" })
    ])
  ];

  // Create compact experience content for single column
  const compactExperienceContent = [
    new Paragraph({
      children: [new PageBreak()]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "PROFESSIONAL EXPERIENCE",
          bold: true,
          size: 28,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "_____________________________________________",
          size: 24,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // Compact experience entries
    ...data.experiences.flatMap((exp: any) => [
      new Paragraph({
        children: [
          new TextRun({
            text: exp.title,
            bold: true,
            size: 20,
            font: "Calibri"
          }),
          new TextRun({
            text: ` | ${exp.company}`,
            size: 18,
            font: "Calibri"
          }),
          new TextRun({
            text: ` | ${exp.period}`,
            size: 16,
            font: "Calibri",
            color: "666666"
          })
        ]
      }),
      // Only show top 3 highlights for compact format
      ...exp.highlights.slice(0, 3).map((highlight: string) =>
        new Paragraph({
          children: [
            new TextRun({
              text: `• ${highlight}`,
              size: 16,
              font: "Calibri"
            })
          ]
        })
      ),
      new Paragraph({ text: "" })
    ])
  ];

  // Create the document with dynamic 2-column layout
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Header with name and title
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: data.name.toUpperCase(),
                bold: true,
                size: 36,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
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
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `${data.email}`,
                size: 18,
                font: "Calibri",
                color: "2563EB"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),

          // Dynamic 2-column layout using table
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  // Left column: Summary, Industry Experience, Operating Systems, Certifications, Languages
                  new TableCell({
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: leftColumnContent,
                    margins: {
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 200,
                    },
                  }),
                  // Right column: Cybersecurity Domain Expertise
                  new TableCell({
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: rightColumnContent,
                    margins: {
                      top: 100,
                      bottom: 100,
                      left: 200,
                      right: 100,
                    },
                  }),
                ],
              }),
            ],
          }),

          // Experience section in single column (compact format)
          ...compactExperienceContent,

          // AI & Personal Projects Section
          ...(data.aiProjects && data.aiProjects.length > 0 ? [
            new Paragraph({
              children: [new PageBreak()]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "AI & PERSONAL PROJECTS PORTFOLIO",
                  bold: true,
                  size: 28,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "_____________________________________________",
                  size: 24,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Independent projects demonstrating expertise in AI/ML engineering and full-stack development",
                  size: 18,
                  font: "Calibri",
                  italics: true,
                  color: "666666"
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
                    size: 22,
                    font: "Calibri"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${project.category}`,
                    size: 18,
                    font: "Calibri",
                    color: "2563EB",
                    bold: true
                  }),
                  new TextRun({
                    text: ` • ${project.year}`,
                    size: 16,
                    font: "Calibri",
                    color: "666666",
                    italics: true
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: project.description,
                    size: 16,
                    font: "Calibri"
                  })
                ]
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Technologies: ",
                    bold: true,
                    size: 14,
                    font: "Calibri"
                  }),
                  new TextRun({
                    text: project.technologies.join(', '),
                    size: 14,
                    font: "Calibri",
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
                size: 24,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "_____________________________________________",
                size: 20,
                font: "Calibri"
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
                  size: 16,
                  font: "Calibri"
                }),
                new TextRun({
                  text: techs.join(', '),
                  size: 16,
                  font: "Calibri",
                  color: "475569"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]),

          // Additional sections on separate pages
          new Paragraph({
            children: [new PageBreak()]
          }),

          // Professional Roles
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: "KEY PROFESSIONAL ROLES",
                bold: true,
                size: 24,
                font: "Calibri"
              })
            ]
          }),
          ...data.professionalRoles.flatMap((role: any) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: role.role,
                  bold: true,
                  size: 22,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: role.description,
                  size: 20,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]),

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
                  text: engagement.event,
                  bold: true,
                  size: 22,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: engagement.location,
                  italics: true,
                  size: 18,
                  font: "Calibri",
                  color: "666666"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Topic: ${engagement.topic}`,
                  size: 16,
                  font: "Calibri"
                })
              ]
            }),
            ...(engagement.audience ? [new Paragraph({
              children: [
                new TextRun({
                  text: `Audience: ${engagement.audience}`,
                  size: 16,
                  font: "Calibri",
                  color: "666666"
                })
              ]
            })] : []),
            new Paragraph({
              children: [
                new TextRun({
                  text: engagement.description,
                  size: 16,
                  font: "Calibri"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ])
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
