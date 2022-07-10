import './AppCustomInput.css';
import {
  ChangeEventHandler,
  createContext,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEventHandler,
  PropsWithChildren,
} from 'react';

type AdditionalAppCustomInputProps = {
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>;
};

type AppCustomInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  AdditionalAppCustomInputProps;

export const AppCustomInputContext = createContext<
  AppCustomInputProps | undefined
>(undefined);

const AppCustomInput = (props: AppCustomInputProps) => {
  const { children, onPressEnter, onKeyDown, ...restProps } = props;

  const handleOnKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (onKeyDown) onKeyDown(e);

    if (onPressEnter && (e.code === 'Enter' || e.code === 'NumpadEnter')) {
      onPressEnter(e);
    }
  };

  return (
    <AppCustomInputContext.Provider value={props}>
      <div className="AppCustomInput">
        <input
          className="AppCustomInput__input"
          onKeyDown={handleOnKeyDown}
          {...restProps}
        />
        <div className="AppCustomInput__actions">{children}</div>
      </div>
    </AppCustomInputContext.Provider>
  );
};

export default AppCustomInput;
