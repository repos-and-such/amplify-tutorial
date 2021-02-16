import { observer } from 'mobx-react-lite' // 6.x or mobx-react-lite@1.4.0
import AppBody from './components/AppBody'
import AppHeader from './components/AppHeader'
import { useRootStore } from './components/RootStateContext';

const App = observer(() => {
  const { rootStore: { userStore } } = useRootStore();
  return (
    <>
    <AppHeader />

    {userStore.isSignedInWithGoogle
    ? 
    <AppBody />
    :
    <p style={{padding: 20}}>Please log in to access all the awesome features</p>
    }
    </>
  )
});


export default App;