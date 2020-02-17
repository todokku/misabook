import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import logo from '../../assets/logo.png';

import './Header.css';

const Header = () => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);

    const [showed, setShowed] = useState(false);

    const showMenu = () => {
        setShowed(!showed);
    };

    const closeMenu = () => {
        setShowed(false);
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
                        <Link to='/products' onClick={closeMenu}>Products</Link>
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
                        <i id='user' className="material-icons">exit_to_app</i>
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

export default Header;