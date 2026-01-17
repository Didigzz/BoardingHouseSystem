// BHMS Mobile Theme - Real Estate/Property Management Color Palette
// Based on UI/UX Pro Max recommendations

export const colors = {
  // Primary - Teal (Trust & Property)
  primary: {
    50: '#F0FDFA',
    100: '#CCFBF1',
    200: '#99F6E4',
    300: '#5EEAD4',
    400: '#2DD4BF',
    500: '#14B8A6',
    600: '#0D9488',
    700: '#0F766E',
    800: '#115E59',
    900: '#134E4A',
  },
  // Secondary - Blue (Trust)
  secondary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  // CTA - Orange (Action)
  cta: {
    500: '#F97316',
    600: '#EA580C',
    700: '#C2410C',
  },
  // Neutral
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  // Base
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const typography = {
  // Poppins for headings, Open Sans for body (Modern Professional)
  fontFamily: {
    heading: 'Poppins',
    body: 'OpenSans',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
} as const;

// Light theme
export const lightTheme = {
  colors: {
    background: colors.neutral[50],
    surface: colors.white,
    surfaceSecondary: colors.neutral[100],
    text: colors.neutral[900],
    textSecondary: colors.neutral[600],
    textMuted: colors.neutral[400],
    border: colors.neutral[200],
    primary: colors.primary[700],
    primaryLight: colors.primary[50],
    secondary: colors.secondary[600],
    cta: colors.cta[500],
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  },
};

// Dark theme
export const darkTheme = {
  colors: {
    background: colors.neutral[900],
    surface: colors.neutral[800],
    surfaceSecondary: colors.neutral[700],
    text: colors.neutral[50],
    textSecondary: colors.neutral[300],
    textMuted: colors.neutral[500],
    border: colors.neutral[700],
    primary: colors.primary[400],
    primaryLight: colors.primary[900],
    secondary: colors.secondary[400],
    cta: colors.cta[500],
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  },
};

export type Theme = typeof lightTheme;
