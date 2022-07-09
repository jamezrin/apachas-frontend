import './AppBackground.css';
import backgroundService from '../../service/background-gallery';
import { useEffect, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';

const AppBackground = () => {
  //const backgroundImageUrl = backgroundService.getBackgroundImageUrl('2832468');
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>();

  const changeInterval = 10 * 1000;

  const setRandomBackground = () => {
    const randomBackgroundImageId = backgroundService.getRandomBackgroundId();
    const randomBackgroundImageUrl = backgroundService.getBackgroundImageUrl(
      randomBackgroundImageId,
    );

    setBackgroundImageUrl(randomBackgroundImageUrl);
  };

  useEffect(() => {
    setRandomBackground();

    const intervalId = setInterval(() => setRandomBackground(), changeInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="DynamicBackground">
      <div
        className="DynamicBackground__background"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      ></div>
    </div>
  );
};

export default AppBackground;
