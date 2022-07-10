import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';

const handleInputValue = (
  setter: Dispatch<SetStateAction<any>>,
): ChangeEventHandler<any> => {
  return (e) => setter(e.target.value);
};

export default handleInputValue;
