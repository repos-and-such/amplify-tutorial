
import { useEffect } from 'react'
import { useRootStore } from './RootStateContext';
import './CreateChallenge.css'
import { observer } from 'mobx-react-lite'
import InputField from './InputField'
import Dropdown from 'react-dropdown'
import * as Constants from '../Constants'
import DurationPicker from './DurationPicker'
import ConfirmButton from './ConfirmButton'
import NewChallengePreview from './NewChallengePreview'

const CreateChallenge = observer(() => {
  const { rootStore: { challengeStore } } = useRootStore();
  const challengeTypeOptions = [Constants.CHALLENGE_TYPE.steps, Constants.CHALLENGE_TYPE.calories];
  
  useEffect(() => {
    challengeStore.clearNewChallenge();
  }, [challengeStore]);



  return (
    <div className="CreateChallenge">
      <h1>Create new challenge</h1>
      <p className="SmallText">Challenge name</p>
      <InputField
        placeHolder={'Challenge name'}
        value={challengeStore.newChallenge.name}
        updateFunc={(name: string): void => challengeStore.setNewChallengeName(name)}
      />
      <p className="SmallText">Challenge type</p>
      <span style={{maxWidth: 300}}>
        <Dropdown 
          options={challengeTypeOptions}
          onChange={(e): void => challengeStore.setNewChallengeType(e.value)}
          placeholder="Select challenge type"
        />
      </span>
      <DurationPicker />
      <p style={{paddingTop: 12}}>Preview</p>
      <NewChallengePreview />
      <ConfirmButton  title={'Create challenge'} />
    </div>
  )
})  

export default CreateChallenge
