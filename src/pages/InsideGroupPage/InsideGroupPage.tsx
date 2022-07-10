import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GroupContext } from '../../context/GroupContext';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import './InsideGroupPage.css';

type Params = {
  groupName: string;
};

export function InsideGroupPage() {
  const { groupName } = useParams<Params>();

  const { currentGroup, loadGroup, reloadGroup } = useContext(GroupContext);

  if (!currentGroup) loadGroup(groupName!!).then((_) => {});

  return (
    <div className="InsideGroupPage">
      <div className="InsideGroupPage__container"></div>
    </div>
  );
}

export default InsideGroupPage;
