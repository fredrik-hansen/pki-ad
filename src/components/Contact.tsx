
import { Mail } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-slate-900/50" data-section="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ready to discuss cybersecurity strategy, AI security challenges, or collaboration opportunities? 
            I'm always open to meaningful conversations about securing our digital future.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="text-center" data-email="fh@pki.ad">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
                <Mail className="text-blue-400" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <a 
                href="mailto:fh@pki.ad" 
                className="text-blue-400 hover:text-cyan-400 transition-colors duration-200 text-lg"
              >
                fh@pki.ad
              </a>
            </div>

            <div className="text-center" data-location="Europe (CET)">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600/20 rounded-full mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
              <p className="text-slate-300 text-lg">Europe (CET)</p>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 p-8 bg-slate-800/50 rounded-lg border border-slate-700/50" data-current-info>
              <div className="text-center" data-current-role="CEO, Digital Companion">
                <p className="text-slate-400 text-sm mb-1">Current Role: </p>
                <p className="text-white font-medium">CEO, Digital Companion</p>
              </div>
              <div className="w-px h-12 bg-slate-600 hidden md:block"></div>
              <div className="text-center" data-availability="Open for Consulting">
                <p className="text-slate-400 text-sm mb-1">Availability: </p>
                <p className="text-green-400 font-medium">Open for Consulting</p>
              </div>
              <div className="w-px h-12 bg-slate-600 hidden md:block"></div>
              <div className="text-center" data-specialization="Cybersecurity & AI Security">
                <p className="text-slate-400 text-sm mb-1">Specialization: </p>
                <p className="text-white font-medium">Cybersecurity & AI Security</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="mailto:fh@pki.ad?subject=Partnership%20Inquiry&body=Hello%20Fredrik,%0A%0AI%20would%20like%20to%20discuss..."
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 text-lg"
            >
              <Mail className="mr-3" size={20} />
              Start a Conversation
            </a>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-slate-400 text-sm">
                © 2025 Fredrik Hansen. 
              </p>
            </div>
            <div className="flex space-x-6">
              <span className="text-slate-500 text-sm">Swedish National</span>
              <span className="text-slate-500 text-sm">•</span>
              <span className="text-slate-500 text-sm">Based in Europe</span>
              <span className="text-slate-500 text-sm">•</span>
              <span className="text-slate-500 text-sm">CET Timezone</span>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};
