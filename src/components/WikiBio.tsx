import { useState, useEffect } from "react";
import { biographyData, type BiographySection } from "../data/biographyData";
import { Book } from "lucide-react";

export const WikiBio = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section-id]");
      let current = "";

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute("data-section-id") || "";
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderContent = (content: string[]) => {
    return content.map((paragraph, index) => {
      // Replace citation markers [1], [2], etc. with superscript links
      const parts = paragraph.split(/(\[\d+\])/g);
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {parts.map((part, i) => {
            const citationMatch = part.match(/\[(\d+)\]/);
            if (citationMatch) {
              const citationNum = citationMatch[1];
              return (
                <a
                  key={i}
                  href={`#cite-${citationNum}`}
                  className="text-blue-600 hover:underline"
                >
                  <sup>[{citationNum}]</sup>
                </a>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </p>
      );
    });
  };

  const renderSection = (section: BiographySection, level: number = 2) => {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    const headingClass = level === 2 ? "text-2xl font-bold mt-8 mb-4 pb-2 border-b border-gray-300" : "text-xl font-semibold mt-6 mb-3";

    return (
      <div key={section.id} data-section-id={section.id} id={section.id}>
        <HeadingTag className={headingClass}>{section.title}</HeadingTag>
        {section.content.length > 0 && (
          <div className="text-gray-800">
            {renderContent(section.content)}
          </div>
        )}
        {section.subsections &&
          section.subsections.map((subsection) =>
            renderSection(subsection, level + 1)
          )}
      </div>
    );
  };

  const generateTOC = () => {
    const items: JSX.Element[] = [];

    biographyData.sections.forEach((section) => {
      items.push(
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className={`hover:underline ${
              activeSection === section.id ? "font-semibold text-blue-700" : "text-blue-600"
            }`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {section.title}
          </a>
          {section.subsections && section.subsections.length > 0 && (
            <ul className="ml-4 mt-1 space-y-1">
              {section.subsections.map((subsection) => (
                <li key={subsection.id}>
                  <a
                    href={`#${subsection.id}`}
                    className={`text-sm hover:underline ${
                      activeSection === subsection.id ? "font-semibold text-blue-700" : "text-blue-600"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(subsection.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {subsection.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    });

    return items;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wikipedia-style header */}
        <div className="mb-8 pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Book className="w-8 h-8 text-gray-700" />
            <h1 className="text-4xl font-serif font-bold text-gray-900">
              {biographyData.name}
            </h1>
          </div>
          <p className="text-sm text-gray-500 italic">
            Professional Biography
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <h2 className="text-sm font-bold uppercase text-gray-700 mb-3">
                  Contents
                </h2>
                <nav>
                  <ul className="space-y-2 text-sm">
                    {generateTOC()}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Lead Section */}
            <div className="mb-6 text-gray-800 font-serif">
              {biographyData.lead.map((paragraph, index) => {
                const parts = paragraph.split(/(\[\d+\])/g);
                return (
                  <p key={index} className="mb-4 leading-relaxed text-lg">
                    {parts.map((part, i) => {
                      const citationMatch = part.match(/\[(\d+)\]/);
                      if (citationMatch) {
                        const citationNum = citationMatch[1];
                        return (
                          <a
                            key={i}
                            href={`#cite-${citationNum}`}
                            className="text-blue-600 hover:underline"
                          >
                            <sup>[{citationNum}]</sup>
                          </a>
                        );
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </p>
                );
              })}
            </div>

            {/* Table of Contents - Mobile */}
            <div className="lg:hidden mb-6 bg-gray-50 border border-gray-200 rounded p-4">
              <h2 className="text-sm font-bold uppercase text-gray-700 mb-3">
                Contents
              </h2>
              <nav>
                <ul className="space-y-2 text-sm">
                  {generateTOC()}
                </ul>
              </nav>
            </div>

            {/* Sections */}
            <div className="font-serif">
              {biographyData.sections.map((section) => renderSection(section))}
            </div>

            {/* References */}
            <div className="mt-12 pt-6 border-t-2 border-gray-300" id="references">
              <h2 className="text-2xl font-bold mb-4">References</h2>
              <ol className="space-y-3">
                {biographyData.citations.map((citation) => (
                  <li
                    key={citation.id}
                    id={`cite-${citation.id}`}
                    className="text-sm text-gray-700"
                  >
                    <span className="font-semibold">↑ {citation.id}. </span>
                    {citation.url ? (
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {citation.text}
                      </a>
                    ) : (
                      <span>{citation.text}</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Footer Note */}
            <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
              <p>
                This page is formatted in the style of an encyclopedic
                biography for professional presentation.
              </p>
              <p className="mt-1">
                Last updated: {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
