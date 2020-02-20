import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import AuthRoute from './auth/AuthRoute';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Auth from './pages/Auth/Auth';
import Main from './components/Main/Main';

import './App.css';

axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <CartProvider>
            <Header />
            <Switch>
              <Route exact path='/auth' component={Auth}/>
              <AuthRoute path='/'>
                <Main />
              </AuthRoute>
            </Switch>
            <Footer />
          </CartProvider>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
