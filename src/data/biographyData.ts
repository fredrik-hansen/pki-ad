export interface BiographySection {
  id: string;
  title: string;
  content: string[];
  subsections?: BiographySection[];
}

export interface Citation {
  id: number;
  text: string;
  url?: string;
}

export interface BiographyData {
  name: string;
  lead: string[];
  sections: BiographySection[];
  citations: Citation[];
}

export const biographyData: BiographyData = {
  name: "Fredrik Hansen",
  lead: [
    "Fredrik Hansen (born 1970s, Sweden) is a Swedish cybersecurity professional with 27 years of experience across financial services, government intelligence, critical infrastructure, and international organizations. He has served as Chief Security Officer, Security Engineering Lead, and Subject Matter Expert for United Nations cybersecurity initiatives.",
    "Hansen chaired the Swedish Institute for Standards working group that created Sweden's adaptation of the NIST Cybersecurity Framework[1] and authored research on cyber norms for the UN Internet Governance Forum.[2][3] His career spans military intelligence, law enforcement, critical infrastructure protection, and corporate security leadership roles."
  ],
  sections: [
    {
      id: "early-life",
      title: "Early Life and Education",
      content: [
        "Hansen is a self-taught cybersecurity professional who developed expertise through hands-on experience spanning government, private sector, and international advisory roles. He holds certifications from the UN Office for Disarmament Affairs in autonomous weapons systems, nuclear security, and cyber diplomacy, as well as ITIL Foundation and project management credentials."
      ]
    },
    {
      id: "career",
      title: "Career",
      content: [],
      subsections: [
        {
          id: "government",
          title: "Government and National Security (2010-2014)",
          content: [
            "Hansen served as Area Responsible, System Responsible, and Project Manager at the Swedish Military Intelligence and Security Service from 2010 to 2012. In this role, he held delegated responsibility for all connected systems in military intelligence and security services, managing design, development, maintenance, budgeting, lifecycle management, and requirement gathering. He participated in EU cooperation with representatives from other intelligence services.",
            "From 2013 to 2014, Hansen worked as Security Specialist for the Swedish National Police, supporting the National Police Board security group. He enhanced physical and digital information protection for multiple systems and activities, established datacenter strategy combining cloud solutions and security, and conducted information classification, vulnerability analysis, and security audits."
          ]
        },
        {
          id: "infrastructure",
          title: "Critical Infrastructure and Finance",
          content: [
            "Hansen served as Chief Security Officer at Netgiro Systems AB from 2006 to 2008, implementing security frameworks for payment solutions providers and managing PCI DSS certification for e-commerce payment systems. He developed disaster recovery and business continuity plans while performing hands-on security operations including patch management, hardening, and network design.",
            "As Information Security Consultant at Svenska Kraftnät / Nordic Regional Security Coordinator (2017-2019), Hansen supervised security for Nordic power SCADA systems across four countries (Finland, Norway, Sweden, Denmark). He implemented ISO 27001, 27002, 27005, and 27019 standards and conducted penetration testing and vulnerability assessments for IT/SCADA systems.",
            "From 2016 to 2017, Hansen served as Cybersecurity Project Manager at Swedbank, coordinating organization-wide security activities and managing enterprise-wide security transformation initiatives. He also held Security Specialist positions at Skandia (2014-2015), working in the CERT on risk and threat management, and at IKEA (2012-2013), supporting PCI DSS security requirements for the global e-commerce platform."
          ]
        },
        {
          id: "corporate",
          title: "Corporate Security Leadership",
          content: [
            "From 2022 to 2023, Hansen served as Security Engineering Lead at Sinch AB, enhancing security posture by deploying Cloud Security Posture Management (CSPM) and Cloud Vulnerability Management solutions. He developed shift-left security initiatives with automated code reviews and ensured ISO27001 and GDPR compliance for a 200-person division while providing strategic input to a global information security group impacting over 5,000 employees.",
            "In 2019, Hansen founded Digital Companion, where he serves as CEO. The company implements information security solutions for diverse clientele and develops AI-driven security tools to enhance business process automation and efficiency. The company pioneered virtual security assistant projects to integrate with and optimize routine governance, risk, and compliance operations.",
            "In 2025, Hansen served as CTO, Architect, and Lead DevOps Engineer for a Dubai-based AI startup, where he designed and implemented a secure knowledge base application that captures institutional knowledge from email communications. The AI-powered solution automates insight extraction, resulting in time savings and cost reductions."
          ]
        },
        {
          id: "international",
          title: "International Advisory and Standards Work",
          content: [
            "Hansen conducted research for the UN Internet Governance Forum from 2018 to 2021, examining cyber norms efficacy against internet security incidents. He authored a research report on norm effectiveness in cybersecurity[2][3] and presented findings at the UN IGF 2021 workshop in Katowice.",
            "From 2021 to 2023, Hansen chaired Working Group One at the Swedish Institute for Standards (PK 636), directing the creation of a Swedish adaptation of the NIST Cybersecurity Framework.[1] The initiative enhanced cyber resilience across organizations with diverse security expertise and established Swedish national cybersecurity standards and guidelines.",
            "In 2023, Hansen served as Subject Matter Expert for the UN Internet Governance Forum Policy Network on AI, leading collaborative ideation focusing on AI technology and responding to the UN Secretary-General's mandate to formulate strategic recommendations.",
            "Since 2023, Hansen has served as Subject Matter Expert for the Internet Standards, Security and Safety Coalition (IS3C), contributing to Working Group 8 to improve the narrative around DNSSEC and RPKI technologies. He collaborates with international experts from ICANN and RIPE NCC to strengthen internet security and align technologies with cybersecurity frameworks including NIST, CIS Controls, and ISO 27001.[4]"
          ]
        }
      ]
    },
    {
      id: "technical",
      title: "Technical Contributions",
      content: [
        "Hansen has developed multiple AI and machine learning security platforms, including privacy-first AI agent platforms with RAG (Retrieval-Augmented Generation) capabilities for document and video knowledge management. His work includes multi-agent orchestration systems, automated email processing platforms with intelligent pipelines for classification and summarization, and secure knowledge bases with RAG-powered Q&A capabilities.",
        "Additional projects include ML-powered CV optimization engines using NLP for gap analysis, intelligent log analysis utilities leveraging large language models for automated error detection, and real-time infrastructure monitoring dashboards integrating multiple security and monitoring platforms."
      ]
    },
    {
      id: "certifications",
      title: "Certifications and Professional Development",
      content: [
        "Hansen holds ITIL Foundation certification (2010) and PEJL Leadership & Project Management certification (2010). In 2023, he completed multiple certifications from the United Nations Office for Disarmament Affairs, including courses on Lethal Autonomous Weapon Systems, Nuclear Security, Cluster Munitions, and Introduction to Disarmament."
      ]
    }
  ],
  citations: [
    {
      id: 1,
      text: "Swedish Institute for Standards, PK 636 Working Group - NIST Cybersecurity Framework Adaptation"
    },
    {
      id: 2,
      text: "United Nations Internet Governance Forum (2021). Research Report on Cyber Norms Effectiveness",
      url: "https://www.intgovforum.org/en/filedepot_download/235/20623"
    },
    {
      id: 3,
      text: "United Nations Internet Governance Forum (2018). \"Online Child Sexual Exploitation - Risks and Response\"",
      url: "https://www.intgovforum.org/multilingual/content/igf-2018-ws-239-online-child-sexual-exploitation-risks-and-response"
    },
    {
      id: 4,
      text: "Internet Standards, Security and Safety Coalition (IS3C), Working Group 8 - DNSSEC and RPKI"
    }
  ]
};
