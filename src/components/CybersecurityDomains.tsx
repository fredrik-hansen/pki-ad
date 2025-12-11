
import React from 'react';

export const CybersecurityDomains = () => {
  const domains = [
    {
      category: "Security Architecture & Engineering",
      level: "",
      domains: [
        "Security Architecture", "Security Engineering", "Cryptography", 
        "Key and Secret Management", "PKI", "Network Design", 
        "Secure System Build", "Container Security"
      ]
    },
    {
      category: "Governance, Risk & Compliance",
      level: "", 
      domains: [
        "Risk Assessment", "Enterprise Risk Management", "ISO 27001/27002/27005/27019",
        "NIST Cybersecurity Framework", "PCI DSS", "GDPR", "DORA",
        "Compliance & Enforcement", "Policy Development", "Audit Management"
      ]
    },
    {
      category: "Application Security",
      level: "",
      domains: [
        "SAST", "DAST", "Source Code Scan", "API Security", 
        "S-SDLC", "Vulnerability Scan", "Penetration Test",
        "Security QA", "Shift Left Security"
      ]
    },
    {
      category: "Security Operations",
      level: "",
      domains: [
        "SIEM", "SOC", "Incident Response", "Detection", 
        "Threat Hunting", "Security Operation Centers", "Forensics",
        "Breach Notification", "Investigation", "Containment"
      ]
    },
    {
      category: "Identity & Access Management",
      level: "",
      domains: [
        "Identity Management", "Access Control", "Privileged Access Management",
        "MFA & SSO", "Identity & Access Management", "Federated Identity"
      ]
    },
    {
      category: "Cloud & Infrastructure Security",
      level: "",
      domains: [
        "Cloud Security", "CSPM", "Infrastructure Security", 
        "Network Security", "Endpoint Security", "Data Protection",
        "Certificate Management", "Patch Management"
      ]
    },
    {
      category: "Frameworks & Standards",
      level: "",
      domains: [
        "CIS Top 20 Controls", "OWASP Top 10", "MITRE ATT&CK Framework",
        "Security Frameworks", "Industry Standards", "Baseline Configuration"
      ]
    },
    {
      category: "Threat Intelligence & Assessment",
      level: "",
      domains: [
        "Threat Intelligence", "Risk Monitoring Services", "Cyber Intelligence",
        "Threat Assessment", "Intelligence Analysis", "Risk Appetite"
      ]
    },
    {
      category: "Training & Education",
      level: "",
      domains: [
        "Security Training", "User Education", "Awareness Programs",
        "Cybersecurity Education", "Training Development", "Skill Building"
      ]
    },
    {
      category: "Internet Security Standards",
      level: "",
      domains: [
        "DNSSEC", "RPKI", "Internet Governance", "BGP Security",
        "Multi-stakeholder Coordination", "Policy Development"
      ]
    },
    {
      category: "AI & Machine Learning Security",
      level: "",
      domains: [
        "AI Security", "Data Model Security", "Adversarial Attacks",
        "Data Privacy", "Model Security", "AI Risk Assessment"
      ]
    },
    {
      category: "Physical & IoT Security",
      level: "",
      domains: [
        "Physical Security", "IoT Security", "SCADA Security",
        "Industrial Control Systems", "Critical Infrastructure"
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "expert":
        return "from-blue-500 to-cyan-500";
      case "advanced":
        return "from-green-500 to-teal-500";
      case "intermediate":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-slate-500 to-slate-600";
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "expert":
        return "bg-blue-600/20 text-blue-300 border-blue-500/50";
      case "advanced":
        return "bg-green-600/20 text-green-300 border-green-500/50";
      case "intermediate":
        return "bg-yellow-600/20 text-yellow-300 border-yellow-500/50";
      default:
        return "bg-slate-600/20 text-slate-300 border-slate-500/50";
    }
  };

  return (
    <section id="domains" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Cybersecurity Domain Expertise
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Comprehensive mapping of cybersecurity experience across critical security domains, 
            from foundational security practices to cutting-edge AI security and Internet governance.
          </p>
          
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <span className="text-blue-300">Expert Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-teal-500"></div>
              <span className="text-green-300">Advanced Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              <span className="text-yellow-300">Intermediate Level</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {domains.map((category, index) => (
            <div key={index} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${getLevelColor(category.level)} rounded-lg blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
              
              <div className="relative h-full p-6 bg-slate-900/80 backdrop-blur-sm rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white leading-tight">
                    {category.category}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getLevelBadgeColor(category.level)}`}>
                    {category.level}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.domains.map((domain, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-slate-800/70 text-slate-300 rounded-md border border-slate-600/50 hover:border-slate-500 hover:text-white transition-all duration-200 cursor-default"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
                
                <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${getLevelColor(category.level)} opacity-60`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center space-y-4 px-8 py-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg border border-slate-600/50">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse delay-100"></div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse delay-200"></div>
            </div>
            <div className="text-center">
              <p className="text-slate-300 font-medium text-lg mb-2">
                Domain Coverage Analysis
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-blue-300 font-semibold">9 Expert Domains</p>
                  <p className="text-slate-400">Deep specialization</p>
                </div>
                <div className="text-center">
                  <p className="text-green-300 font-semibold">3 Advanced Domains</p>
                  <p className="text-slate-400">Strong proficiency</p>
                </div>
                <div className="text-center">
                  <p className="text-yellow-300 font-semibold">1 Intermediate Domain</p>
                  <p className="text-slate-400">Solid foundation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm max-w-4xl mx-auto">
            This domain mapping represents practical, hands-on experience gained through leadership roles across 
            diverse industries including financial services, government intelligence, energy sector, technology companies, 
            and international organizations. Each domain reflects real-world implementation and strategic oversight experience.
          </p>
        </div>
      </div>
    </section>
  );
};
