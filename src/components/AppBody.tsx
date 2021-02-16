import './AppBody.css'
import MainView from './MainView'
import SideBar from './SideBar'
import { observer } from 'mobx-react-lite'

const AppBody = observer(() => {
  return (
    <div className="AppBody">
      <SideBar />
      <MainView />
    </div>
  );
})  

export default AppBody;


