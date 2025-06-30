
import { ProfessionalRoles } from "./experience/ProfessionalRoles";
import { CareerTimeline } from "./experience/CareerTimeline";

export const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive track record spanning multiple industries and security domains, 
            from startup CSO to enterprise security leadership and international advisory roles.
          </p>
        </div>

        <ProfessionalRoles />
        <CareerTimeline />

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            This comprehensive timeline represents years of progressive cybersecurity leadership across 
            diverse industries including finance, government, energy, technology, and international organizations.
          </p>
        </div>
      </div>
    </section>
  );
};
