import React, { useState } from 'react';

import Login from './components/Login';
import Register from './components/Register';

import './Auth.css';

const Auth = () => {
    const background = 'https://res.cloudinary.com/dumfvnj9f/image/upload/q_66/v1582020322/bookstore/background_jc5hqx.png';

    const [register, setRegister] = useState(false);

    const swithAuth = () => {
        setRegister(!register);
    }

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

export default Auth;