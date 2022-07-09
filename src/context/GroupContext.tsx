import React, { useState } from 'react';
import { Group } from '../types/Group';
import { fetchGroupByName } from '../service/api-service';

export type GroupContextState = {
  currentGroup?: Group;
  loadGroup: (name: string) => void;
};

export const GroupContext = React.createContext<GroupContextState>({
  currentGroup: undefined,
  loadGroup: (name) => {},
});

export const GroupContextProvider: React.FC<React.PropsWithChildren<any>> = ({
  children,
}) => {
  const [currentGroup, setCurrentGroup] = useState<Group>();

  const loadGroup = async (name: string) => {
    console.log('load group');
    const group = await fetchGroupByName(name);
    setCurrentGroup(group);
  };

  return (
    <GroupContext.Provider value={{ currentGroup, loadGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
