import { observer } from 'mobx-react-lite'
import { ChallengeProps } from '../Types'
import './ChallengeHeader.css'
import { useRootStore } from './RootStateContext'
import { MdDeleteForever } from 'react-icons/md';

const ChallengeHeader = observer(({challenge}: ChallengeProps) => {
  const { rootStore: { userStore, challengeStore } } = useRootStore();
  const { name, admins  } = challenge;

  return (
    <div className="ChallengeHeader">
        <h1 className="ChallengeH1">{name}</h1>
        {admins.some(admin => admin === userStore.email) 
          && 
        <button className="IconButton" onClick={() => challengeStore.deleteChallenge(challenge.id)}><MdDeleteForever size="26"/></button>}
    </div>
  )
})

export default ChallengeHeader
