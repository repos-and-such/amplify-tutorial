import { useRootStore } from './RootStateContext';
import './DurationPicker.css'
import { observer } from 'mobx-react-lite'
import 'react-dropdown/style.css';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

const DurationPicker = observer(() => {
  const { rootStore: { challengeStore } } = useRootStore();

  return (
    <div className="DurationPicker">
      <p>Running from</p>
      <DayPickerInput 
        onDayChange={(startDate) => challengeStore.setNewChallengeStart(startDate)}
      />
      <p style={{paddingTop: 0}}>to</p>
      <DayPickerInput
        onDayChange={(endDate) => challengeStore.setNewChallengeEnd(endDate)}
        value={''}      
      />
    </div>
  )
})  

export default DurationPicker
