import { UserStat, ChallengeUserStat,Challenge } from '../Types';
import { makeAutoObservable } from 'mobx'
import api from '../api/Api'
import * as Constants from '../Constants'
import UserStore from './UserStore'
import RootStore from './RootStore'

class ChallengeStore {
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    const { userStore } = rootStore; 
    this.userStore = userStore;
    makeAutoObservable(this)
  }

  rootStore: RootStore;

  userStore: UserStore;

  challenges: Array<Challenge> = [];

  newChallenge: Challenge = Constants.EMPTY_CHALLENGE;
  
  setChallenges: Function = (challenges: Array<Challenge>): void => {
    this.challenges = challenges;
  }

  mapChallengesFromStats: Function = (stats: Array<ChallengeUserStat>): void => {
    this.challenges = [];
    stats.forEach(stat => {
      const { userFullName, totalAmount, userEmail, userIsAdmin }: ChallengeUserStat = stat;
      const userStat: UserStat = { fullName: userFullName, totalAmount };

      const existingChallenge: Challenge | undefined = this.challenges.find((challenge: Challenge) => challenge.id === stat.challengeId);
      if (existingChallenge !== undefined) {
        if (userIsAdmin) {
          existingChallenge.admins = [userEmail, ...existingChallenge.admins];
        }
        const statExists: boolean = existingChallenge.userStats.some((stat: UserStat) => stat.fullName === userStat.fullName);
        if (statExists) {
          existingChallenge.userStats = [{...userStat}];
        } else {
          existingChallenge.userStats = [{...userStat}, ...existingChallenge.userStats];
        }
      } else {
        const { challengeId, challengeName, link, startDate, endDate, type, active }: ChallengeUserStat = stat;
        const challengeToAdd: Challenge = {
          id: challengeId,
          name: challengeName,
          link,
          startDate,
          endDate,
          type,
          active,
          userStats: [userStat],
          admins: userIsAdmin ? [ userEmail ] : []
        }
        this.challenges = [{...challengeToAdd}, ...this.challenges];
      }
    })
  }

  fetchChallengeStatsForUser: Function = async (userId: number):  Promise<void> => {
    console.log('Fetching users stats for challenge id: ', userId);
    const response: Array<any> = await api.fetchChallengeStatsForUser(userId);
    if (!Array.isArray(response)) {
      console.error('Fetched data not valid: ', response);
      return;
    }

    response.forEach(stat => {
      stat.startDate = stat.startDate === null ? null : new Date(stat.startDate);
      stat.endDate = stat.endDate === null ? null : new Date(stat.endDate);
    });

    this.mapChallengesFromStats(response);    
  }

  setNewChallengeName: Function = (name: string): void => {
    this.newChallenge.name = name;
  }

  setNewChallengeType: Function = (type: string): void => {
    if (!type) return;
    this.newChallenge.type = type;
  }

  setNewChallengeStart: Function = (startDate: Date): void => {
    this.newChallenge.startDate = startDate;
  }

  setNewChallengeEnd: Function = (endDate: Date): void => {
    this.newChallenge.endDate = endDate;
  }

  clearNewChallenge: Function = ():void => {
    this.newChallenge = Constants.EMPTY_CHALLENGE;
  }

  createChallenge: Function = async (creatorEmail: string): Promise<void> => {
    const validationErrors: Array<string> = this._validateInput();
    if (validationErrors.length > 0) {
      alert('Entered data is invalid:\n' + validationErrors.join('\n'));
      return;
    }

    this.newChallenge.active = true;
    this.newChallenge.admins = [creatorEmail];
    this.newChallenge.link = `${Constants.API_PATH}/join/challenge=${this.newChallenge.name}`

    const response = await api.insertChallenge(this.newChallenge);
    if (response !== undefined) {
      alert('Great success!'); 
      this.userStore.setOpenedAppSection(Constants.SIDEBAR_BUTTON.myChallenges);
      console.log('' + this.userStore.openedAppSection);

    } else {
      alert('oh no, something went wrong')

    } 
  }

  deleteChallenge: Function = async (challengeId: number): Promise<void> => {
    console.log('Deleting challenge', challengeId);
    const response = await api.deleteChallenge(challengeId);
    if (response !== undefined) {
      alert('Challenge deleted');
      this.challenges.forEach((challenge, index) => {
        if (challenge.id === challengeId) {
          this.challenges.splice(index, 1);
        }
      })
    } else {
      alert('oh no, something went wrong')
    } 
  }

  _validateInput: Function = (): Array<string> => {
    const errors: Array<string> = [];
    const { name, type, startDate, endDate } = this.newChallenge;
    const todayUtcMidnight: number = new Date().setUTCHours(0,0,0,0);
    const startUtcMidnight: number | null = startDate ? startDate.setUTCHours(0,0,0,0) : null;
    const endUtcMidnight: number | null = endDate ? endDate.setUTCHours(0,0,0,0) : null;
    
    if (!name) {
      errors.push('Name is required');
    } else if (name.length < 2) {
      errors.push('Name has to contain at least 3 characters');
    } else if (name.length > 25) {
      errors.push('Name can contain maximum of 25 characters');
    }
    
    if (!type) {
      errors.push('Type is required');
    }

    if (!!startUtcMidnight && startUtcMidnight < todayUtcMidnight) {
      errors.push('Start date cannot be earlier than Today');
    }

    if (!!endUtcMidnight && endUtcMidnight < todayUtcMidnight) {
      errors.push('End date cannot be earlier than Today');
    }

    if (!!startUtcMidnight && !!endUtcMidnight && (startUtcMidnight > endUtcMidnight)) {
      errors.push('End date cannot be earlier than Start date');
    }

    return errors;
  }
}
 
export default ChallengeStore;