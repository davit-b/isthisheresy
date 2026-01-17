/**
 * Centralized section ordering and colors
 * Used by: Homepage, LeftRail (desktop), MobileMenu
 */

export const SECTION_ORDER: string[] = [
  'How AI Works',
  'Health Basics',
  'Autism',
  'Chemical Exposure',
  'Food Contamination',
  'Nutrition',
  'Water Contamination',
  'Materials',
];

export const SECTION_COLORS: { [key: string]: string } = {
  'How AI Works': '#3b82f6',        // blue
  'Health Basics': '#22c55e',       // green
  'Autism': '#a855f7',              // purple
  'Chemical Exposure': '#ef4444',   // red
  'Food Contamination': '#f59e0b',  // amber
  'Nutrition': '#10b981',           // emerald
  'Water Contamination': '#06b6d4', // cyan
  'Materials': '#8b5cf6',           // violet
};
