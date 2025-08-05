import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { speakingEngagements } from '../data/speakingEngagements';

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
  
  // Extract professional roles
  const roleElements = document.querySelectorAll('[data-role]');
  const professionalRoles = Array.from(roleElements).map(el => ({
    role: extractTextFromElement(el.querySelector('h4')),
    description: extractTextFromElement(el.querySelector('p'))
  }));
  
  // Extract operating systems data
  const osElements = document.querySelectorAll('[data-os-item]');
  const operatingSystems = Array.from(osElements).map(el => ({
    name: el.getAttribute('data-name') || '',
    level: el.getAttribute('data-level') || '',
    experience: el.getAttribute('data-experience') || ''
  }));
  
  // Extract ALL cybersecurity domains information with integrated technical competencies
  const allCybersecurityDomains = [
    {
      category: "Security Architecture & Engineering",
      level: "expert",
      domains: [
        "Security Architecture", "Security Engineering", "Cryptography", 
        "Key and Secret Management", "PKI", "Network Design", 
        "Secure System Build", "Container Security", "SAST/DAST",
        "Security SDLC", "CSPM", "Shift Left Security", "Infrastructure as Code"
      ]
    },
    {
      category: "Governance, Risk & Compliance",
      level: "expert", 
      domains: [
        "Risk Assessment", "Enterprise Risk Management", "ISO 27001/27002/27005/27019",
        "NIST Cybersecurity Framework", "PCI DSS", "GDPR", "DORA", "SOC 2",
        "Compliance & Enforcement", "Policy Development", "Audit Management",
        "Risk Management", "Compliance Programs", "Security Governance",
        "Incident Response", "Business Continuity", "CIS Controls", "SBOM"
      ]
    },
    {
      category: "Application Security",
      level: "expert",
      domains: [
        "SAST", "DAST", "Source Code Scan", "API Security", 
        "S-SDLC", "Vulnerability Scan", "Penetration Test",
        "Security QA", "Shift Left Security", "Vulnerability Assessment"
      ]
    },
    {
      category: "Security Operations",
      level: "expert",
      domains: [
        "SIEM", "SOC", "Incident Response", "Detection", 
        "Threat Hunting", "Security Operation Centers", "Forensics",
        "Breach Notification", "Investigation", "Containment",
        "Security Monitoring", "Penetration Testing"
      ]
    },
    {
      category: "Identity & Access Management",
      level: "expert",
      domains: [
        "Identity Management", "Access Control", "Privileged Access Management",
        "MFA & SSO", "Identity & Access Management", "Federated Identity",
        "Zero Trust"
      ]
    },
    {
      category: "Cloud & Infrastructure Security",
      level: "expert",
      domains: [
        "Cloud Security", "CSPM", "Infrastructure Security", 
        "Network Security", "Endpoint Security", "Data Protection",
        "Certificate Management", "Patch Management", "AWS/Azure/GCP",
        "Kubernetes Security", "Network Segmentation"
      ]
    },
    {
      category: "Frameworks & Standards",
      level: "expert",
      domains: [
        "CIS Top 20 Controls", "OWASP Top 10", "MITRE ATT&CK Framework",
        "Security Frameworks", "Industry Standards", "Baseline Configuration",
        "ISO 27001/27002/27005/27019", "NIST Cybersecurity Framework"
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
        "Multi-stakeholder Coordination", "Policy Development",
        "Cybersecurity Policy"
      ]
    },
    {
      category: "AI & Machine Learning Security",
      level: "advanced",
      domains: [
        "AI Security", "Data Model Security", "Adversarial Attacks",
        "Data Privacy", "Model Security", "AI Risk Assessment",
        "Data Poisoning & Quality", "Model Repurposing"
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
  
  // Extract ALL certifications and recognition data
  const allCertifications = [
    {
      title: "ITIL Foundation",
      issuer: "Change Management Framework",
      type: "ITIL Foundation Course",
      level: "Level-Introductory",
      date: "October 2010",
      category: "IT Service Management"
    },
    {
      title: "PEJL",
      issuer: "PEJL AB",
      type: "Completed specialized leadership and project management certification",
      level: " ",
      date: "October 2010",
      category: "Project Management"
    },
    {
      title: "Cluster Munitions",
      issuer: "United Nations Office for Disarmament Affairs",
      type: "Online Short Course",
      level: "Level-Introductory",
      date: "October 2023",
      category: "Weapons Systems"
    },
    {
      title: "Lethal Autonomous Weapon Systems",
      issuer: "United Nations Office for Disarmament Affairs", 
      type: "Online Short Course",
      level: "Level-Introductory",
      date: "October 2023",
      category: "Weapons Systems"
    },
    {
      title: "Nuclear Security",
      issuer: "United Nations Office for Disarmament Affairs",
      type: "Online Short Course", 
      level: "Level-Introductory",
      date: "October 2023",
      category: "Nuclear Security"
    },
    {
      title: "Introduction to Disarmament",
      issuer: "United Nations Office for Disarmament Affairs",
      type: "Online Short Course",
      level: "Level-Introductory", 
      date: "October 2023",
      category: "International Relations"
    }
  ];

  const recognition = {
    title: "UN Internet Governance Forum 2021",
    issuer: "Republic of Poland - Chancellery of the Prime Minister",
    signatory: "Krzysztof Szubert",
    position: "High Representative for European Digital Policy",
    description: "Acknowledgment for active involvement in the 16th UN Internet Governance Forum meeting in Katowice, Poland",
    date: "December 15th, 2021"
  };
  
  // Extract volunteer work
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
  
  return {
    name,
    title,
    summary,
    email,
    location,
    highlights,
    industries,
    cybersecurityDomains: allCybersecurityDomains,
    operatingSystems,
    certifications: allCertifications,
    recognition,
    volunteerWork,
    speakingEngagements,
    professionalRoles,
    currentRole,
    availability,
    specialization,
    experiences,
    languages
  };
};

// Template 1: Executive Summary Focus
const generateExecutiveTemplate = (data: any) => {
  const doc = new Document({
    sections: [
      {
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
          ...data.highlights.slice(0, 5).map((highlight: string) =>
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
          
          // Core Competencies (Top domains only)
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
          ...data.cybersecurityDomains.slice(0, 6).map((domain: any) =>
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
          
          // Experience (condensed)
          new Paragraph({
            children: [new PageBreak()]
          }),
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
            ...exp.highlights.slice(0, 3).map((highlight: string) =>
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
          ])
        ]
      }
    ]
  });
  return doc;
};

// Template 2: Technical Skills Focus
const generateTechnicalTemplate = (data: any) => {
  const doc = new Document({
    sections: [
      {
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
                text: `>>> Contact: ${data.email}`,
                size: 16,
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
                  text: `    ${domain.domains.slice(0, 6).join(" | ")}`,
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
          ),
          
          // Certifications in code style
          new Paragraph({
            children: [new PageBreak()]
          }),
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
          )
        ]
      }
    ]
  });
  return doc;
};

// Template 3: Modern Professional
const generateModernTemplate = (data: any) => {
  const doc = new Document({
    sections: [
      {
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
          
          // Two-column layout
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
                  // Left column
                  new TableCell({
                    width: { size: 70, type: WidthType.PERCENTAGE },
                    children: [
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
                      
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "EXPERIENCE",
                            bold: true,
                            size: 18,
                            font: "Segoe UI",
                            color: "6B46C1"
                          })
                        ]
                      }),
                      ...data.experiences.slice(0, 3).flatMap((exp: any) => [
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
                              size: 12,
                              font: "Segoe UI",
                              color: "666666"
                            })
                          ]
                        }),
                        ...exp.highlights.slice(0, 2).map((highlight: string) =>
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
                      ])
                    ]
                  }),
                  // Right column - Skills sidebar
                  new TableCell({
                    width: { size: 30, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: "CORE SKILLS",
                            bold: true,
                            size: 16,
                            font: "Segoe UI",
                            color: "6B46C1"
                          })
                        ]
                      }),
                      new Paragraph({ text: "" }),
                      
                      ...data.cybersecurityDomains.slice(0, 8).map((domain: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `■ ${domain.category}`,
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
                            text: "CERTIFICATIONS",
                            bold: true,
                            size: 16,
                            font: "Segoe UI",
                            color: "6B46C1"
                          })
                        ]
                      }),
                      
                      ...data.certifications.slice(0, 4).map((cert: any) =>
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: `▸ ${cert.title}`,
                              size: 10,
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
          })
        ]
      }
    ]
  });
  return doc;
};

// Template 4: Academic/Research Style
const generateAcademicTemplate = (data: any) => {
  const doc = new Document({
    sections: [
      {
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
            ...exp.highlights.slice(0, 3).map((highlight: string, index: number) =>
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
          ]).flat(),
          
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
          
          ...data.speakingEngagements.map((engagement: any, index: number) =>
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
            })
          ),
          
          new Paragraph({ text: "" }),
          
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
          )
        ]
      }
    ]
  });
  return doc;
};

// Template 5: Creative/Design-Focused
const generateCreativeTemplate = (data: any) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Creative header with visual elements
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "◆ ◆ ◆",
                size: 24,
                font: "Segoe UI",
                color: "E11D48"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.name.toUpperCase(),
                bold: true,
                size: 42,
                font: "Segoe UI",
                color: "1E293B"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "◆ ◆ ◆",
                size: 24,
                font: "Segoe UI",
                color: "E11D48"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: data.title,
                size: 24,
                font: "Segoe UI",
                color: "7C3AED"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          // Contact info in creative layout
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `✉ ${data.email} • 📍 ${data.location}`,
                size: 16,
                font: "Segoe UI"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({ text: "" }),
          
          // About section with visual flair
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "▼ WHO I AM ▼",
                bold: true,
                size: 18,
                font: "Segoe UI",
                color: "E11D48"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          new Paragraph({
            children: [
              new TextRun({
                text: data.summary,
                size: 16,
                font: "Segoe UI"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          // Highlights with icons
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "▼ KEY ACHIEVEMENTS ▼",
                bold: true,
                size: 18,
                font: "Segoe UI",
                color: "E11D48"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.highlights.slice(0, 4).map((highlight: string) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `⭐ ${highlight}`,
                  size: 14,
                  font: "Segoe UI"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),
          
          // Experience with visual separators
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "▼ PROFESSIONAL JOURNEY ▼",
                bold: true,
                size: 18,
                font: "Segoe UI",
                color: "E11D48"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.experiences.slice(0, 3).flatMap((exp: any, index: number) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${index + 1}. `,
                  bold: true,
                  size: 20,
                  font: "Segoe UI",
                  color: "7C3AED"
                }),
                new TextRun({
                  text: exp.title,
                  bold: true,
                  size: 18,
                  font: "Segoe UI"
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `🏢 ${exp.company} | 📅 ${exp.period}`,
                  size: 14,
                  font: "Segoe UI",
                  color: "666666"
                })
              ]
            }),
            ...exp.highlights.slice(0, 2).map((highlight: string) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `   ▸ ${highlight}`,
                    size: 14,
                    font: "Segoe UI"
                  })
                ]
              })
            ),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "◇ ◇ ◇",
                  size: 16,
                  font: "Segoe UI",
                  color: "CBD5E1"
                })
              ]
            }),
            new Paragraph({ text: "" })
          ]),
          
          // Skills in creative format
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "▼ EXPERTISE AREAS ▼",
                bold: true,
                size: 18,
                font: "Segoe UI",
                color: "E11D48"
              })
            ]
          }),
          new Paragraph({ text: "" }),
          
          ...data.cybersecurityDomains.slice(0, 6).map((domain: any) =>
            new Paragraph({
              children: [
                new TextRun({
                  text: `🔒 ${domain.category}`,
                  bold: true,
                  size: 14,
                  font: "Segoe UI"
                }),
                new TextRun({
                  text: ` [${domain.level}]`,
                  size: 12,
                  font: "Segoe UI",
                  color: "7C3AED"
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