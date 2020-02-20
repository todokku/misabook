import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import Register from './components/Register';

import './Auth.css';

const Auth = () => {
    const background = 'https://res.cloudinary.com/dumfvnj9f/image/upload/q_66/v1582020322/bookstore/background_jc5hqx.png';

    const [isLogined, setIsLogined] = useState(undefined);
    const [register, setRegister] = useState(false);

    const swithAuth = () => {
        setRegister(!register);
    }

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            axios.post('/auth/user', {
                token: token
            })
            .then(res => {
                console.log(res)
                if (res.data.message === 'Successfully') {
                    setIsLogined(true);
                }
                else
                    setIsLogined(false);
            })
        }
	else {
            setIsLogined(false);
        }
    }, []);

    if (isLogined === undefined) {
        return (
            <div></div>
        )
    }

    if (isLogined) {
        return (
            <Redirect to='/'/>
        )
    }
    else if (!isLogined) {
        return (
            <div className='Auth'>
                <div id='cover' style={{ backgroundImage: `url(${background})`}}></div>
                <div id='content'>
                    <Login 
                        swithAuth={swithAuth}
                        register={register}
                    />
                    <Register 
                        swithAuth={swithAuth}
                        register={register}
                    />
                </div>
            </div>
        );
    }
}

export default Auth;
