import './AppCustomInputAction.css';
import { ButtonHTMLAttributes, DetailedHTMLProps, useContext } from 'react';
import { AppCustomInputContext } from '../AppCustomInput/AppCustomInput';
import AppCustomButton from '../AppCustomButton/AppCustomButton';

type CustomAppCustomInputActionProps = {};

type AppCustomInputActionProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  CustomAppCustomInputActionProps;

const AppCustomInputAction = ({
  children,
  ...restProps
}: AppCustomInputActionProps) => {
  const textInputContext = useContext(AppCustomInputContext);

  if (!textInputContext) throw new Error('Not in AppCustomInputContext');

  return (
    <span className="AppCustomInputAction">
      <AppCustomButton disabled={textInputContext.disabled} {...restProps}>
        <div className="AppCustomInputAction__content">{children}</div>
      </AppCustomButton>
    </span>
  );
};

export default AppCustomInputAction;
