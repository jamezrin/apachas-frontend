import { useContext, useEffect } from 'react';
import { fetchGroupByName } from '../../service/api-service';
import { GroupContext } from '../../context/GroupContext';
import { useNavigate } from 'react-router-dom';
import delay from '../../utils/delay';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import './CreateGroupPage.css';
import { CreateGroupSection } from '../../components/CreateGroupSection/CreateGroupSection';

export function CreateGroupPage() {
  const { currentGroup, loadGroup } = useContext(GroupContext);
  const navigate = useNavigate();

  return (
    <div className="CreateGroupPage">
      <CreateGroupSection />
    </div>
  );
}

export default CreateGroupPage;
