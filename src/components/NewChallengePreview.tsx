import { useRootStore } from './RootStateContext';
import './NewChallengePreview.css'
import { observer } from 'mobx-react-lite'
import * as Constants from '../Constants'

const NewChallengePreview = observer(() => {
  const { rootStore: { challengeStore, userStore } } = useRootStore();
  const { newChallenge } = challengeStore;
  const { name, type, startDate, endDate } = newChallenge;

  return (
    <div className="NewChallengePreview">
      <p className="PreviewItem">Name: <b>{name}</b></p>
      <p className="PreviewItem">Type: <b>{type}</b></p>
      <p className="PreviewItem">Runs from <b>{startDate ? startDate.toDateString() : ' - '}</b> to <b>{endDate ? endDate.toDateString() : ' - '}</b></p>
      <p className="PreviewItem">Link: <b>{name && `${Constants.API_PATH}/join/challenge=${name}`}</b></p>
      <p className="PreviewItem">Admin: <b>{userStore.email}</b></p>

    </div>
  )
})  

export default NewChallengePreview
