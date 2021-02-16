import { DatabaseUser, UserStat, Challenge } from '../Types';
import axios, { AxiosResponse } from 'axios'
import * as Constants from '../Constants'

class Api {

  // runGet

  // runPost

  getUser: Function = async (email: string): Promise<DatabaseUser | null | undefined> => {
    try {
      const response: AxiosResponse = await axios.get(`${Constants.API_PATH}/user?email=${email}`);

      if (this._responseIsValid(response)) {
        return response.data.body;
      } else return undefined;
    } catch (error) {
      console.error('Error while fetching user data:', error);
      return undefined;
    }
  }

  upsertUser: Function = async (user: object): Promise<DatabaseUser | undefined> => {
    const userString: string = JSON.stringify(user);
    console.log('Updating user with data:', userString);
    
    try {
      const response: AxiosResponse = await axios({
        method: 'POST',
        url: `${Constants.API_PATH}/user/`,
        headers: {
          'content-type': 'text/plain'
        },
        data: {
          user: userString
        }
      });

      if (this._responseIsValid(response)) {
        return response.data.body;
      } else return undefined;
    } catch (error) {
      console.error('Error while fetching inserted/updated data:', error);
      return undefined;
    }
  }

  fetchChallengeStatsForUser: Function = async (userId: number): Promise<Array<UserStat> | undefined> => {
    try {
      const response: AxiosResponse = await axios.get(`${Constants.API_PATH}/challenge?userId=${userId}`);
      
      if (this._responseIsValid(response)) {
        return response.data.body;
      } else return undefined;      
    } catch (error) {
      console.error('Error while fetching challenge stats data:', error);
      return [];
    }
  }

  insertChallenge: Function = async (challenge: Challenge): Promise<any> => {
    try {
      const response: AxiosResponse = await axios({
        method: 'POST',
        url: `${Constants.API_PATH}/challenge`,
        headers: {
          'content-type': 'text/plain'
        },
        data: {
          challenge
        }
      });

      if (this._responseIsValid(response)) {
        return response.data.body;
      } else return undefined;   
    } catch (error) {
      console.error('Error while inserting new challenge:', error);
      return undefined;
    }
  }

  deleteChallenge: Function = async (challengeId: number): Promise<any> => {
    try {
      const response: AxiosResponse = await axios({
        method: 'DELETE',
        url: `${Constants.API_PATH}/challenge?id=${challengeId}`,
        headers: {
          'content-type': 'text/plain'
        }
      });

      if (this._responseIsValid(response)) {
        return response.data.body;
      } else return undefined;
    } catch (error) {
      console.error('Error while fetching inserted/updated data:', error);
      return undefined;
    }
  }

  _responseIsValid: Function = (response: AxiosResponse): boolean => {
    if (response.data.body && !response.data.errorMessage) return true;
    else {
      console.error('Internal server error:', response.data.errorMessage);
      return false;
    }
  }
}

export default new Api()