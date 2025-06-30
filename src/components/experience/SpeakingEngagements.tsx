
import { Mic } from "lucide-react";
import { speakingEngagements } from './ExperienceData';

export const SpeakingEngagements = () => {
  return (
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
  );
};
