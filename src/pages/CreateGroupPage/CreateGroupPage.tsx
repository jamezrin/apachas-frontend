import {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useState,
} from 'react';

import './CreateGroupPage.css';

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

const groupNameRegex = /^[a-z]+-[a-z]+-\w{5}$/;

export function CreateGroupPage() {
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

  const goToGroup = (group: ApiGroup) => {
    setErrorMessage(undefined);
    setGroupInputDisabled(true);
    setGroupName(group.name);

    // artificial delay, because looks cooler
    delay(600).then(() => {
      navigate(`/${group.name}`);
    });
  };

  const handleJoinGroupButton = () => {
    if (!groupName || !groupNameRegex.test(groupName)) {
      setErrorMessage('Debes introducir el nombre de un grupo válido');
      return;
    }

    loadGroup(groupName)
      .then((group) => {
        goToGroup(group);
      })
      .catch((response) => {
        if (response.data.type === 'GROUP_NOT_FOUND') {
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
    <div className="CreateGroupPage">
      <div className="CreateGroupPage__container">
        <section className="CreateGroupPage__heading">
          <h1 className="CreateGroupPage__title">¡A pachas!</h1>
          <img
            src={coffeeWithFriendsSvg}
            alt="Some friends drinking coffee"
            className="CreateGroupPage__image"
          />
          <h2 className="CreateGroupPage__subtitle">
            Olvídate de calcular los gastos de tu grupo de amigos.
            <br />
            ¡Esta aplicación lo hace por ti!
          </h2>
        </section>
        <section className="CreateGroupPage__actions">
          <h3 className="CreateGroupPage__actions__cta">
            Introduce el código del grupo. Si no tienes uno, genera uno nuevo
          </h3>
          <AppCustomInput
            value={groupName || ''}
            onClick={handleGroupInputTouch}
            onChange={handleGroupNameChange}
            onPressEnter={handleJoinGroupButton}
            size={10}
            disabled={groupInputDisabled}
            placeholder="Introduce el id del grupo"
          >
            <AppCustomInputAction onClick={handleJoinGroupButton}>
              <img
                src={enterIconSvg}
                alt="Enter specified group button"
                height="24px"
                width="24px"
              />
            </AppCustomInputAction>
            <AppCustomInputAction onClick={handleCreateGroupButton}>
              <img
                src={createGroupSvg}
                alt="Create new group button"
                height="24px"
                width="24px"
              />
            </AppCustomInputAction>
          </AppCustomInput>
          {errorMessage && (
            <p className="CreateGroupPage__actions__error">{errorMessage}</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default CreateGroupPage;
