/**
 * Shared Design System Tokens
 * Centralized theme constants for consistent styling across the portfolio
 */

export const colors = {
  // Primary brand color
  primary: '#0EA5E9', // cyan-500

  // Backgrounds
  bgDark: '#1A1F2C',
  bgLight: '#F1F0FB',

  // Slate scale for dark theme
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Blue/Cyan scale
  blue: {
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
  },
  cyan: {
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
  },
} as const;

export const gradients = {
  // Header background gradients
  headerBg: 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800',

  // Avatar/icon gradients
  avatar: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  avatarSubtle: 'bg-gradient-to-br from-blue-500/80 to-cyan-500/80',

  // Text gradients
  textPrimary: 'bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent',
  textHero: 'bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent',
  textBrand: 'bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent',
} as const;

export const typography = {
  // Font families
  sans: ['Inter', 'system-ui', 'sans-serif'],
  plex: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
  mono: ['IBM Plex Mono', 'monospace'],

  // Header scales
  hero: {
    name: {
      mobile: 'text-4xl', // 36px
      desktop: 'md:text-5xl', // 48px
    },
    title: {
      mobile: 'text-lg', // 18px
      desktop: 'md:text-xl', // 20px
    },
  },

  compact: {
    name: {
      mobile: 'text-3xl', // 30px
      desktop: 'md:text-4xl', // 36px
    },
    title: {
      mobile: 'text-sm', // 14px
      desktop: 'md:text-base', // 16px
    },
  },
} as const;

export const spacing = {
  // Header padding
  headerPaddingY: {
    mobile: 'py-6',
    desktop: 'md:py-8',
  },
  headerPaddingX: 'px-6',

  // Container max width
  containerMaxWidth: 'max-w-7xl',

  // Section spacing
  sectionGap: 'space-y-4',
} as const;

export const borders = {
  // Border colors
  subtle: 'border-slate-700/30',
  normal: 'border-slate-700',
  divider: 'border-slate-800',

  // Border styles
  bottom: 'border-b',
  left: 'border-l-2',
} as const;

export const transitions = {
  colors: 'transition-colors duration-200',
  all: 'transition-all duration-300',
} as const;

export const effects = {
  // Backdrop blur
  navBlur: 'bg-slate-950/95 backdrop-blur-sm',

  // Shadows (for future use)
  subtle: 'shadow-sm',
  medium: 'shadow-md',
  large: 'shadow-lg',
} as const;
