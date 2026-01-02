import { useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { WikiBio } from "../components/WikiBio";

const BiographyPage = () => {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Set page title
    document.title = "Fredrik Hansen - Professional Biography";
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <WikiBio />
    </div>
  );
};

export default BiographyPage;
