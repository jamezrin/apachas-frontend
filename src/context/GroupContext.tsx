import React, { useState } from 'react';
import { ApiGroup } from '../types/api/ApiGroup';
import apiService from '../service/api-service';
import createGroupPage from '../pages/CreateGroupPage/CreateGroupPage';

export type GroupContextState = {
  currentGroup?: ApiGroup;
  loadGroup: (name: string) => Promise<ApiGroup>;
  createNewGroup: () => Promise<ApiGroup>;
  reloadGroup: () => Promise<ApiGroup>;
};

const notReadyStub = () => {
  throw new Error('Not ready');
};

export const GroupContext = React.createContext<GroupContextState>({
  currentGroup: undefined,
  loadGroup: (name) => notReadyStub(),
  createNewGroup: () => notReadyStub(),
  reloadGroup: () => notReadyStub(),
});

export const GroupContextProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const [currentGroup, setCurrentGroup] = useState<ApiGroup>();

  const loadGroup = async (name: string): Promise<ApiGroup> => {
    const group = await apiService.fetchGroupByName(name);

    if (group) {
      setCurrentGroup(group);
    }

    return group;
  };

  const reloadGroup = async (): Promise<ApiGroup> => {
    if (!currentGroup)
      throw new Error('Cannot reload group with no group loaded');

    return await apiService.fetchGroupByName(currentGroup.name);
  };

  const createNewGroup = async (): Promise<ApiGroup> => {
    const group = await apiService.createNewGroup();

    if (group) {
      setCurrentGroup(group);
    }

    return group;
  };

  return (
    <GroupContext.Provider
      value={{ currentGroup, loadGroup, createNewGroup, reloadGroup }}
    >
      {children}
    </GroupContext.Provider>
  );
};
