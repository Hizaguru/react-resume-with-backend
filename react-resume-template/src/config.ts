export const isBrowser = typeof window !== 'undefined';
export const isMobile = true;
export const canUseDOM: boolean =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';
export const isApple: boolean = canUseDOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
