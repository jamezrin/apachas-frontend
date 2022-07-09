import { useContext, useEffect } from 'react';
import { GroupContext } from '../../context/GroupContext';
import { useNavigate } from 'react-router-dom';
import delay from '../../utils/delay';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import './CreateGroupPage.css';
import { CreateGroupSection } from '../../components/CreateGroupSection/CreateGroupSection';

export function CreateGroupPage() {
  return (
    <div className="CreateGroupPage">
      <CreateGroupSection />
    </div>
  );
}

export default CreateGroupPage;
