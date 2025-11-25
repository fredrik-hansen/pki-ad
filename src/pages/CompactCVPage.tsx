import { UnifiedHeader } from '../components/UnifiedHeader';
import { Navigation } from '../components/Navigation';
import { cvData } from '../data/cvData';

export default function CompactCVPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navigation />
      <UnifiedHeader mode="compact" />

      {/* Main Content Grid - from original CompactCV.tsx */}
      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Experience */}
        <div className="md:col-span-2 space-y-4">
          <section>
            <h2 className="text-lg font-bold mb-3 border-b border-primary pb-1">Experience Highlights</h2>
            <div className="space-y-3 text-xs">
              {cvData.experience.slice(0, 8).map((exp, i) => (
                <div key={i} className="border-l-2 border-slate-700 pl-3">
                  <div className="font-semibold text-slate-100">{exp.title}</div>
                  <div className="text-primary text-[10px]">{exp.company} • {exp.period}</div>
                  <p className="text-slate-400 text-[11px] mt-1 line-clamp-2">{exp.description[0]}</p>
                </div>
              ))}

              {/* Early Career Summary */}
              <div className="border-l-2 border-slate-700 pl-3 pt-2">
                <div className="font-semibold text-slate-100">Early Career Foundation</div>
                <div className="text-primary text-[10px]">1998 - 2019 • Multiple Sectors</div>
                <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">
                  Progressive 21-year security career across finance (Swedbank, Skandia, Netgiro), government (Swedish National Police, Military Intelligence),
                  energy (Nordic 4-country SCADA systems), and retail (IKEA global e-commerce). Advanced from Security Consultant to CSO and Security Architect roles.
                  Notable: secured critical infrastructure, military intelligence systems, PCI DSS compliance, penetration testing, PKI development;
                  spoke at UN IGF (child safety) and Afric'up summit (smart cities).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 border-b border-primary pb-1">AI & Architecture</h2>
            <div className="bg-slate-900 rounded p-3">
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                Privacy-first AI platform development using local LLMs to solve operational pain points from daily activities.
                Self-hosted architecture eliminating cloud API dependencies while maintaining enterprise-grade security and performance.
              </p>

              <div className="space-y-2 text-[10px]">
                <div>
                  <span className="font-semibold text-slate-100">AI/ML:</span>
                  <span className="text-slate-400"> Ollama • LangChain • LangGraph • RAG • Vector DBs • Whisper</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-100">Frontend:</span>
                  <span className="text-slate-400"> React • TypeScript • Vite • Tailwind • D3.js • Recharts</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-100">Backend:</span>
                  <span className="text-slate-400"> FastAPI • Flask • Python 3.11+ • SQLAlchemy • Pydantic</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-100">Data:</span>
                  <span className="text-slate-400"> PostgreSQL • Redis • OpenSearch • Neo4j • Memgraph</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-100">Security:</span>
                  <span className="text-slate-400"> JWT • RBAC • Auth0 • Authelia • Certificate Mgmt</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-100">DevOps:</span>
                  <span className="text-slate-400"> Docker • Kubernetes • GitLab CI/CD • Nginx • Prometheus</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 border-b border-primary pb-1">Global Impact</h2>
            <div className="space-y-2">
              {cvData.volunteer.map((vol, i) => (
                <div key={i} className="bg-slate-900 rounded p-2">
                  <h3 className="font-semibold text-xs text-slate-100">{vol.title}</h3>
                  <p className="text-[10px] text-primary">{vol.organization}</p>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{vol.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Skills, Certifications */}
        <div className="space-y-4">
          <section>
            <h2 className="text-lg font-bold mb-3 border-b border-primary pb-1">Domain Expertise</h2>
            <div className="space-y-1.5">
              {cvData.skills.map((skillGroup, i) => (
                <div key={i} className="border-l-2 border-slate-700 py-1 pl-2">
                  <h3 className="font-semibold text-xs text-slate-100">{skillGroup.category}</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">{skillGroup.skills.slice(0, 6).join(' • ')}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-3 border-b border-primary pb-1">Certifications</h2>
            <div className="space-y-1">
              {cvData.certifications.map((cert, i) => (
                <div key={i} className="text-[10px]">
                  <span className="font-semibold text-slate-100">{cert.title}</span>
                  <span className="text-slate-400"> • {cert.issuer}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-2 px-6 text-center text-[10px]">
        © 2025 {cvData.name} • {cvData.location}
      </footer>
    </div>
  );
}
