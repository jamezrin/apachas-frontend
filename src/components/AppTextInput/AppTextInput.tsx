import './AppTextInput.css';
import {
  ChangeEventHandler,
  createContext,
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from 'react';

type AdditionalAppTextInputProps = {};

type AppTextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  AdditionalAppTextInputProps;

export const AppTextInputContext = createContext<AppTextInputProps | undefined>(
  undefined,
);

const AppTextInput = (props: AppTextInputProps) => {
  const { children, ...restProps } = props;
  return (
    <AppTextInputContext.Provider value={props}>
      <div className="AppTextInput">
        <input className="AppTextInput__input" {...restProps} />
        <div className="AppTextInput__actions">{children}</div>
      </div>
    </AppTextInputContext.Provider>
  );
};

export default AppTextInput;
