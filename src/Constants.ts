import { GoogleFitSettings, Challenge, SidebarButtons } from './Types'

// Api path
export const API_PATH: string = 'https://6tho43zpr2.execute-api.eu-north-1.amazonaws.com/test'

// Sidebar
export const SIDEBAR_BUTTON: SidebarButtons = {
  myChallenges: 'My Challenges',
  createChallenge: 'Create Challenge',
  settings: 'Settings'
}

// Texts
export const GREETING: string = 'Welcome, '

// Data sources
export const GOOGLE_FIT: GoogleFitSettings = {
  code: 'google_fit',
  name: 'Google Fit',
  clientId: "511214198578-7vv5cpjef5sa0dipa606qbuugs00sj4b.apps.googleusercontent.com",
  scope: 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
}

// Challenge
export const EMPTY_CHALLENGE: Challenge = {
  id: null,
  name: '',
  link: '',
  startDate: null,
  endDate: null,
  type: '',
  active: false,
  userStats: [],
  admins: []
}

export const CHALLENGE_TYPE = {
  steps: 'steps',
  calories: 'calories'
}
