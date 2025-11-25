/**
 * Type definitions for unified header component
 */

export type HeaderMode = 'full' | 'compact';
export type LayoutStyle = 'single-line' | 'two-lines' | 'stacked';

export interface UnifiedHeaderProps {
  mode: HeaderMode;
  onModeChange?: (mode: HeaderMode) => void;
}
