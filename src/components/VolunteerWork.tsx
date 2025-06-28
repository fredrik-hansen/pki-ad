
export const VolunteerWork = () => {
  const volunteerRoles = [
    {
      title: "Chairman, PK 636",
      organization: "Swedish Institute for Standards",
      period: "2021 - 2023",
      description: "Led the creation of a Swedish adaptation of the NIST Cybersecurity Framework, enhancing cyber resilience across organizations with diverse security expertise.",
      impact: "National cybersecurity framework development"
    },
    {
      title: "Contributing Researcher",
      organization: "UN Internet Governance Forum - Policy Network on AI",
      period: "2023",
      description: "Spearheaded collaborative ideation focusing on leveraging AI technology, responding to UN Secretary-General's mandate for strategic recommendations.",
      impact: "Global AI governance policy development"
    },
    {
      title: "Cybersecurity Researcher & Speaker",
      organization: "UN Internet Governance Forum - Best Practice Cybersecurity",
      period: "2018 - 2021",
      description: "Conducted pivotal research on cyber norms effectiveness, authored comprehensive 77-page qualitative research report, and presented at UN IGF workshops.",
      impact: "Global cybersecurity discourse leadership"
    },
    {
      title: "Subject Matter Expert",
      organization: "Internet Standards, Security and Safety Coalition (IS3C)",
      period: "2023 - Present",
      description: "Contributing to Working Group 8 to improve DNSSEC and RPKI technology narratives, collaborating with ICANN and RIPE NCC experts.",
      impact: "Internet security infrastructure advancement"
    }
  ];

  const speakingEngagements = [
    {
      event: "UN Internet Governance Forum 2021",
      location: "Katowice, Poland",
      topic: "Cybersecurity Norms Effectiveness Research",
      description: "Presented key findings from comprehensive research on cyber norm adoption and effectiveness."
    },
    {
      event: "UN Internet Governance Forum 2018",
      location: "UNESCO, Paris",
      topic: "Online Child Safety & Protection",
      description: "Addressed global leaders on combating online child sexual exploitation and safeguarding measures."
    },
    {
      event: "Afric'Up Tech & Startup Summit 2019",
      location: "Africa",
      topic: "Secure Smart Cities Development",
      audience: "3,700+ attendees from 32 nations",
      description: "Advocated for citizen-centric secure smart cities and served as startup pitch jury member."
    }
  ];

  return (
    <section id="volunteer" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Global Impact & Leadership
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Contributing to international cybersecurity standards, AI governance, and Internet safety 
            through volunteer research, policy development, and thought leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mr-4"></div>
              Volunteer & Research Roles
            </h3>
            
            <div className="space-y-6">
              {volunteerRoles.map((role, index) => (
                <div key={index} className="p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white mb-1">{role.title}</h4>
                    <p className="text-blue-400 font-medium text-sm">{role.organization}</p>
                    <p className="text-slate-500 text-xs">{role.period}</p>
                  </div>
                  
                  <p className="text-slate-300 text-sm mb-3 leading-relaxed">{role.description}</p>
                  
                  <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full border border-green-500/30">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-green-300 text-xs font-medium">{role.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full mr-4"></div>
              Speaking Engagements
            </h3>
            
            <div className="space-y-6">
              {speakingEngagements.map((engagement, index) => (
                <div key={index} className="p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold text-white mb-1">{engagement.event}</h4>
                    <p className="text-cyan-400 font-medium text-sm">{engagement.location}</p>
                    {engagement.audience && (
                      <p className="text-slate-500 text-xs">{engagement.audience}</p>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <span className="inline-flex px-3 py-1 bg-cyan-600/20 rounded-full border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                      {engagement.topic}
                    </span>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed">{engagement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center p-8 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-lg border border-blue-500/20">
          <h4 className="text-xl font-semibold text-white mb-4">Global Collaboration</h4>
          <p className="text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Working alongside international experts from organizations including ICANN, RIPE NCC, UNICEF, 
            Internet Watch Foundation, and various UN bodies to advance cybersecurity, AI governance, 
            and Internet safety on a global scale.
          </p>
        </div>
      </div>
    </section>
  );
};
