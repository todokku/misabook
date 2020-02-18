import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../pages/Home/Home';

import './Main.css';

const Main = () => {
    return (
        <div className='Main'>
            <Route exact path='/' component={Home}/>
        </div>
    );
}

export default Main;