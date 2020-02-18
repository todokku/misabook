import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import AuthRoute from './auth/AuthRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Auth from './pages/Auth/Auth';

import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Route exact path='/auth' component={Auth}/>
          <AuthRoute>
          
          </AuthRoute>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
