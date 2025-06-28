
import { Briefcase } from "lucide-react";

export const Experience = () => {
  const experiences = [
    {
      title: "Information Security Professional, CEO",
      company: "Digital Companion",
      period: "2019 - Present",
      industry: "Information Security",
      highlights: [
        "Implements comprehensive information security solutions for diverse clientele",
        "Drives development of cutting-edge AI-driven security tools",
        "Pioneering virtual security assistant project for GRC operations",
        "Manages full lifecycle of product development"
      ]
    },
    {
      title: "Security Engineering Lead",
      company: "Sinch AB",
      period: "2022 - 2023",
      industry: "IT/Communications",
      highlights: [
        "Enhanced security posture with CSPM and Cloud Vulnerability Management",
        "Developed shift-left security initiatives with automated code reviews",
        "Ensured ISO27001 and GDPR compliance for 200+ staff division",
        "Provided strategic input to global security group (5,000+ employees)"
      ]
    },
    {
      title: "Information Security Consultant",
      company: "Svenska Kraftnät / Nordic RSC",
      period: "2017 - 2019",
      industry: "Energy Sector",
      highlights: [
        "Led security for Nordic power SCADA systems across 4 countries",
        "Implemented ISO 27001, 27002, 27005, and 27019 standards",
        "Conducted penetration testing and risk management for critical infrastructure",
        "Championed pragmatic, results-oriented security approach"
      ]
    },
    {
      title: "Senior Information Security Consultant",
      company: "TrueSec AB",
      period: "2021 - 2022",
      industry: "IT Security",
      highlights: [
        "Enhanced organizational security capabilities",
        "Advised on regulatory compliance including DORA and GDPR",
        "Led operational rollout of ISMS in compliance with ISO 27001"
      ]
    },
    {
      title: "Chief Security Officer (CSO)",
      company: "Netgiro Systems AB",
      period: "2006 - 2008",
      industry: "Financial Services",
      highlights: [
        "Implemented comprehensive security framework for payment solutions",
        "Managed PCI DSS certification and compliance",
        "Developed disaster recovery and business continuity plans",
        "Hands-on security operations and system hardening"
      ]
    },
    {
      title: "Security Specialist",
      company: "Swedish National Police",
      period: "2013 - 2014",
      industry: "Government/Law Enforcement",
      highlights: [
        "Provided organizational security support for National Police Board",
        "Enhanced physical and digital information protection",
        "Established datacenter strategy combining cloud solutions and security",
        "Conducted vulnerability analysis and security audits"
      ]
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
            A comprehensive track record spanning multiple industries and security domains, 
            from startup CSO to enterprise security leadership roles.
          </p>
        </div>

        <div className="space-y-8">
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
            This represents key highlights from a 26+ year career. Additional roles include positions at 
            Skandia, Skanska IT, TeleCity, Qbranch, and various consulting engagements across multiple industries.
          </p>
        </div>
      </div>
    </section>
  );
};
