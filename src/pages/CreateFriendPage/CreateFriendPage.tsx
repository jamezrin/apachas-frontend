import {
  ChangeEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import './CreateFriendPage.css';

import enterIconSvg from '../../assets/enter-svgrepo-com.svg';
import createGroupSvg from '../../assets/create-group-svgrepo-com.svg';
import coffeeWithFriendsSvg from '../../assets/undraw_coffee_with_friends_3cbj.svg';
import { GroupContext } from '../../context/GroupContext';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../../types/api/ApiError';
import delay from '../../utils/delay';
import { ApiGroup } from '../../types/api/ApiGroup';
import AppTextInputAction from '../../components/AppTextInputAction/AppTextInputAction';
import AppTextInput from '../../components/AppTextInput/AppTextInput';

export function CreateFriendPage() {
  return (
    <div className="CreateFriendPage">
      <section className="CreateFriendPage__container">test</section>
    </div>
  );
}

export default CreateFriendPage;
