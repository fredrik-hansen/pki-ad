import { Lightbulb, Code2 } from "lucide-react";
import { aiProjects, projectTechnologies } from "@/data/aiProjects";

export const AIProjects = () => {
  return (
    <section id="ai-projects" className="py-20 bg-slate-900/50" data-section="ai-projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AI & Personal Projects Portfolio
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Independent projects demonstrating expertise in AI/ML engineering and full-stack development,
            showcasing innovation in privacy-first AI agents, multi-agent orchestration, and intelligent automation.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16" data-ai-projects>
          {aiProjects.map((project, index) => (
            <div
              key={index}
              className="p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
              data-ai-project
              data-project-name={project.name}
              data-category={project.category}
              data-year={project.year}
              data-description={project.description}
              data-technologies={project.technologies.join(', ')}
            >
              {/* Header with Category Badge and Year */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    project.category === 'AI/ML Engineering'
                      ? 'bg-blue-600/20'
                      : 'bg-purple-600/20'
                  }`}>
                    {project.category === 'AI/ML Engineering' ? (
                      <Lightbulb size={20} className="text-blue-400" />
                    ) : (
                      <Code2 size={20} className="text-purple-400" />
                    )}
                  </div>
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    project.category === 'AI/ML Engineering'
                      ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-blue-300'
                      : 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300'
                  }`}>
                    {project.category}
                  </div>
                </div>
                <span className="text-slate-400 text-sm font-medium">{project.year}</span>
              </div>

              {/* Project Name */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {project.name}
              </h3>

              {/* Description */}
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technology Pills */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs rounded-md bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack Summary */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-white mb-8 text-center">
            Key Technologies Used Across Projects
          </h3>
          <div className="space-y-6" data-project-technologies>
            {Object.entries(projectTechnologies).map(([category, techs], index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-lg font-medium text-blue-400">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1.5 text-sm rounded-md bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-blue-500/50 transition-colors duration-200"
                      data-tech={tech}
                      data-category={category}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            These projects demonstrate a commitment to continuous learning and innovation in AI/ML technologies,
            privacy-first architectures, and modern full-stack development practices.
          </p>
        </div>
      </div>
    </section>
  );
};
