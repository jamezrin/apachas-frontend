import React, { useState } from 'react';
import apiService from '../service/api-request-service';
import createGroupPage from '../pages/CreateGroupPage/CreateGroupPage';
import { Group } from '../types/Group';

export type GroupContextState = {
  currentGroup?: Group;
  loadGroup: (name: string) => Promise<Group>;
  createNewGroup: () => Promise<Group>;
  reloadGroup: () => Promise<Group>;
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
  const [currentGroup, setCurrentGroup] = useState<Group>();

  const loadGroup = async (name: string): Promise<Group> => {
    const group = await apiService.fetchGroupByName(name);

    if (group) {
      setCurrentGroup(group);
    }

    return group;
  };

  const reloadGroup = async (): Promise<Group> => {
    if (!currentGroup)
      throw new Error('Cannot reload group with no group loaded');

    return await apiService.fetchGroupByName(currentGroup.name);
  };

  const createNewGroup = async (): Promise<Group> => {
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
