
import { UnifiedHeader } from "../components/UnifiedHeader";
import { Experience } from "../components/Experience";
import { AIProjects } from "../components/AIProjects";
import { CybersecurityDomains } from "../components/CybersecurityDomains";
import { TechnicalCompetencies } from "../components/TechnicalCompetencies";
import { Certifications } from "../components/Certifications";
import { VolunteerWork } from "../components/VolunteerWork";
import { Contact } from "../components/Contact";
import { Navigation } from "../components/Navigation";
import { ExportMenu } from "../components/ExportMenu";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      <ExportMenu />

      <UnifiedHeader mode="full" />
      <div className="pdf-page-break">
        <Experience />
      </div>
      <AIProjects />
      <CybersecurityDomains />
      <TechnicalCompetencies />
      <Certifications />
      <VolunteerWork />
      <Contact />
    </div>
  );
};

export default Index;
