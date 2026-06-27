/**
 * Visual Engine Tokens — Phase 30 approved values.
 * Single source of truth for programmatic use; mirrors CSS custom properties in globals.css.
 */

export const colors = {
  brandOrange: '#E46F1E',
  brandOrangeDeep: '#C45A12',
  brandBlue: '#2B6EF2',
  brandBlueDeep: '#1E56C9',
  voidDeep: '#050810',
  void: '#070B14',
  voidElevated: '#0A0F1A',
  voidPanel: '#0D1424',
  paper: '#FFFFFF',
  paperMuted: '#FAFAFA',
  paperWarm: '#F8F7F5',
  ink: '#111827',
  inkSecondary: '#475569',
  inkTertiary: '#94A3B8',
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  16: 64,
  20: 80,
  28: 112,
  36: 144,
  44: 176,
} as const;

export const container = {
  standard: 1280,
  wide: 1440,
  marginDesktop: 48,
  marginTablet: 32,
  marginMobile: 24,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  pill: 9999,
} as const;

export const motion = {
  instant: 150,
  fast: 200,
  base: 400,
  slow: 700,
  reveal: 800,
  draw: 1200,
  ambientMin: 6000,
  ambientMax: 8000,
  orbit: 60000,
  easeSignal: 'cubic-bezier(0.22, 1, 0.36, 1)',
  easeDraw: 'cubic-bezier(0.25, 0.1, 0, 1)',
  springNav: { stiffness: 80, damping: 20 },
} as const;

export const signal = {
  lineWidth: 1,
  lineWidthActive: 2,
  lineColor: 'rgba(43, 110, 242, 0.35)',
  nodeRadius: 2,
  hubRadius: 4,
  connectionDistance: 140,
  travelPulseDuration: 3000,
  nodeBreatheDuration: 2000,
  opacity: {
    hero: 0.7,
    header: 0.08,
    grid: 0.12,
    watermark: 0.04,
    light: 0.06,
  },
} as const;

export const particles = {
  hero: 12,
  cta: 10,
  tech: 8,
  sizeMin: 1,
  sizeMax: 4,
  speedMin: 8,
  speedMax: 14,
} as const;

export const camera = {
  perspective: 1200,
  parallax: {
    background: 0.3,
    signal: 0.6,
    content: 1,
    widgets: 1.2,
    particles: 1.4,
  },
} as const;

export const glow = {
  xs: { blur: 12, opacity: 0.2 },
  sm: { blur: 20, opacity: 0.3 },
  md: { blur: 40, opacity: 0.25 },
  lg: { blur: 80, opacity: 0.2 },
  xl: { blur: 120, opacity: 0.15 },
} as const;

export const bridgeHeights = {
  heroToLogos: 80,
  logosToServices: 60,
  servicesToProjects: 120,
  projectsToProcess: 100,
  processToTech: 100,
  techToCases: 80,
  casesToTestimonials: 100,
  testimonialsToMetrics: 60,
  metricsToCta: 60,
  ctaToFooter: 80,
} as const;

export const signalCoreScale = {
  hero: 112,
  services: 48,
  portfolio: 64,
  technology: 112,
  testimonials: 32,
  metrics: 48,
  cta: 80,
  footer: 800,
} as const;

export const chapterBg: Record<string, string> = {
  'void-deep': colors.voidDeep,
  void: colors.void,
  'void-elevated': colors.voidElevated,
  'void-panel': colors.voidPanel,
  paper: colors.paper,
  'paper-muted': colors.paperMuted,
  'paper-warm': colors.paperWarm,
};
