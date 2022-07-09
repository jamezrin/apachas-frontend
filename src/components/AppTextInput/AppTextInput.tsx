import './AppTextInput.css';
import {
  ChangeEventHandler,
  createContext,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEventHandler,
  PropsWithChildren,
} from 'react';

type AdditionalAppTextInputProps = {
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
};

type AppTextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  AdditionalAppTextInputProps;

export const AppTextInputContext = createContext<AppTextInputProps | undefined>(
  undefined,
);

const AppTextInput = (props: AppTextInputProps) => {
  const { children, onPressEnter, onKeyDown, ...restProps } = props;

  const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (onKeyDown) onKeyDown(e);

    if (onPressEnter && (e.code === 'Enter' || e.code === 'NumpadEnter')) {
      onPressEnter(e);
    }
  };

  return (
    <AppTextInputContext.Provider value={props}>
      <div className="AppTextInput">
        <input
          className="AppTextInput__input"
          onKeyDown={handleOnKeyDown}
          {...restProps}
        />
        <div className="AppTextInput__actions">{children}</div>
      </div>
    </AppTextInputContext.Provider>
  );
};

export default AppTextInput;
