
import { professionalRoles } from './ExperienceData';

export const ProfessionalRoles = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Key Professional Roles
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionalRoles.map((role, index) => (
          <div key={index} className="p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-all duration-300" data-role={role.dataRole}>
            <h4 className="text-lg font-semibold text-blue-400 mb-3">{role.role}</h4>
            <p className="text-slate-300 text-sm">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
