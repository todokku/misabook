import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Header from './components/Header/Header';

import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
