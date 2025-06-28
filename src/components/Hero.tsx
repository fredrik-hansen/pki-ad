
import { Mail, User } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8 animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/20">
            <User size={64} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent animate-fade-in">
          Fredrik Hansen
        </h1>
        
        <p className="text-xl md:text-2xl text-blue-400 mb-4 animate-fade-in">
          Senior IT & Information Security Expert
        </p>
        
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          26+ years of cybersecurity expertise • Security architecture & engineering • 
          AI security specialist • Board-level strategic advisor
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
          >
            <Mail className="mr-2" size={20} />
            Get In Touch
          </a>
          <a
            href="#about"
            className="inline-flex items-center px-8 py-3 border border-slate-600 text-base font-medium rounded-lg text-slate-300 hover:text-white hover:border-blue-500 transition-all duration-200"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};
