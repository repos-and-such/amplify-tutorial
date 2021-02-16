import React from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, {API} from 'aws-amplify'
import { useEffect } from 'react'

function App() {
  const result = 'hello';
  useEffect(() => {
    getResp();
  }, [])

  const getResp = async () => {
    const result = await API.get('userApi', '/user/1', []);
    console.log(result)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Eeeeeeedit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
