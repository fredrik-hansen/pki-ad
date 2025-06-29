
import { Code } from "lucide-react";

export const TechnicalCompetencies = () => {
  const competencies = [
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

  return (
    <section id="competencies" className="py-20 bg-slate-900/50" data-section="competencies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Technical Competencies
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive expertise across cybersecurity domains, from traditional security practices 
            to cutting-edge AI security and Internet governance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-competencies>
          {competencies.map((category, index) => (
            <div key={index} className="group" data-category={category.category}>
              <div className="h-full p-6 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-blue-600/20 rounded-lg group-hover:bg-blue-600/30 transition-colors duration-300">
                    <Code size={20} className="text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2" data-skills>
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-slate-700 to-slate-600 text-slate-300 rounded-full border border-slate-600 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-200 cursor-default"
                      data-skill={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            </div>
            <span className="text-slate-300 font-medium">
              Continuously evolving with emerging threats and technologies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
