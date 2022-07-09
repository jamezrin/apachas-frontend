import { describe, expect, it } from 'vitest';
import {
  CURATED_BACKGROUND_IDS,
  getBackgroundImageUrl,
} from '../service/background-gallery-service';
import fetch from 'node-fetch';

describe('background gallery service', () => {
  it('url is built correctly', async () => {
    const backgroundId = '2832468';
    const expectedUrl =
      'https://images.pexels.com/photos/2832468/pexels-photo-2832468.jpeg?cs=srgb';

    const actualUrl = getBackgroundImageUrl(backgroundId);
    expect(actualUrl).eq(expectedUrl);
  });

  for (const backgroundId of CURATED_BACKGROUND_IDS) {
    it(`background ${backgroundId} to work`, async () => {
      const backgroundUrl = getBackgroundImageUrl(backgroundId);
      //console.log(`requesting background ${backgroundId}: ${backgroundUrl}`);

      const response = await fetch(backgroundUrl, {
        method: 'HEAD',
      });

      expect(response.status).eq(200);
      expect(response.headers.get('content-type')).match(/^image/);
    });
  }
});
