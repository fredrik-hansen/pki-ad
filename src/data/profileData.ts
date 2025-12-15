/**
 * Centralized profile data for CV export and UI components.
 * Single source of truth for all profile-related data.
 */

// Language proficiency data
export interface Language {
  name: string;
  level: 'Native' | 'Fluent' | 'Conversational' | 'Beginner';
}

export const languages: Language[] = [
  { name: "Swedish", level: "Native" },
  { name: "Danish", level: "Conversational" },
  { name: "Norwegian", level: "Conversational" },
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Beginner" },
  { name: "Catalan", level: "Beginner" },
];

// Professional highlights
export const highlights: string[] = [
  "27+ years of expertise in IT and Information Security",
  "7-year track record in machine learning engineering",
  "Working roles: CSO, Lead Security Engineer, Security Architect",
  "Operational experience across cybersecurity domains",
  "Pragmatic, solution-oriented approach with hands-on technical skills",
  "Board-level discussions and technical team collaboration",
];

// Industry experience
export const industries: string[] = [
  "Financial Services",
  "Banking",
  "Military Intelligence and Security Service",
  "Law Enforcement",
  "Retail",
  "Energy",
  "Government",
  "Technology",
];

// Operating systems experience
export interface OperatingSystem {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  experience: string;
}

export const operatingSystems: OperatingSystem[] = [
  { name: "FreeBSD", level: "Expert", experience: "15+ years" },
  { name: "OpenBSD", level: "Expert", experience: "12+ years" },
  { name: "macOS", level: "Expert", experience: "20+ years" },
  { name: "Debian", level: "Expert", experience: "20+ years" },
  { name: "Ubuntu", level: "Advanced", experience: "10+ years" },
  { name: "Windows Client", level: "Advanced", experience: "25+ years" },
  { name: "Windows Server", level: "Advanced", experience: "20+ years" },
];

// Cybersecurity domain expertise
export interface CybersecurityDomain {
  category: string;
  level: 'expert' | 'advanced' | 'intermediate';
  domains: string[];
}

export const cybersecurityDomains: CybersecurityDomain[] = [
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

// Certificates with extended information for export
export interface CertificateExtended {
  title: string;
  issuer: string;
  type: string;
  level: string;
  date: string;
  category: string;
}

export const certificates: CertificateExtended[] = [
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

// International recognition
export interface Recognition {
  title: string;
  issuer: string;
  signatory: string;
  position: string;
  description: string;
  date: string;
}

export const recognition: Recognition = {
  title: "UN Internet Governance Forum 2021",
  issuer: "Republic of Poland - Chancellery of the Prime Minister",
  signatory: "Krzysztof Szubert",
  position: "High Representative for European Digital Policy",
  description: "Acknowledgment for active involvement in the 16th UN Internet Governance Forum meeting in Katowice, Poland",
  date: "December 15th, 2021"
};
