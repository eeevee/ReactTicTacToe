import React from 'react';
import StartScreen from './components/startScreen';
import WinnersTable from './components/winnersTable';
import './styles/tictactoe.css';
import reducer from './reducers/reducer';
import { createStore } from 'redux';

function App() {
	const store = createStore(reducer);
  return (
    <div className="App">
      <StartScreen />
	  <WinnersTable />
    </div>
  );
}


export default App;
