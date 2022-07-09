const CURATED_BACKGROUNDS = {
  '2798881': 'jpeg',
  '2832456': 'jpeg',
  '2832468': 'jpeg',
  '2832439': 'png',
  '1103970': 'jpeg',
} as const;

export type Background = keyof typeof CURATED_BACKGROUNDS;
export const CURATED_BACKGROUND_IDS = Object.keys(CURATED_BACKGROUNDS) as ReadonlyArray<Background>;

export function getBackgroundImageUrl(background: Background): string {
  const ext = CURATED_BACKGROUNDS[background];
  return `https://images.pexels.com/photos/${background}/pexels-photo-${background}.${ext}?cs=srgb`;
}
