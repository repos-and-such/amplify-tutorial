import { observer } from 'mobx-react-lite'
import { ChallengeProps } from '../Types'
import ChallengeLeaderboard from './ChallengeLeaderboard'
import './Challenge.css'
import ChallengeHeader from './ChallengeHeader'

const Challenge = observer(({challenge}: ChallengeProps) => {
  const { startDate, endDate, userStats, admins  } = challenge;

  return (
    <div className="Challenge">
      <ChallengeHeader challenge={challenge}/>
      <h3 className="ChallengeH3">Admin: {admins[0]}</h3>
      <h3 className="ChallengeH3">
        Running from {startDate ? startDate.toDateString() : ' - '} to {endDate ? endDate.toDateString() : ' - '}
      </h3>
      <ChallengeLeaderboard userStats={userStats}/>
    </div>
  )
})

export default Challenge
