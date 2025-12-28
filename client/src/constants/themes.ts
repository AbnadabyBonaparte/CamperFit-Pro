/**
 * Temas visuais para CamperFit Pro
 */

export type ThemeName = 'daylight' | 'expedition' | 'blueprint' | 'raiz';

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  daylight: {
    name: 'daylight',
    displayName: 'Daylight',
    colors: {
      primary: '#3b82f6', // Blue-500
      secondary: '#8b5cf6', // Purple-500
      background: '#ffffff',
      surface: '#f9fafb', // Gray-50
      text: '#111827', // Gray-900
      textSecondary: '#6b7280', // Gray-500
      border: '#e5e7eb', // Gray-200
      accent: '#10b981', // Green-500
      success: '#10b981',
      warning: '#f59e0b', // Amber-500
      error: '#ef4444', // Red-500
    },
  },
  expedition: {
    name: 'expedition',
    displayName: 'Expedition',
    colors: {
      primary: '#6366f1', // Indigo-500
      secondary: '#8b5cf6',
      background: '#1f2937', // Gray-800
      surface: '#374151', // Gray-700
      text: '#f9fafb', // Gray-50
      textSecondary: '#d1d5db', // Gray-300
      border: '#4b5563', // Gray-600
      accent: '#10b981',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  blueprint: {
    name: 'blueprint',
    displayName: 'Blueprint',
    colors: {
      primary: '#1e40af', // Blue-800
      secondary: '#7c3aed',
      background: '#eff6ff', // Blue-50
      surface: '#dbeafe', // Blue-100
      text: '#1e3a8a', // Blue-900
      textSecondary: '#3b82f6', // Blue-500
      border: '#93c5fd', // Blue-300
      accent: '#0ea5e9', // Sky-500
      success: '#059669', // Emerald-600
      warning: '#d97706', // Amber-600
      error: '#dc2626', // Red-600
    },
  },
  raiz: {
    name: 'raiz',
    displayName: 'Raiz',
    colors: {
      primary: '#16a34a', // Green-600
      secondary: '#ca8a04', // Yellow-600
      background: '#fefdf8', // Warm white
      surface: '#fef3c7', // Amber-50
      text: '#365314', // Green-900
      textSecondary: '#65a30d', // Lime-600
      border: '#d9f99d', // Lime-200
      accent: '#84cc16', // Lime-500
      success: '#16a34a',
      warning: '#ca8a04',
      error: '#dc2626',
    },
  },
};

export const defaultTheme: ThemeName = 'daylight';

