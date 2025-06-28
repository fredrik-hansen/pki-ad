
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import { TechnicalCompetencies } from "../components/TechnicalCompetencies";
import { VolunteerWork } from "../components/VolunteerWork";
import { Contact } from "../components/Contact";
import { Navigation } from "../components/Navigation";
import { PDFExportButton } from "../components/PDFExportButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
       /**<PDFExportButton />**/
      <Hero />
      <About />
      <div className="pdf-page-break">
        <Experience />
      </div>
      <TechnicalCompetencies />
      <VolunteerWork />
      <Contact />
    </div>
  );
};

export default Index;
