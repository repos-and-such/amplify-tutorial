import UserStore from './UserStore'
import ChallengeStore from './ChallengeStore'


class RootStore {
  constructor() {
      this.userStore = new UserStore(this)
      this.challengeStore = new ChallengeStore(this)
  }
  userStore: UserStore;
  challengeStore: ChallengeStore;
}

export default RootStore