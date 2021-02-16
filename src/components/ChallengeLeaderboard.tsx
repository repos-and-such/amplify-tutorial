import { observer} from 'mobx-react-lite'
import './ChallengeLeaderboard.css'
import { ChallengeLeaderboardProps } from '../Types';

const ChallengeLeaderboard = observer(({ userStats }: ChallengeLeaderboardProps) => {

  return (
    <div className="ChallengeLeaderboard">
      {(Array.isArray(userStats) && userStats.length > 0) && userStats.map(userStat => (
        <div key={userStat.fullName}>
          <span style={{ marginRight: 24}}>{userStat.fullName}</span>
          <span >{userStat.totalAmount}</span>
        </div>
      ))}
    </div>
  )
})

export default ChallengeLeaderboard