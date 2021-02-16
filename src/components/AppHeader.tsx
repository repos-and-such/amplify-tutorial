import './AppHeader.css'
import { observer } from 'mobx-react-lite'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import * as Constants from '../Constants'
import { useRootStore } from './RootStateContext'
import googleUtil from '../utils/GoogleUtil'

const AppHeader = observer(() => {
  const { rootStore: { userStore } } = useRootStore();
  
  const logout: Function = (): void => {
    console.log('Logging out')
    userStore.mapStoreValuesFromObject({});
    userStore.setSignedIn(false);
  }

  return (
    <div>
      {userStore.isSignedInWithGoogle 
        ? 
        <div className="AppHeader">
          <span style={{paddingRight: 20}}>
            {`${Constants.GREETING + userStore.fullName}`}
          </span>
          <GoogleLogout
            className="GoogleBtn"
            clientId={Constants.GOOGLE_FIT.clientId}
            buttonText="Logout"
            onLogoutSuccess={():void => logout()}
          >
          </GoogleLogout>
        </div>
        : 
        <div className="AppHeader">
          <span>Welcome, please log in</span>
          <GoogleLogin
            className="GoogleBtn"
            clientId={Constants.GOOGLE_FIT.clientId}
            buttonText="Login with Google"
            onSuccess={(response): void => googleUtil.handleLoginSuccess(response, userStore)}
            onFailure={(details):void => googleUtil.handleFailure(details)}
            cookiePolicy={"single_host_origin"}
            scope={Constants.GOOGLE_FIT.scope}
            isSignedIn={true}
          />
        </div>}
    </div>
  )
})

export default AppHeader
