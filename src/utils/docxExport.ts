
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, Table, TableRow, TableCell, WidthType } from 'docx';

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
  
  // Extract industries - make more compact
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
  
  // Extract technical competencies - include ALL information
  const competencyElements = document.querySelectorAll('[data-category]');
  const competencies = Array.from(competencyElements).map(categoryEl => {
    const category = categoryEl.getAttribute('data-category') || '';
    const skillElements = categoryEl.querySelectorAll('[data-skill]');
    const skills = Array.from(skillElements).map(skillEl => 
      skillEl.getAttribute('data-skill') || extractTextFromElement(skillEl)
    );
    return { category, skills };
  });
  
  // Extract ALL cybersecurity domains information
  const allCybersecurityDomains = [
    {
      category: "Security Architecture & Engineering",
      level: "expert",
      domains: [
        "Security Architecture", "Security Engineering", "Cryptography", 
        "Key and Secret Management", "PKI", "Network Design", 
        "Secure System Build", "Container Security"
      ]
    },
    {
      category: "Governance, Risk & Compliance",
      level: "expert", 
      domains: [
        "Risk Assessment", "Enterprise Risk Management", "ISO 27001/27002/27005/27019",
        "NIST Cybersecurity Framework", "PCI DSS", "GDPR", "DORA",
        "Compliance & Enforcement", "Policy Development", "Audit Management"
      ]
    },
    {
      category: "Application Security",
      level: "expert",
      domains: [
        "SAST", "DAST", "Source Code Scan", "API Security", 
        "S-SDLC", "Vulnerability Scan", "Penetration Test",
        "Security QA", "Shift Left Security"
      ]
    },
    {
      category: "Security Operations",
      level: "expert",
      domains: [
        "SIEM", "SOC", "Incident Response", "Detection", 
        "Threat Hunting", "Security Operation Centers", "Forensics",
        "Breach Notification", "Investigation", "Containment"
      ]
    },
    {
      category: "Identity & Access Management",
      level: "expert",
      domains: [
        "Identity Management", "Access Control", "Privileged Access Management",
        "MFA & SSO", "Identity & Access Management", "Federated Identity"
      ]
    },
    {
      category: "Cloud & Infrastructure Security",
      level: "expert",
      domains: [
        "Cloud Security", "CSPM", "Infrastructure Security", 
        "Network Security", "Endpoint Security", "Data Protection",
        "Certificate Management", "Patch Management"
      ]
    },
    {
      category: "Frameworks & Standards",
      level: "expert",
      domains: [
        "CIS Top 20 Controls", "OWASP Top 10", "MITRE ATT&CK Framework",
        "Security Frameworks", "Industry Standards", "Baseline Configuration"
      ]
    },
    {
      category: "Threat Intelligence & Assessment",
      level: "advanced",
      domains: [
        "Threat Intelligence", "Risk Monitoring Services", "Cyber Intelligence",
        "Threat Assessment", "Intelligence Analysis", "Risk Appetite"
      ]
    },
    {
      category: "Training & Education",
      level: "advanced",
      domains: [
        "Security Training", "User Education", "Awareness Programs",
        "Cybersecurity Education", "Training Development", "Skill Building"
      ]
    },
    {
      category: "Internet Security Standards",
      level: "expert",
      domains: [
        "DNSSEC", "RPKI", "Internet Governance", "BGP Security",
        "Multi-stakeholder Coordination", "Policy Development"
      ]
    },
    {
      category: "AI & Machine Learning Security",
      level: "advanced",
      domains: [
        "AI Security", "Data Model Security", "Adversarial Attacks",
        "Data Privacy", "Model Security", "AI Risk Assessment"
      ]
    },
    {
      category: "Physical & IoT Security",
      level: "intermediate",
      domains: [
        "Physical Security", "IoT Security", "SCADA Security",
        "Industrial Control Systems", "Critical Infrastructure"
      ]
    }
  ];

  // Extract ALL technical competencies information
  const allTechnicalCompetencies = [
    {
      category: "Security Frameworks & Standards",
      skills: [
        "ISO 27001/27002/27005/27019", "NIST Cybersecurity Framework", "CIS Controls",
        "PCI DSS", "SOC 2", "GDPR", "DORA", "SBOM"
      ]
    },
    {
      category: "AI & Machine Learning Security",
      skills: [
        "Data Model Security", "Adversarial Attacks", "Data Poisoning & Quality",
        "Data Privacy", "Model Repurposing", "AI Risk Assessment"
      ]
    },
    {
      category: "Security Engineering & Architecture",
      skills: [
        "SAST/DAST", "Security SDLC", "Container Security", "CSPM",
        "Shift Left Security", "Cloud Security", "SCADA Security"
      ]
    },
    {
      category: "Governance, Risk & Compliance",
      skills: [
        "Risk Management", "Compliance Programs", "Security Governance",
        "Incident Response", "Business Continuity", "Audit Management"
      ]
    },
    {
      category: "Technical Operations",
      skills: [
        "Penetration Testing", "Vulnerability Assessment", "Security Monitoring",
        "SIEM/SOC", "PKI", "Network Security", "Forensics"
      ]
    },
    {
      category: "Infrastructure & Cloud",
      skills: [
        "AWS/Azure/GCP", "Kubernetes Security", "Infrastructure as Code",
        "Zero Trust", "Identity & Access Management", "Network Segmentation"
      ]
    },
    {
      category: "Internet Security Standards",
      skills: [
        "DNSSEC", "RPKI", "BGP Security", "Internet Governance",
        "Cybersecurity Policy", "Multi-stakeholder Coordination"
      ]
    }
  ];
  
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
    competencies: allTechnicalCompetencies,
    cybersecurityDomains: allCybersecurityDomains,
    volunteerWork,
    speakingEngagements,
    currentRole,
    availability,
    specialization,
    experiences,
    certifications,
    languages
  };
};

export const generateDOCX = () => {
  const data = extractDataFromPage();
  
  // Create Summary content (top left)
  const summaryContent = [
    new Paragraph({
      children: [
        new TextRun({
          text: "SUMMARY",
          bold: true,
          size: 24,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 20,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.summary,
          size: 18,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // Key highlights
    ...data.highlights.slice(0, 5).map(highlight => 
      new Paragraph({
        children: [
          new TextRun({
            text: `• ${highlight}`,
            size: 16,
            font: "Calibri"
          })
        ]
      })
    )
  ];

  // Create compact Industry Experience content (top right)
  const industryContent = [
    new Paragraph({
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
          text: "___________________________",
          size: 20,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // Compact industry list without blue text or new lines
    new Paragraph({
      children: [
        new TextRun({
          text: data.industries.join(" • "),
          size: 16,
          font: "Calibri"
        })
      ]
    })
  ];

  // Create comprehensive Cybersecurity Domain Expertise content (middle left)
  const domainExpertiseContent = [
    new Paragraph({
      children: [
        new TextRun({
          text: "CYBERSECURITY DOMAIN EXPERTISE",
          bold: true,
          size: 24,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 20,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // Include ALL cybersecurity domains
    ...data.cybersecurityDomains.flatMap((domain: any) => [
      new Paragraph({
        children: [
          new TextRun({
            text: `${domain.category} (${domain.level})`,
            bold: true,
            size: 16,
            font: "Calibri"
          })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: domain.domains.join(" • "),
            size: 14,
            font: "Calibri"
          })
        ]
      }),
      new Paragraph({ text: "" })
    ])
  ];

  // Create comprehensive Technical Competencies content (middle right)
  const technicalCompetenciesContent = [
    new Paragraph({
      children: [
        new TextRun({
          text: "TECHNICAL COMPETENCIES",
          bold: true,
          size: 24,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 20,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // Include ALL technical competencies
    ...data.competencies.flatMap((comp: any) => [
      new Paragraph({
        children: [
          new TextRun({
            text: comp.category,
            bold: true,
            size: 16,
            font: "Calibri"
          })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: comp.skills.join(" • "),
            size: 14,
            font: "Calibri"
          })
        ]
      }),
      new Paragraph({ text: "" })
    ])
  ];

  // Create Languages content (bottom left)
  const languagesContent = [
    new Paragraph({
      children: [
        new TextRun({
          text: "LANGUAGES",
          bold: true,
          size: 24,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 20,
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
            size: 18,
            font: "Calibri"
          }),
          new TextRun({
            text: ` - ${lang.level}`,
            size: 16,
            font: "Calibri",
            color: "666666"
          })
        ]
      })
    )
  ];

  // Create Certifications & Recognition content (bottom right)
  const certificationsContent = [
    new Paragraph({
      children: [
        new TextRun({
          text: "CERTIFICATIONS & RECOGNITION",
          bold: true,
          size: 24,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: "___________________________",
          size: 20,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    
    // Current role and availability
    new Paragraph({
      children: [
        new TextRun({
          text: "Current Role:",
          bold: true,
          size: 16,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.currentRole || "CEO, Digital Companion",
          size: 16,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({ text: "" }),
    new Paragraph({
      children: [
        new TextRun({
          text: "Availability:",
          bold: true,
          size: 16,
          font: "Calibri"
        })
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: data.availability || "Open for Consulting",
          size: 16,
          font: "Calibri"
        })
      ]
    })
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

  // Create the document with restructured grid layout
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

          // Grid layout using table with multiple rows
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              // Top row: Summary (left) and Industry Experience (right)
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: summaryContent,
                    margins: {
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 200,
                    },
                  }),
                  new TableCell({
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: industryContent,
                    margins: {
                      top: 100,
                      bottom: 100,
                      left: 200,
                      right: 100,
                    },
                  }),
                ],
              }),
              // Middle row: Cybersecurity Domain Expertise (left) and Technical Competencies (right)
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: domainExpertiseContent,
                    margins: {
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 200,
                    },
                  }),
                  new TableCell({
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: technicalCompetenciesContent,
                    margins: {
                      top: 100,
                      bottom: 100,
                      left: 200,
                      right: 100,
                    },
                  }),
                ],
              }),
              // Bottom row: Languages (left) and Certifications & Recognition (right)
              new TableRow({
                children: [
                  new TableCell({
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: languagesContent,
                    margins: {
                      top: 100,
                      bottom: 100,
                      left: 100,
                      right: 200,
                    },
                  }),
                  new TableCell({
                    width: {
                      size: 50,
                      type: WidthType.PERCENTAGE,
                    },
                    children: certificationsContent,
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

          // Additional sections on separate pages
          new Paragraph({
            children: [new PageBreak()]
          }),

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
