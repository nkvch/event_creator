import React, { createContext, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import EventsList from './components/EventsList';
import Header from './components/Header';
import './types/index';
import Toast from './components/static/Toast';
import ToastContext from './context';

function App() {
  const [toast, setToast] = useState<string>('');

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast('');
      }, 3000);
    }
  }, [toast]);

  return (
    <ToastContext.Provider value={{ setToast }}>
      <div className="App">
        <Header />
        <main>
          <EventsList />
        </main>
        <Toast text={toast} />
      </div>
    </ToastContext.Provider>
  );
}

export default App;
