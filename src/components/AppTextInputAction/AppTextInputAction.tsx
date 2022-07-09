import './AppTextInputAction.css';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
  PropsWithChildren,
  useContext,
} from 'react';
import { AppTextInputContext } from '../AppTextInput/AppTextInput';

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
    <button
      className="AppTextInputAction"
      disabled={textInputContext.disabled}
      {...restProps}
    >
      <div className="AppTextInputAction__content">{children}</div>
    </button>
  );
};

export default AppTextInputAction;
