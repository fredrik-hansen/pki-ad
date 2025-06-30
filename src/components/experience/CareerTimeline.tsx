
import { Briefcase } from "lucide-react";
import { experiences } from './ExperienceData';

export const CareerTimeline = () => {
  return (
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
  );
};
