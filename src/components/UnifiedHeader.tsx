import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  User,
  MapPin,
  Mail,
  ChevronDown,
  ChevronUp,
  Layout,
  FileText,
  Layers,
} from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cvData } from "../data/cvData";
import {
  gradients,
  typography,
  spacing,
  transitions,
  borders,
  effects,
} from "../constants/theme";
import type { UnifiedHeaderProps, LayoutStyle } from "../types/header";

export const UnifiedHeader = ({ mode, onModeChange }: UnifiedHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Layout style state with localStorage persistence
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(
        "header-layout-style",
      ) as LayoutStyle | null;
      return stored || "two-lines";
    }
    return "two-lines";
  });

  // About section expansion state
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);

  // Persist layout preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("header-layout-style", layoutStyle);
    }
  }, [layoutStyle]);

  // Cycle through layout styles
  const cycleLayout = () => {
    setLayoutStyle((current) => {
      if (current === "single-line") return "two-lines";
      if (current === "two-lines") return "stacked";
      return "single-line";
    });
  };

  // Toggle mode (full/compact)
  const toggleMode = () => {
    const newPath = location.pathname === "/full" ? "/" : "/full";
    navigate(newPath);
    if (onModeChange) {
      onModeChange(location.pathname === "/full" ? "compact" : "full");
    }
  };

  // Get layout style name for tooltip
  const getLayoutName = () => {
    if (layoutStyle === "single-line") return "Single Line";
    if (layoutStyle === "two-lines") return "Two Lines";
    return "Stacked";
  };

  // Data from cvData
  const name = cvData.name;
  const title = cvData.title;
  const location_text = cvData.location;
  const email = cvData.email;
  const tagline = cvData.tagline.join(" • ");

  // About section data
  const highlights = [
    "27+ years of expertise in IT and Information Security",
    "7-year track record in machine learning engineering",
    "Working roles: CSO, Lead Security Engineer, Security Architect",
    "Comprehensive operational experience across cybersecurity domains",
    "Pragmatic, solution-oriented approach with hands-on technical skills",
    "Board-level discussions and technical team collaboration",
  ];

  const industries = [
    "Financial Services",
    "Banking",
    "Military Intelligence and Security Service",
    "Law Enforcement",
    "Retail",
    "Energy",
    "Government",
    "Technology",
  ];

  const languages = [
    { name: "Swedish", level: "Native" },
    { name: "Danish", level: "Conversational" },
    { name: "Norwegian", level: "Conversational" },
    { name: "English", level: "Fluent" },
    { name: "Spanish", level: "Beginner" },
    { name: "Catalan", level: "Beginner" },
  ];

  // Navigation items
  const navItems = [{ href: "#home", label: "Home" }];

  // Render switchers (mode + layout)
  const renderSwitchers = () => (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMode}
            className={`h-10 w-10 border border-slate-700/30 hover:border-primary/50 ${transitions.all}`}
            aria-label={`Switch to ${mode === "full" ? "compact" : "full"} mode`}
          >
            {mode === "full" ? <FileText size={20} /> : <Layout size={20} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {mode === "full" ? "Compact" : "Fulla Portfolio"}</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleLayout}
            className={`h-10 w-10 border border-slate-700/30 hover:border-primary/50 ${transitions.all}`}
            aria-label="Change header layout"
          >
            <Layers size={20} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Layout: {getLayoutName()}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );

  // Layout 1: Single Line Compact
  const renderSingleLine = () => (
    <div
      className={`h-[60px] ${spacing.headerPaddingX} py-3 ${borders.bottom} border-slate-700/50 ${gradients.headerBg}`}
    >
      <div className="flex items-center justify-between gap-3 h-full">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full ${gradients.avatarSubtle} flex items-center justify-center flex-shrink-0`}
          >
            <User size={20} className="text-white" />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`text-2xl font-bold ${gradients.textPrimary}`}
              data-name={name}
            >
              {name}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-sm text-primary" data-title={title}>
              {title}
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-1 text-xs text-slate-300">
              <MapPin size={12} className="text-primary" />
              <span>{location_text}</span>
            </div>
            <span className="text-slate-600 hidden md:inline">|</span>
            <a
              href={`mailto:${email}`}
              className={`hidden md:flex items-center gap-1 text-xs text-primary hover:text-blue-300 ${transitions.colors}`}
            >
              <Mail size={12} />
              <span>{email}</span>
            </a>
          </div>
        </div>
        {/* {renderSwitchers()} */}
      </div>
    </div>
  );

  // Layout 2: Two Lines Minimal (Default)
  const renderTwoLines = () => (
    <div
      className={`${spacing.headerPaddingY.mobile} ${spacing.headerPaddingY.desktop} ${spacing.headerPaddingX} ${borders.bottom} border-slate-700/50 ${gradients.headerBg}`}
    >
      <div className={`${spacing.containerMaxWidth} mx-auto`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-full ${gradients.avatarSubtle} flex items-center justify-center flex-shrink-0`}
            >
              <User size={28} className="text-white" />
            </div>
            <div>
              <h1
                className={`${typography.compact.name.mobile} ${typography.compact.name.desktop} font-bold mb-1 ${gradients.textPrimary}`}
                data-name={name}
              >
                {name}
              </h1>
              <p
                className={`${typography.compact.title.mobile} ${typography.compact.title.desktop} text-primary font-medium`}
                data-title={title}
              >
                {title}
              </p>
            </div>
          </div>

          <div className="flex items-center md:justify-end gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-slate-300 hover:text-blue-400 text-sm font-medium ${transitions.colors}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={location.pathname === "/full" ? "/" : "/full"}
              className={`text-slate-300 hover:text-blue-400 text-sm font-medium ${transitions.colors} flex items-center gap-1`}
              onClick={(e) => {
                e.preventDefault();
                navigate(location.pathname === "/full" ? "/" : "/full");
              }}
            >
              {location.pathname === "/full" ? (
                <FileText size={16} />
              ) : (
                <Layout size={16} />
              )}
              {location.pathname === "/full" ? "Compact CV" : "Full Portfolio"}
            </a>
          </div>

          {/* <div className="hidden md:block absolute top-6 right-6">
            {renderSwitchers()}
          </div> */}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700/30">
          <p
            className="text-xs md:text-sm text-slate-300 leading-relaxed"
            data-summary={tagline}
          >
            <span className="text-primary font-semibold">
              27+ years cybersecurity expertise
            </span>{" "}
            • {tagline}
          </p>
        </div>
      </div>
    </div>
  );

  // Layout 3: Clean Stacked
  const renderStacked = () => (
    <div
      className={`py-10 md:py-12 ${spacing.headerPaddingX} ${borders.bottom} border-slate-700/50 ${gradients.headerBg} relative`}
    >
      <div className={`${spacing.containerMaxWidth} mx-auto`}>
        <div className="flex flex-col items-center text-center gap-6">
          <div
            className={`w-20 h-20 rounded-full ${gradients.avatar} flex items-center justify-center`}
          >
            <User size={40} className="text-white" />
          </div>

          <div>
            <h1
              className={`text-4xl md:text-5xl font-bold mb-2 ${gradients.textHero}`}
              data-name={name}
            >
              {name}
            </h1>
            <p
              className={`text-lg md:text-xl text-primary font-medium`}
              data-title={title}
            >
              {title}
            </p>
          </div>

          <div className="flex items-center gap-4 text-base text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span>{location_text}</span>
            </div>
            <span className="text-slate-600">|</span>
            <a
              href={`mailto:${email}`}
              className={`flex items-center gap-2 text-primary hover:text-blue-300 ${transitions.colors}`}
            >
              <Mail size={16} />
              <span>{email}</span>
            </a>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-700/30 max-w-4xl">
            <p
              className="text-base md:text-lg text-slate-300 leading-relaxed"
              data-summary={tagline}
            >
              <span className="text-primary font-semibold">
                27+ years cybersecurity expertise
              </span>{" "}
              • {tagline}
            </p>
          </div>
        </div>

        {/* <div className="absolute top-6 right-6">
          {renderSwitchers()}
        </div> */}
      </div>
    </div>
  );

  // Render About section (expandable)
  const renderAboutSection = () => (
    <div className="border-t border-slate-700/30">
      <button
        onClick={() => setIsAboutExpanded(!isAboutExpanded)}
        className={`w-full py-3 px-6 flex items-center justify-between hover:bg-slate-800/30 ${transitions.all}`}
        aria-expanded={isAboutExpanded}
        aria-label="Toggle professional highlights"
      >
        <span className="text-sm md:text-base text-slate-300 font-medium">
          {isAboutExpanded ? "▲" : "▼"} Professional Highlights
        </span>
        {isAboutExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isAboutExpanded && (
        <div
          className="bg-slate-900/30 py-6 px-6 border-t border-slate-700/30 animate-in slide-in-from-top duration-200"
          data-section="about"
        >
          <div className={`${spacing.containerMaxWidth} mx-auto`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Highlights Section */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Key Highlights
                </h3>
                <div className="space-y-3" data-highlights>
                  {highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition-colors duration-200"
                      data-highlight={highlight}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                      <p className="text-slate-300 text-sm">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industries & Languages Section */}
              <div className="space-y-6">
                {/* Industries */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Industry Experience
                  </h3>
                  <div className="grid grid-cols-2 gap-2" data-industries>
                    {industries.map((industry, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30 text-center"
                        data-industry={industry}
                      >
                        <span className="text-slate-300 text-xs font-medium">
                          {industry}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Languages
                  </h3>
                  <div className="space-y-2" data-languages>
                    {languages.map((lang, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                        data-language={lang.name}
                        data-level={lang.level}
                      >
                        <span className="text-slate-300 font-medium text-sm">
                          {lang.name}
                        </span>
                        <span className="text-blue-400 text-sm">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location/Nationality */}
                <div className="flex justify-center">
                  <div
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30"
                    data-location="Europe (CET)"
                    data-nationality="Swedish National"
                  >
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-slate-300 text-sm">
                      Based in Europe (CET) • Swedish National
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Main render with layout selection
  return (
    <section className="relative">
      {layoutStyle === "single-line" && renderSingleLine()}
      {layoutStyle === "two-lines" && renderTwoLines()}
      {layoutStyle === "stacked" && renderStacked()}
      {renderAboutSection()}
    </section>
  );
};
