import ReactDOM from 'react-dom';
import App from './App';
import { RootStateProvider } from './components/RootStateContext';
import './index.css'

ReactDOM.render(
  <RootStateProvider>
    <App />
  </RootStateProvider>,
  document.getElementById('root')
)
