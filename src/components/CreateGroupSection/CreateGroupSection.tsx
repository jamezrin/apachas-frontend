import './CreateGroupSection.css';
import {
  ChangeEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import AppTextInput from '../AppTextInput/AppTextInput';
import AppButton from '../AppButton/AppButton';
import AppTextInputAction from '../AppTextInputAction/AppTextInputAction';

import enterIconSvg from '../../assets/enter-svgrepo-com.svg';
import userAddIconSvg from '../../assets/user-add-svgrepo-com.svg';
import coffeeWithFriendsSvg from '../../assets/undraw_coffee_with_friends_3cbj.svg';
import { GroupContext } from '../../context/GroupContext';
import { useNavigate } from 'react-router-dom';
import { ApiError } from '../../types/ApiError';
import delay from '../../utils/delay';
import { Group } from '../../types/Group';

export function CreateGroupSection() {
  const [groupName, setGroupName] = useState<string | undefined>(undefined);
  const [groupInputDisabled, setGroupInputDisabled] = useState<boolean>(false);
  const { currentGroup, loadGroup, createNewGroup } = useContext(GroupContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
  const navigate = useNavigate();

  const handleGroupNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setGroupName(e.target.value);
    setErrorMessage(undefined);
  };

  const handleGroupInputTouch: MouseEventHandler<HTMLInputElement> = (e) => {
    setErrorMessage(undefined);
  };

  const goToGroup = (group: Group) => {
    setErrorMessage(undefined);
    setGroupInputDisabled(true);
    setGroupName(group.name);

    // artificial delay, because looks cooler
    delay(1000).then(() => {
      navigate(`/${group.name}`);
    });
  };

  const handleJoinGroupButton = () => {
    if (!groupName || groupName.length < 8) {
      setErrorMessage('Debes introducir el nombre de un grupo válido');
      return;
    }

    loadGroup(groupName)
      .then((group) => {
        goToGroup(group);
      })
      .catch((err: ApiError) => {
        if (err?.type === 'GROUP_NOT_FOUND') {
          setErrorMessage('No se ha podido encontrar un grupo con ese id');
        } else {
          setErrorMessage('Ha ocurrido un error desconocido, prueba más tarde');
        }
      });
  };

  const handleCreateGroupButton = () => {
    createNewGroup()
      .then((group) => {
        goToGroup(group);
      })
      .catch((err: ApiError) => {
        setErrorMessage('Ha ocurrido un error desconocido, prueba más tarde');
      });
  };

  return (
    <section className="CreateGroupSection">
      <div className="CreateGroupSection__wrapper">
        <div className="CreateGroupSection__heading">
          <h1 className="CreateGroupSection__title">¡A pachas!</h1>
          <img
            src={coffeeWithFriendsSvg}
            alt="Some friends drinking coffee"
            className="CreateGroupSection__image"
          />
          <h2 className="CreateGroupSection__subtitle">
            Olvídate de calcular los gastos de tu grupo de amigos.
            <br />
            ¡Esta aplicación lo hace por ti!
          </h2>
        </div>
        <div className="CreateGroupSection__actions">
          <h3 className="CreateGroupSection__actions__cta">
            Introduce el código del grupo. Si no tienes uno, genera uno nuevo
          </h3>
          <AppTextInput
            value={groupName || ''}
            onClick={handleGroupInputTouch}
            onChange={handleGroupNameChange}
            disabled={groupInputDisabled}
            placeholder="Introduce el id del grupo"
          >
            <AppTextInputAction onClick={handleJoinGroupButton}>
              <img src={enterIconSvg} alt="Enter specified group button" />
            </AppTextInputAction>
            <AppTextInputAction onClick={handleCreateGroupButton}>
              <img src={userAddIconSvg} alt="Create new group button" />
            </AppTextInputAction>
          </AppTextInput>
          {errorMessage && (
            <p className="CreateGroupSection__actions__error">{errorMessage}</p>
          )}
        </div>
      </div>
    </section>
  );
}
