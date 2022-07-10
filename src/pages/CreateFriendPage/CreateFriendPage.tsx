import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import './CreateFriendPage.css';
import { GroupContext } from '../../context/GroupContext';
import { useNavigate, useParams } from 'react-router-dom';
import AppCustomInput from '../../components/AppCustomInput/AppCustomInput';
import AppCustomButton from '../../components/AppCustomButton/AppCustomButton';
import addSvg from '../../assets/add-svgrepo-com.svg';
import backSvg from '../../assets/back-svgrepo-com.svg';
import { InsideGroupPageParams } from '../InsideGroupPage/InsideGroupPage';
import AppCustomSelect, {
  AppSelectOption,
} from '../../components/AppCustomSelect/AppCustomSelect';
import apiRequestService from '../../service/api-request-service';
import { CreateMemberBody } from '../../types/api_send/CreateMemberBody';
import handleInputValue from '../../utils/handleInputValue';

export function CreateFriendPage() {
  const { groupName } = useParams<InsideGroupPageParams>();
  const { currentGroup, loadGroup, reloadGroup } = useContext(GroupContext);
  const navigate = useNavigate();

  const [friendName, setFriendName] = useState<string>('');

  const canAddFriend = !!friendName;

  const setDefaultState = () => {
    setFriendName('');
  };

  const createMemberBody: CreateMemberBody = {
    name: friendName,
  };

  useEffect(() => setDefaultState(), [currentGroup]);

  if (!currentGroup) {
    loadGroup(groupName!!)
      .then((_) => {})
      .catch((err) => navigate('/'));
    return null;
  }

  const handleMemberAddClick = async () => {
    await apiRequestService.createMember(groupName!!, createMemberBody);

    await reloadGroup();

    handleGoBackClick();
  };

  const handleGoBackClick = () => navigate(`/${groupName}`);

  return (
    <div className="CreateFriendPage">
      <div className="CreateFriendPage__container">
        <div className="CreateFriendPage__content">
          <section className="CreateFriendPage__register-expense-container">
            <div className="CreateFriendPage__section-heading">
              <h1 className="CreateFriendPage__section-title">Añadir amigo</h1>
            </div>
            <div className="CreateFriendPage__section-body">
              <div className="CreateFriendPage__field-wrapper">
                <p>Nombre</p>
                <AppCustomInput
                  type="text"
                  value={friendName || ''}
                  onChange={handleInputValue(setFriendName)}
                />
              </div>
            </div>
          </section>
        </div>
        <div className="CreateFriendPage__actions">
          <AppCustomButton
            onClick={handleGoBackClick}
            className="AppCustomButton AppCustomButton--lg"
          >
            <img
              src={backSvg}
              alt="Icon indicating the button to exit out of this page"
              height="20px"
              width="20px"
            />
            Volver atrás
          </AppCustomButton>

          <AppCustomButton
            onClick={handleMemberAddClick}
            className="AppCustomButton AppCustomButton--lg"
            disabled={!canAddFriend}
          >
            <img
              src={addSvg}
              alt="Icon indicating the button to add the friend"
              height="20px"
              width="20px"
            />
            Añadir
          </AppCustomButton>
        </div>
      </div>
    </div>
  );
}

export default CreateFriendPage;
