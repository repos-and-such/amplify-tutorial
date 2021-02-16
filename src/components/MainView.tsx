import React from 'react'
import SettingsView from './SettingsView'
import ChallengesView from './ChallengesView'
import * as Constants from '../Constants'
import { useRootStore } from './RootStateContext'
import { observer } from 'mobx-react-lite'
import CreateChallenge from './CreateChallenge'

const MainView = observer(() => {
  const { rootStore: { userStore: { openedAppSection } } } = useRootStore();

  switch (openedAppSection) {
    case Constants.SIDEBAR_BUTTON.myChallenges: {
      return (<ChallengesView />);
    }
    case Constants.SIDEBAR_BUTTON.createChallenge: {
      return (<CreateChallenge />);
    }
    case Constants.SIDEBAR_BUTTON.settings: {
      return (<SettingsView />)
    }
  }
  return (<div>Oops...</div>);

})

export default MainView
