import './SettingsView.css'
import { observer } from 'mobx-react-lite'
import { GoogleLogin } from 'react-google-login'
import * as Constants from '../Constants'
import { useRootStore } from './RootStateContext'
import googleUtil from '../utils/GoogleUtil'

const SettingsView = observer(() => {
  const { rootStore: {userStore, userStore: { dataSource } } } = useRootStore();

  return (
    <div className="SettingsView">
      <p>Selected input device: <b>{userStore.getDataSourceNameByCode(dataSource)}</b></p>
      <p>Select different device:</p>
      
      <GoogleLogin 
        clientId={Constants.GOOGLE_FIT.clientId}
        buttonText="Google Fit"
        onSuccess={(response): void => googleUtil.handleGetCodeSuccess(response, userStore)}
        onFailure={(details): void => googleUtil.handleFailure(details)}
        cookiePolicy={"single_host_origin"}
        scope={Constants.GOOGLE_FIT.scope}
        prompt={'consent'}
        responseType='code'
        disabled={userStore.dataSource === Constants.GOOGLE_FIT.code}
      />
    </div>
  )
})

export default SettingsView
