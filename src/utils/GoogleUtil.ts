import { GoogleUser, DatabaseUser } from '../Types';
import { GoogleLoginResponse } from 'react-google-login'
import UserStore from '../stores/UserStore'
import api from '../api/Api'
import * as Constants from '../Constants'

class GoogleUtil {
  handleLoginSuccess: Function = async (response: GoogleLoginResponse, userStore: UserStore): Promise<void> => {
    const googleUser: GoogleUser = response.profileObj;
    const databaseUser: DatabaseUser | null = await api.getUser(googleUser.email);
    
    if (databaseUser === null) {
      const newUser: DatabaseUser | null | undefined = await api.upsertUser(googleUser);
      if (newUser !== null) {
        console.log('Registed new user:', newUser);
        userStore.setSignedIn(response.isSignedIn());
        userStore.mapStoreValuesFromObject(newUser);
      }
    } else if (!!databaseUser) {
      console.log('Logging in user:', databaseUser);
      userStore.setSignedIn(response.isSignedIn());
      userStore.mapStoreValuesFromObject(databaseUser);
    }
  }

  handleGetCodeSuccess: Function = async (response: GoogleLoginResponse, userStore: UserStore): Promise<void> => {
    console.log(response);
    if (response.code) {
      const userResponse: DatabaseUser | undefined = await api.upsertUser({
        googleCode: response.code,
        dataSource: Constants.GOOGLE_FIT.code
      });

      if (userResponse !== undefined) {
        userStore.setDataSource(userResponse.dataSource);        
      }
    }
  }
    
  handleFailure: Function = (error: any): void => {
    // needs error popups
    console.error(error);
    alert('Please allow third party cookies to use Google Login');
  }
}

export default new GoogleUtil()