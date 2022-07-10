import './AppButton.css';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  useContext,
} from 'react';

type CustomAppButtonProps = {};

export type AppButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  CustomAppButtonProps;

const AppButton = ({ children, ...restProps }: AppButtonProps) => {
  return (
    <button className="AppButton" {...restProps}>
      {children}
    </button>
  );
};

export default AppButton;
