import './AppTextInputAction.css';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
  PropsWithChildren,
  useContext,
} from 'react';
import { AppTextInputContext } from '../AppTextInput/AppTextInput';
import AppButton from '../AppButton/AppButton';

type CustomAppTextInputActionProps = {};

type AppTextInputActionProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  CustomAppTextInputActionProps;

const AppTextInputAction = ({
  children,
  ...restProps
}: AppTextInputActionProps) => {
  const textInputContext = useContext(AppTextInputContext);

  if (!textInputContext) throw new Error('Not in AppTextInputContext');

  return (
    <span className="AppTextInputAction">
      <AppButton disabled={textInputContext.disabled} {...restProps}>
        <div className="AppTextInputAction__content">{children}</div>
      </AppButton>
    </span>
  );
};

export default AppTextInputAction;
