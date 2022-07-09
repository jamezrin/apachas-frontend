import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GroupContext } from '../../context/GroupContext';
import AppWrapper from '../../components/AppWrapper/AppWrapper';

type Params = {
  groupName: string;
};

export function InsideGroupPage() {
  const { groupName } = useParams<Params>();

  const { currentGroup, loadGroup } = useContext(GroupContext);

  if (!currentGroup) loadGroup(groupName!!);

  return <h1>InsideGroupPage {groupName}</h1>;
}

export default InsideGroupPage;
