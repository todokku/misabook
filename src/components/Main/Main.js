import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Books from '../../pages/Books/Books';
import BookViewer from '../../pages/BookViewer/BookViewer';

import './Main.css';

const Main = () => {
    return (
        <div className='Main'>
            <Route exact path='/' component={Home} />
            <Route exact path='/books' component={Books} />
            <Route path='/books/:id' component={BookViewer} />
        </div>
    );
}

export default Main;