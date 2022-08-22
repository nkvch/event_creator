import React from 'react';
import logo from './logo.svg';
import './App.css';
import EventsList from './components/EventsList';
import Header from './components/Header';
import './types/index';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Header />
      <main>
        <EventsList />
      </main>
    </div>
  );
}

export default App;
