
export const About = () => {
  const highlights = [
    "27+ years of expertise in IT and Information Security",
    "7-year track record in machine learning engineering",
    "Working roles: CSO, Lead Security Engineer, Security Architect",
    "Comprehensive operational experience across cybersecurity domains",
    "Pragmatic, solution-oriented approach with hands-on technical skills",
    "Board-level discussions and technical team collaboration",
  ];

  const industries = [
    "Financial Services", "Banking", "Military", "Law Enforcement", 
    "Retail", "Energy", "Government", "Technology"
  ];

  const languages = [
    { name: "Swedish", level: "Native" },
    { name: "Danish", level: "Conversational" },
    { name: "Norwegian", level: "Conversational" },
    { name: "English", level: "Fluent" },
    { name: "Spanish", level: "Beginner" },
    { name: "Catalan", level: "Beginner" },
  ];

  return (
    <section id="about" className="py-20 bg-slate-900/50" data-section="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            At a Glance
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A seasoned cybersecurity professional with deep expertise across multiple domains, 
            combining strategic vision with hands-on technical excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Key Highlights</h3>
            <div className="space-y-4" data-highlights>
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-colors duration-200" data-highlight={highlight}>
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-300">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Industry Experience</h3>
              <div className="grid grid-cols-2 gap-3" data-industries>
                {industries.map((industry, index) => (
                  <div key={index} className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30 text-center" data-industry={industry}>
                    <span className="text-slate-300 text-sm font-medium">{industry}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Languages</h3>
              <div className="space-y-3" data-languages>
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50" data-language={lang.name} data-level={lang.level}>
                    <span className="text-slate-300 font-medium">{lang.name}</span>
                    <span className="text-blue-400 text-sm">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30" data-location="Europe (CET)" data-nationality="Swedish National">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-slate-300">Based in Europe (CET) • Swedish National</span>
          </div>
        </div>
      </div>
    </section>
  );
};
