import { describe, expect, it } from 'vitest';
import backgroundService from '../service/background-gallery';
import fetch from 'node-fetch';

describe('background gallery service', () => {
  it('url is built correctly', async () => {
    const backgroundId = '2832468';
    const expectedUrl =
      'https://images.pexels.com/photos/2832468/pexels-photo-2832468.jpeg?cs=srgb';

    const actualUrl = backgroundService.getBackgroundImageUrl(backgroundId);
    expect(actualUrl).eq(expectedUrl);
  });

  for (const backgroundId of backgroundService.curatedBackgroundIds) {
    it(`background ${backgroundId} to work`, async () => {
      const backgroundUrl =
        backgroundService.getBackgroundImageUrl(backgroundId);
      //console.log(`requesting background ${backgroundId}: ${backgroundUrl}`);

      const response = await fetch(backgroundUrl, {
        method: 'HEAD',
      });

      expect(response.status).eq(200);
      expect(response.headers.get('content-type')).match(/^image/);
    });
  }
});
