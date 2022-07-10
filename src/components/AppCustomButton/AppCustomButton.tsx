import './AppCustomButton.css';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type CustomAppCustomButtonProps = {};

export type AppCustomButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  CustomAppCustomButtonProps;

const AppCustomButton = ({ children, ...restProps }: AppCustomButtonProps) => {
  return (
    <button className="AppCustomButton" {...restProps}>
      {children}
    </button>
  );
};

export default AppCustomButton;
