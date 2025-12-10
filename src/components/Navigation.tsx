
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText, Layout } from "lucide-react";
import { gradients, transitions, effects, borders, spacing } from "../constants/theme";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#competencies", label: "Skills" },
    { href: "#volunteer", label: "Volunteer" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 ${transitions.all} ${
      scrolled ? `${effects.navBlur} ${borders.bottom} ${borders.divider}` : "bg-transparent"
    }`}>
      <div className={`${spacing.containerMaxWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className={`text-xl font-bold ${gradients.textBrand}`}>
              FH
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-slate-300 hover:text-blue-400 px-3 py-2 text-sm font-medium ${transitions.colors}`}
                >
                  {item.label}
                </a>
              ))}
              <Link
                to={location.pathname === '/full' ? '/' : '/full'}
                className={`text-slate-300 hover:text-blue-400 px-3 py-2 text-sm font-medium ${transitions.colors} flex items-center gap-1`}
              >
                {location.pathname === '/full' ? <FileText size={16} /> : <Layout size={16} />}
                {location.pathname === '/full' ? 'Compact CV' : 'Full Portfolio'}
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-blue-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`md:hidden ${effects.navBlur} ${borders.bottom} ${borders.divider}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-slate-300 hover:text-blue-400 block px-3 py-2 text-base font-medium ${transitions.colors}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              to={location.pathname === '/full' ? '/' : '/full'}
              className={`text-slate-300 hover:text-blue-400 block px-3 py-2 text-base font-medium ${transitions.colors} flex items-center gap-2`}
              onClick={() => setIsOpen(false)}
            >
              {location.pathname === '/full' ? <FileText size={18} /> : <Layout size={18} />}
              {location.pathname === '/full' ? 'Compact CV' : 'Full Portfolio'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
