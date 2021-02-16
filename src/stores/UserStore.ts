import { DatabaseUser } from '../Types';
import { makeAutoObservable } from 'mobx'
import * as Constants from '../Constants'
import RootStore from './RootStore'

class UserStore {
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this)
  }

  rootStore: RootStore;
  // challengeStore: ChallengeStore | undefined;

  id: number | null = null;
  fullName: string = '';
  email: string = '';
  googleId: string = '';
  facebookId: string = '';
  authToken: string = '';
  googleFitToken: string = '';
  appleToken: string = '';
  garminToken: string = '';
  createdAt: string = '';
  lastModified: string = '';
  dataSource: string = '';
  
  isSignedInWithGoogle: boolean = false;
  openedAppSection: string = Constants.SIDEBAR_BUTTON.myChallenges;

  mapStoreValuesFromObject: Function = (dbUser: DatabaseUser): void => {
    if (!dbUser) return;
    const { id, fullName, email, googleId, facebookId, authToken, dataSource, googleFitToken, appleToken, garminToken, lastModified, createdAt }: DatabaseUser = dbUser;
    
    this.id = id || null;
    this.fullName = fullName || '';
    this.email = email || '';
    this.googleId = googleId || '';
    this.facebookId = facebookId || '';
    this.authToken = authToken || '';
    this.googleFitToken = googleFitToken || '';
    this.appleToken = appleToken || '';
    this.garminToken = garminToken || '';
    this.createdAt = createdAt || '';
    this.lastModified = lastModified || '';
    this.dataSource = dataSource || '';
  }

  getDataSourceNameByCode: Function = (dataSourceCode: string): string => {
    switch (dataSourceCode) {
      case Constants.GOOGLE_FIT.code: {
        return Constants.GOOGLE_FIT.name;
      }
      default: return ' - ';
    } 
  }

  setSignedIn: Function = (state: boolean): void => {
    this.isSignedInWithGoogle = state;
  }

  setDataSource: Function = (dataSource: string): void => {
    this.dataSource = dataSource;
  }

  setOpenedAppSection: Function = (section: string): void => {
    this.openedAppSection = section;
  }
}

// export const UserStoreContext = createContext<UserStore>(new UserStore())
export default UserStore