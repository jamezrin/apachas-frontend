import './AppWrapper.css';
import { PropsWithChildren } from 'react';
import AppBackground from '../AppBackground/AppBackground';

type AppWrapperProps = PropsWithChildren<{}>;

const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <>
      <AppBackground />
      <div className="AppWrapper">{children}</div>
    </>
  );
};

export default AppWrapper;
