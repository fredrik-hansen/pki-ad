
import { Briefcase, Award, Mic } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "Information Security Professional, CEO",
      company: "Digital Companion",
      period: "2019 - Present",
      industry: "Information Security",
      highlights: [
        "Implements and maintains comprehensive information security solutions for diverse clientele",
        "Drives development of cutting-edge AI-driven security tools, enhancing business process automation and efficiency",
        "Pioneering virtual security assistant project to seamlessly integrate with and optimize routine governance, risk, and compliance operations",
        "Manages full lifecycle of product development, from conceptualization to maintenance, ensuring robust information security solutions"
      ]
    },
    {
      title: "Subject Matter Expert, Cybersecurity Researcher",
      company: "Internet Standards, Security and Safety Coalition (IS3C)",
      period: "2023 - Present",
      industry: "Global Multistakeholder Platform",
      highlights: [
        "Contributes to IS3C's Working Group 8 (WG8) to improve narrative around DNSSEC and RPKI technologies",
        "Collaborates with international experts from ICANN and RIPE NCC to strengthen internet security for all users",
        "Develops unified narrative around DNSSEC and RPKI technologies, emphasizing protection against cyber threats",
        "Aligns technologies with prominent cybersecurity frameworks including NIST, CIS Controls, and ISO 27001"
      ]
    },
    {
      title: "Subject Matter Expert, Cybersecurity Researcher",
      company: "UN Internet Governance Forum Policy Network on AI",
      period: "2023 - 2023",
      industry: "Global Multistakeholder Platform (UN)",
      highlights: [
        "Led collaborative ideation at United Nations Internet Governance Forum focusing on cutting-edge AI technology",
        "Responded to UN Secretary-General's mandate to formulate strategic recommendations",
        "Facilitated Internet Governance Forum Policy Network as pivotal platform for synthesizing stakeholder insights",
        "Served as key contributor to global AI governance policy development"
      ]
    },
    {
      title: "Security Engineering Lead",
      company: "Sinch AB",
      period: "2022 - 2023",
      industry: "IT/Communications",
      highlights: [
        "Enhanced security posture by deploying Cloud Security Posture Management (CSPM) and Cloud Vulnerability Management solutions",
        "Developed and managed shift-left security initiatives with automated code reviews and vulnerability scans",
        "Ensured ISO27001 and GDPR compliance for 200+ staff division, overseeing technical security measures",
        "Provided strategic input to global information security group impacting 5,000+ employees"
      ]
    },
    {
      title: "Chairman of Working Group One",
      company: "Swedish Institute for Standards PK 636",
      period: "2021 - 2023",
      industry: "National Multistakeholder Platform",
      highlights: [
        "Directed creation of Swedish adaptation of NIST Cyber Security Framework at SIS",
        "Enhanced cyber resilience across organizations with diverse security expertise",
        "Championed national cybersecurity framework development initiative",
        "Established Swedish national cybersecurity standards and guidelines"
      ]
    },
    {
      title: "Senior Information Security Consultant",
      company: "TrueSec AB",
      period: "2021 - 2022",
      industry: "IT Security",
      highlights: [
        "Enhanced organizational security capabilities for diverse client portfolio",
        "Advised clients on regulatory compliance including DORA and GDPR requirements",
        "Orchestrated operational rollout of ISMS in compliance with ISO 27001 standards",
        "Fortified organizational resilience through strategic enhancement of security protocols and frameworks"
      ]
    },
    {
      title: "Cybersecurity Researcher",
      company: "United Nations Internet Governance Forum Cybersecurity",
      period: "2021 - 2021",
      industry: "Global Multistakeholder Platform (UN)",
      highlights: [
        "Initiated pivotal cybersecurity research initiative examining cyber norms efficacy against internet security incidents",
        "Investigated underlying factors influencing cyber norm adoption to enhance threat mitigation strategies",
        "Authored comprehensive 77-page qualitative research report on norm effectiveness in cybersecurity",
        "Presented key findings at prestigious UN IGF 2021 workshop in Katowice"
      ]
    },
    {
      title: "Speaker",
      company: "Afric'up - Tech & Startup Africa Summit",
      period: "2019",
      industry: "Technology/Innovation",
      highlights: [
        "Esteemed speaker at prestigious Afric'Up summit engaging 3,700 attendees from 32 African nations",
        "Contributed insights on constructing secure, smart cities with citizen-centric approach",
        "Served as jury member evaluating top-tier startup pitches among 360 startups with USD 500M investment fund",
        "Advocated for enhancement of digital skills and emergence of African digital champions through regional collaboration"
      ]
    },
    {
      title: "Speaker",
      company: "United Nations Internet Governance Forum",
      period: "2018",
      industry: "Global Multistakeholder Platform (UN)",
      highlights: [
        "Delivered compelling panel workshop on online child sexual exploitation and safeguarding measures for 800M children online",
        "Collaborated with ACSIS Geneva, InHOPE, Internet Watch Foundation, UK Home Office, UNICEF, and WePROTECT Global Alliance",
        "Conducted in-depth research on combating online child abuse and grooming",
        "Contributed to informed policy dialogue within multistakeholder Internet governance community"
      ]
    },
    {
      title: "Information Security Consultant",
      company: "Svenska Kraftnät / Nordic RSC",
      period: "2017 - 2019",
      industry: "Energy Sector",
      highlights: [
        "Supervised security for Nordic power SCADA systems across 4 countries (Finland, Norway, Sweden, Denmark)",
        "Implemented ISO 27001, 27002, 27005, and 27019 standards for Nordic Regional Security Coordinator",
        "Conducted comprehensive penetration testing, vulnerability assessments, and risk management for IT/SCADA systems",
        "Championed pragmatic, results-oriented approach to strengthen business unit security posture"
      ]
    },
    {
      title: "Project Manager",
      company: "Finance/Bank Customer",
      period: "2016 - 2017",
      industry: "Financial Services",
      highlights: [
        "Coordinated security-focused program and project management for organizational-wide security activities",
        "Increased resilience against hostile actors by expanding and improving security capabilities",
        "Managed enterprise-wide security transformation initiatives",
        "Orchestrated cross-functional teams to deliver security improvements on time and within budget"
      ]
    },
    {
      title: "Security Advisor",
      company: "Finance Tech Company",
      period: "2016 - 2016",
      industry: "Financial Technology",
      highlights: [
        "Provided advisory role supporting trading sector specialized company",
        "Established security requirements towards external vendors and suppliers",
        "Conducted security compliance assessments and audits",
        "Developed comprehensive security assessment frameworks for fintech operations"
      ]
    },
    {
      title: "Security Architect",
      company: "Skanska IT Nordics",
      period: "2015 - 2016",
      industry: "Construction",
      highlights: [
        "Established security controls and requirements in enterprise architect group",
        "Implemented operational security guidelines and frameworks at tactical, strategic, and operational levels",
        "Supported business projects with security audits, requirement definitions, and design proposals",
        "Conducted vulnerability testing with mitigation proposals and action follow-up"
      ]
    },
    {
      title: "Security Specialist",
      company: "Skandia",
      period: "2014 - 2015",
      industry: "Finance/Insurance",
      highlights: [
        "Worked in security team (CERT) on risk and threat management and incident management",
        "Supported projects with vulnerability analysis, audits, security requirements, and design",
        "Responsible for maintenance and tuning of security platforms for enterprise risk and vulnerability management",
        "Conducted vulnerability testing with mitigation proposals and recommendations"
      ]
    },
    {
      title: "Security Specialist",
      company: "Swedish National Police",
      period: "2013 - 2014",
      industry: "Government/Law Enforcement",
      highlights: [
        "Provided organizational security support for National Police Board security group",
        "Enhanced physical and digital information protection for multiple systems and activities",
        "Established new long-term datacenter strategy combining cloud solutions and security",
        "Conducted information classification, vulnerability analysis, audits, and security requirements design"
      ]
    },
    {
      title: "Security Specialist/Auditor",
      company: "TeleCity",
      period: "2013",
      industry: "IT/Hosting",
      highlights: [
        "Provided audit support regarding PCI DSS for leading hosting and datacenter provider",
        "Supported customers with high demands on uptime, security, and regulatory requirements",
        "Conducted datacenter PCI DSS audit and compliance verification",
        "Delivered specialized security audit expertise for critical infrastructure"
      ]
    },
    {
      title: "Information Security Specialist",
      company: "IKEA (Global Furniture Manufacturer)",
      period: "2012 - 2013",
      industry: "Retail & Logistics",
      highlights: [
        "Supported global furniture manufacturer with PCI DSS security requirements",
        "Provided expert knowledge in IT and information security for new global e-commerce site",
        "Handled security requirement gathering, payment solutions, and infrastructure security",
        "Guided design and launch of secure global e-commerce platform"
      ]
    },
    {
      title: "Security Specialist",
      company: "Retail Customer",
      period: "2012 - 2013",
      industry: "Retail",
      highlights: [
        "Evaluated new security platforms with practical operational testing",
        "Provided decision report basis for security platform selection",
        "Supported security organization and business with IT security project management recommendations",
        "Delivered comprehensive security expertise across retail operations"
      ]
    },
    {
      title: "Area Responsible, System Responsible, Project Manager",
      company: "Swedish Military Intelligence and Security Service",
      period: "2010 - 2012",
      industry: "Military Intelligence and security service",
      highlights: [
        "Delegated responsibility for all connected systems in military intelligence and security services",
        "Managed multiple aspects: design, development, maintenance, budgeting, lifecycle management, requirement gathering",
        "Involved in EU cooperations with representatives from other secret police and intelligence services",
        "Supervised critical national security infrastructure systems and projects"
      ]
    },
    {
      title: "Chief Security Officer (CSO)",
      company: "Netgiro Systems AB",
      period: "2006 - 2008",
      industry: "Financial Services",
      highlights: [
        "Implemented and maintained comprehensive security framework for leading payment solutions provider",
        "Managed PCI DSS certification and compliance for e-commerce payment systems",
        "Developed disaster recovery and business continuity plans",
        "Hands-on security operations including patch management, hardening, network design, and troubleshooting"
      ]
    },
    {
      title: "System Manager, Project Manager",
      company: "Qbranch",
      period: "2008 - 2010",
      industry: "Hosting",
      highlights: [
        "Managed operations for multiple customers with system sizes from few servers to several thousand",
        "Implemented new systems, daily operations, proactive management including security hardening and threat analysis",
        "Coordinated infrastructure migration projects moving customer systems to Qbranch data centers",
        "Conducted patch management, trend analysis, and incident handling"
      ]
    },
    {
      title: "Self Employed",
      company: "Hansens Dataservice",
      period: "2002 - 2007",
      industry: "IT Services",
      highlights: [
        "Operated own company specializing in Linux-based open source software integration",
        "Conducted various system administration assignments and projects",
        "Served as reseller of Linux-based platforms and solutions",
        "Delivered comprehensive IT consulting services to diverse client base"
      ]
    },
    {
      title: "Security Consultant",
      company: "Nexus Technology AB",
      period: "2001 - 2002",
      industry: "IT Security",
      highlights: [
        "Conducted penetration testing and built proof of concept security systems",
        "Implemented intrusion detection systems, firewalls, and network design",
        "Developed PKI system and provided forensics expertise",
        "Delivered technical sales support and comprehensive security consulting"
      ]
    },
    {
      title: "Security Consultant",
      company: "Softronic",
      period: "2000 - 2001",
      industry: "IT Security",
      highlights: [
        "Performed penetration testing and built proof of concept systems",
        "Specialized in intrusion detection, firewalls, network design, and forensics",
        "Conducted system development and provided technical sales support",
        "Delivered comprehensive security consulting across multiple domains"
      ]
    },
    {
      title: "IT Consultant and Developer",
      company: "StreamServe",
      period: "1998 - 1999",
      industry: "IT/Software",
      highlights: [
        "Worked as IT consultant integrating input/output flows from SAP/R3 and Movex across Europe",
        "Built internal support system using development skills",
        "Supported system administrator with imaging and system operations",
        "Delivered software integration and development services"
      ]
    }
  ];

  // Professional Roles Experience
  const professionalRoles = [
    {
      role: "Project Manager",
      description: "Extensive experience managing complex security and IT transformation projects across multiple industries",
      dataRole: "project-manager"
    },
    {
      role: "Chief Security Officer",
      description: "Executive leadership in implementing comprehensive security frameworks and organizational risk management",
      dataRole: "chief-security-officer"
    },
    {
      role: "Security Architect",
      description: "Designing and implementing enterprise security architectures and strategic security frameworks",
      dataRole: "security-architect"
    },
    {
      role: "System Manager",
      description: "Managing complex IT systems and infrastructure operations for organizations of various scales",
      dataRole: "system-manager"
    },
    {
      role: "Project Security Support",
      description: "Providing specialized security expertise and guidance for organizational projects and initiatives",
      dataRole: "project-security-support"
    },
    {
      role: "Cybersecurity Researcher",
      description: "Conducting advanced research in cybersecurity, AI security, and internet governance frameworks",
      dataRole: "cybersecurity-researcher"
    },
    {
      role: "Artificial Intelligence Engineer",
      description: "Developing AI-driven security solutions and automated compliance systems",
      dataRole: "artificial-intelligence-engineer"
    }
  ];

  // Achievements
  const achievements = [
    {
      title: "ITIL Foundation Course",
      description: "Certified in IT Infrastructure Library best practices for IT service management",
      dataAchievement: "itil-foundation"
    },
    {
      title: "PEJL Course",
      description: "Completed specialized leadership and project management certification",
      dataAchievement: "pejl-course"
    }
  ];

  // Speaking Engagements
  const speakingEngagements = [
    {
      event: "RedHat Conference",
      description: "Technical presentation on enterprise security architecture and open-source security solutions",
      dataSpeaking: "redhat-speaker"
    },
    {
      event: "SIG Security",
      description: "Expert speaker on advanced cybersecurity frameworks and threat intelligence",
      dataSpeaking: "sig-security-speaker"
    },
    {
      event: "DSV, Department of Computer and System Sciences, Stockholm University",
      description: "Academic presentation on cybersecurity research methodologies and AI security",
      dataSpeaking: "dsv-stockholm-university-speaker"
    },
    {
      event: "Nordic IT",
      description: "Keynote speaker on Nordic cybersecurity collaboration and regional security standards",
      dataSpeaking: "nordic-it-speaker"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive 27+ year track record spanning multiple industries and security domains, 
            from startup CSO to enterprise security leadership and international advisory roles.
          </p>
        </div>

        {/* Professional Roles */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Key Professional Roles
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalRoles.map((role, index) => (
              <div key={index} className="p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-all duration-300" data-role={role.dataRole}>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">{role.role}</h4>
                <p className="text-slate-300 text-sm">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-all duration-300" data-achievement={achievement.dataAchievement}>
                <div className="flex items-center space-x-3 mb-3">
                  <Award size={20} className="text-blue-400" />
                  <h4 className="text-lg font-semibold text-blue-400">{achievement.title}</h4>
                </div>
                <p className="text-slate-300 text-sm">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Speaking Engagements */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Speaking Engagements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {speakingEngagements.map((engagement, index) => (
              <div key={index} className="p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-all duration-300" data-speaking={engagement.dataSpeaking}>
                <div className="flex items-center space-x-3 mb-3">
                  <Mic size={20} className="text-blue-400" />
                  <h4 className="text-lg font-semibold text-blue-400">{engagement.event}</h4>
                </div>
                <p className="text-slate-300 text-sm">{engagement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Career Timeline
          </h3>
          {experiences.map((exp, index) => (
            <div key={index} className="group relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="ml-8 p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg">
                      <Briefcase size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm">{exp.period}</p>
                    <p className="text-slate-500 text-xs">{exp.industry}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {exp.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <p className="text-slate-300 text-sm">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            This comprehensive timeline represents 27+ years of progressive cybersecurity leadership across 
            diverse industries including finance, government, energy, technology, and international organizations.
          </p>
        </div>
      </div>
    </section>
  );
};
