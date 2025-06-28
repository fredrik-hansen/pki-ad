
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import { TechnicalCompetencies } from "../components/TechnicalCompetencies";
import { VolunteerWork } from "../components/VolunteerWork";
import { Contact } from "../components/Contact";
import { Navigation } from "../components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <TechnicalCompetencies />
      <VolunteerWork />
      <Contact />
    </div>
  );
};

export default Index;
