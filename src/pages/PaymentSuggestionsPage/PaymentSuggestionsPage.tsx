import {
  ChangeEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import './PaymentSuggestionsPage.css';

import enterIconSvg from '../../assets/enter-svgrepo-com.svg';
import createGroupSvg from '../../assets/create-group-svgrepo-com.svg';
import coffeeWithFriendsSvg from '../../assets/undraw_coffee_with_friends_3cbj.svg';
import { GroupContext } from '../../context/GroupContext';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../../types/api_receive/ApiError';
import delay from '../../utils/delay';
import { ApiGroup } from '../../types/api_receive/ApiGroup';
import AppCustomInputAction from '../../components/AppCustomInputAction/AppCustomInputAction';
import AppCustomInput from '../../components/AppCustomInput/AppCustomInput';

export function PaymentSuggestionsPage() {
  return (
    <div className="PaymentSuggestionsPage">
      <section className="PaymentSuggestionsPage__container"></section>
    </div>
  );
}

export default PaymentSuggestionsPage;
