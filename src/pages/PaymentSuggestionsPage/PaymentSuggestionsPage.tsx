import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import './PaymentSuggestionsPage.css';
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

export function PaymentSuggestionsPage() {
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
    <div className="PaymentSuggestionsPage">
      <div className="PaymentSuggestionsPage__container">
        <div className="PaymentSuggestionsPage__content">
          <section className="PaymentSuggestionsPage__register-expense-container">
            <div className="PaymentSuggestionsPage__section-heading">
              <h1 className="PaymentSuggestionsPage__section-title">
                Añadir amigo
              </h1>
            </div>
            <div className="PaymentSuggestionsPage__section-body">
              <div className="PaymentSuggestionsPage__field-wrapper">
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
        <div className="PaymentSuggestionsPage__actions">
          <AppCustomButton
            onClick={handleGoBackClick}
            style={{
              fontSize: '18px',
              ...{
                '--app-button-height': '40px',
              },
            }}
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
            style={{
              fontSize: '18px',
              ...{
                '--app-button-height': '40px',
              },
            }}
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

export default PaymentSuggestionsPage;
