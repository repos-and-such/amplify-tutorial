export interface DatabaseUser {
  id: number | null,
  fullName: string,
  email: string,
  googleId?: string,
  facebookId?: string,
  authToken?: string,
  googleFitToken?: string,
  appleToken?: string,
  garminToken?: string,
  createdAt: string,
  lastModified?: string,
  dataSource?: string
}

export interface GoogleUser {
  email: string,
  familyName?: string,
  givenName?: string, 
  googleId: string,
  imageUrl: string,
  name?: string  
}

export interface GoogleFitSettings {
  code: string,
  name: string,
  clientId: string,
  scope: string
}

export interface Challenge {
  id: number | null,
  name: string,
  link: string,
  startDate: Date | null,
  endDate: Date | null,
  type: string,
  active: boolean,
  userStats: Array<UserStat>
  admins: Array<string>
}

export interface UserStat {
  fullName: string,
  totalAmount: number 
}

export interface ChallengeUserStat {
  challengeId: number,
  userFullName: string,
  userEmail: string,
  challengeName: string,
  link: string,
  startDate: Date | null,
  endDate: Date | null,
  type: string,
  active: boolean,
  totalAmount: number,
  userIsAdmin: boolean
}

export interface SidebarButtons {
  myChallenges: string,
  createChallenge: string,
  settings: string
}

// Component Props
export interface ChallengeProps {
  challenge: Challenge
}

export interface ChallengeLeaderboardProps {
  userStats: Array<UserStat>
}

export interface InputFieldProps {
  placeHolder: string,
  updateFunc: Function,
  value: string
}