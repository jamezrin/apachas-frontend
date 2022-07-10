import './AppCustomSelect.css';
import {
  DetailedHTMLProps,
  OptionHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';

type CustomAppCustomSelectProps = {};

type AppCustomSelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  CustomAppCustomSelectProps;

export const AppCustomSelect = ({ ...restProps }: AppCustomSelectProps) => {
  return <select className="AppCustomSelect" {...restProps} />;
};

type CustomAppCustomSelectOptionProps = {};

type AppCustomSelectOptionProps = DetailedHTMLProps<
  OptionHTMLAttributes<HTMLOptionElement>,
  HTMLOptionElement
> &
  CustomAppCustomSelectOptionProps;

export const AppSelectOption = (props: AppCustomSelectOptionProps) => (
  <option className="AppCustomSelect__option" {...props} />
);

export default AppCustomSelect;
