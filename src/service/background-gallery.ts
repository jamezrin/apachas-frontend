const CURATED_BACKGROUNDS_AND_EXTS = {
  '2798881': 'jpeg',
  '2832456': 'jpeg',
  '2832468': 'jpeg',
  '2832439': 'png',
  '1103970': 'jpeg',
} as const;

export type Background = keyof typeof CURATED_BACKGROUNDS_AND_EXTS;

export const curatedBackgroundIds = Object.keys(
  CURATED_BACKGROUNDS_AND_EXTS,
) as ReadonlyArray<Background>;

function getBackgroundImageUrl(background: Background): string {
  const ext = CURATED_BACKGROUNDS_AND_EXTS[background];
  return `https://images.pexels.com/photos/${background}/pexels-photo-${background}.${ext}?cs=srgb`;
}

function getRandomBackgroundId(): Background {
  return curatedBackgroundIds[
    Math.floor(Math.random() * curatedBackgroundIds.length)
  ];
}

export default {
  getBackgroundImageUrl,
  getRandomBackgroundId,
  curatedBackgroundIds,
};
