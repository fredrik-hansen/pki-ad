/**
 * DEPRECATED: This component has been replaced by UnifiedHeader.tsx
 * @deprecated Use UnifiedHeader component instead
 * Kept for rollback capability only
 */

import { Mail, MapPin, User } from "lucide-react";
import { gradients, typography, spacing, transitions } from "../constants/theme";

export const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden mt-16">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800"></div>

      <header className={`relative z-10 ${spacing.headerPaddingY.mobile} ${spacing.headerPaddingY.desktop} ${spacing.headerPaddingX} border-b border-slate-700/50`}>
        <div className={`${spacing.containerMaxWidth} mx-auto`}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            {/* Left side: Avatar + Name + Title */}
            <div className="flex items-center gap-4">
              <div className={`hidden md:flex w-16 h-16 rounded-full ${gradients.avatarSubtle} items-center justify-center flex-shrink-0`}>
                <User size={32} className="text-white" />
              </div>
              <div>
                <h1 className={`${typography.hero.name.mobile} ${typography.hero.name.desktop} font-bold mb-1 ${gradients.textPrimary}`} data-name="Fredrik Hansen">
                  Fredrik Hansen
                </h1>
                <p className={`${typography.hero.title.mobile} ${typography.hero.title.desktop} text-primary font-medium`} data-title="Senior IT & Information Security Expert">
                  Senior IT & Information Security Expert
                </p>
              </div>
            </div>

            {/* Right side: Contact Info */}
            <div className="text-left md:text-right text-sm space-y-1.5">
              <p className="text-slate-300 flex items-center gap-2 md:justify-end">
                <MapPin size={14} className="text-primary" />
                Stockholm, Sweden
              </p>
              <a
                href="mailto:fredrik@pki.ad"
                className={`text-primary hover:text-blue-300 ${transitions.colors} flex items-center gap-2 md:justify-end`}
              >
                <Mail size={14} />
                fredrik@pki.ad
              </a>
            </div>
          </div>

          {/* Tagline Summary */}
          <div className="mt-6 pt-6 border-t border-slate-700/30">
            <p className="text-sm md:text-base text-slate-300 leading-relaxed" data-summary="27+ years cybersecurity expertise">
              <span className="text-primary font-semibold">27+ years cybersecurity expertise</span> •
              Security architecture & engineering •
              AI security specialist •
              Board-level strategic advisor
            </p>
          </div>
        </div>
      </header>
    </section>
  );
};
