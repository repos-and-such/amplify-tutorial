import { createContext, useContext } from 'react';
import React from 'react'
import RootStore from '../stores/RootStore'

export interface RootStateContextValue {
  rootStore: RootStore,
}

const RootStateContext = createContext<RootStateContextValue>({} as RootStateContextValue);

const rootStore = new RootStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  return (
    <RootStateContext.Provider value={{ rootStore }}>
      {children}
    </RootStateContext.Provider>
  );
}

export const useRootStore = () => useContext(RootStateContext);