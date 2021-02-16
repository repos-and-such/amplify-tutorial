import { useEffect } from 'react'
import { useRootStore } from './RootStateContext';
import './ChallengesView.css'
import { observer } from 'mobx-react-lite'
import Challenge from './Challenge'

const ChallengesView = observer(() => {
  const { rootStore: { challengeStore, userStore } } = useRootStore();
  const { id: userId } = userStore;
  const { challenges } = challengeStore;
  
  useEffect(() => {
    userId && challengeStore.fetchChallengeStatsForUser(userStore.id);
  }, [challengeStore, userId, userStore.id]);

  return (
    <div className="ChallengesView">
      {Array.isArray(challenges) && challenges.map(challenge => (
        <Challenge key={challenge.id} challenge={challenge} />
      ))}
    </div>
  )
})

export default ChallengesView
