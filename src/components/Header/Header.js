import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import logo from '../../assets/logo.png';

import './Header.css';

const Header = (props) => {
    const [token, setToken] = useContext(AuthContext);

    const [showed, setShowed] = useState(false);

    const showMenu = () => {
        setShowed(!showed);
    };

    const closeMenu = () => {
        setShowed(false);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        props.history.push('/auth');
    }

    return (
        <div className='Header'>
            <div id='logo-wrapper'
                className={classnames('', {
                    'logo-wrapper-logged-out': token === ''
                })}
            >
                <Link to='/'>
                    <img id='logo-image' src={logo} alt="logo"/>
                </Link>
            </div>
            {token !== '' &&
                <ul id='nav-links'
                    className={classnames('', {
                        'nav-links-showed': showed
                    })}
                >
                    <li className='nav-link'>
                        <Link to='/' onClick={closeMenu}>Home</Link>
                    </li>
                    <li className='nav-link'>
                        <Link to='/books' onClick={closeMenu}>Books</Link>
                    </li>
                    <li className='nav-link'>
                        <Link to='/about' onClick={closeMenu}>About</Link>
                    </li>
                    <li className='nav-link'>
                        <Link to='/contact' onClick={closeMenu}>Contact</Link>
                    </li>
                </ul>
            }
            {token !== '' &&
                <div id='function-wrapper'>
                    <Link to='/cart'>
                        <i id='cart' className="material-icons">shopping_cart</i>
                    </Link>
                    <div>
                        <i id='user' className="material-icons"
                            onClick={logout}
                        >exit_to_app</i>
                    </div>
                    <div id='burger'
                        className={classnames('', {
                            'burger-clicked': showed
                        })}
                        onClick={showMenu}
                    >
                        <div id='line-1'></div>
                        <div id='line-2'></div>
                        <div id='line-3'></div>
                    </div>
                </div>
            }
        </div>
    );
}

export default withRouter(Header);