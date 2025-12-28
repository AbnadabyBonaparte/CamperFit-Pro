export function getThemeColorForThree(cssVar: string, fallbackHex: string): number {
  if (typeof window === 'undefined') {
    return parseInt(fallbackHex.replace('#', ''), 16);
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVar)
    .trim();

  const hex = value || fallbackHex;
  return parseInt(hex.replace('#', ''), 16);
}
