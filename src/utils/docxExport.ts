
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  level?: string;
  category: string;
}

interface VolunteerItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  impact: string;
}

export const generateDOCX = () => {
  // Extract personal information
  const name = "Fredrik Hansen";
  const title = "Senior IT & Information Security Expert";
  const email = "fh@pki.ad";
  const location = "Europe (CET)";
  
  // Extract about section highlights
  const highlights = [
    "26+ years of expertise in IT and Information Security",
    "6-year track record in machine learning engineering", 
    "Working roles: CSO, Lead Security Engineer, Security Architect",
    "Comprehensive operational experience across cybersecurity domains",
    "Pragmatic, solution-oriented approach with hands-on technical skills",
    "Board-level discussions and technical team collaboration"
  ];

  // Extract experience data (this would ideally come from a data source)
  const experiences: ExperienceItem[] = [
    {
      title: "CEO",
      company: "Digital Companion",
      period: "2023 - Present",
      description: "Leading cybersecurity consulting and AI security initiatives",
      achievements: [
        "Strategic cybersecurity consulting for enterprise clients",
        "AI security risk assessment and mitigation strategies",
        "Board-level cybersecurity advisory services"
      ]
    }
    // Add more experiences as needed
  ];

  // Extract certifications
  const certifications: CertificationItem[] = [
    {
      title: "Cluster Munitions",
      issuer: "United Nations Office for Disarmament Affairs",
      date: "October 2023",
      level: "Introductory",
      category: "Weapons Systems"
    },
    {
      title: "Lethal Autonomous Weapon Systems", 
      issuer: "United Nations Office for Disarmament Affairs",
      date: "October 2023",
      level: "Introductory", 
      category: "Weapons Systems"
    },
    {
      title: "Nuclear Security",
      issuer: "United Nations Office for Disarmament Affairs",
      date: "October 2023",
      level: "Introductory",
      category: "Nuclear Security"
    },
    {
      title: "Introduction to Disarmament",
      issuer: "United Nations Office for Disarmament Affairs", 
      date: "October 2023",
      level: "Introductory",
      category: "International Relations"
    }
  ];

  // Extract volunteer work
  const volunteerWork: VolunteerItem[] = [
    {
      title: "Chairman, PK 636",
      organization: "Swedish Institute for Standards",
      period: "2021 - 2023", 
      description: "Led the creation of a Swedish adaptation of the NIST Cybersecurity Framework",
      impact: "National cybersecurity framework development"
    },
    {
      title: "Contributing Researcher",
      organization: "UN Internet Governance Forum - Policy Network on AI",
      period: "2023",
      description: "Spearheaded collaborative ideation focusing on leveraging AI technology",
      impact: "Global AI governance policy development"
    }
  ];

  // Extract technical competencies
  const competencies = [
    {
      category: "Security Frameworks & Standards",
      skills: ["ISO 27001/27002/27005/27019", "NIST Cybersecurity Framework", "CIS Controls", "PCI DSS", "SOC 2", "GDPR", "DORA", "SBOM"]
    },
    {
      category: "AI & Machine Learning Security", 
      skills: ["Data Model Security", "Adversarial Attacks", "Data Poisoning & Quality", "Data Privacy", "Model Repurposing", "AI Risk Assessment"]
    },
    {
      category: "Security Engineering & Architecture",
      skills: ["SAST/DAST", "Security SDLC", "Container Security", "CSPM", "Shift Left Security", "Cloud Security", "SCADA Security"]
    }
  ];

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
                text: name,
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
                text: title,
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
                text: `${email} | ${location}`,
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
          ...highlights.map(highlight => 
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${highlight}`,
                  size: 22,
                  font: "Calibri"
                })
              ]
            })
          ),
          new Paragraph({ text: "" }),

          // Professional Experience
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
          ...experiences.flatMap(exp => [
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
                  size: 22,
                  font: "Calibri"
                })
              ]
            }),
            ...exp.achievements.map(achievement =>
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
          ...competencies.flatMap(comp => [
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

          // Certifications
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
          ...certifications.map(cert =>
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
          new Paragraph({ text: "" }),

          // Volunteer Work
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
          ...volunteerWork.flatMap(vol => [
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
    link.download = `Resume_${name.replace(/\s+/g, '_')}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
};
