import React, { useState } from 'react';
import classnames from 'classnames';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './Login.css';

const Login = (props) => {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);

        axios.post('http://localhost:5000/auth/login', {
            email: email,
            password: password
        })
        .then(res => {
            if (!res.data.token) {
                if (res.data.message === `Email doesn't exist`)
                    setEmailError(true);
                else if (res.data.message === 'Invalid password')
                    setPasswordError(true);
            }
            else {
                localStorage.setItem('token', res.data.token);
                props.history.push('/');
            }
        });
    }

    return (
        <div className={classnames('Login', {
            'Login-hide': props.register
        })}>
            <form onSubmit={submit} >
                <h4>Welcome</h4>
                <div className='form-control'>
                    <label htmlFor="email-login">Email</label>
                    <input type="text" id='email-login' placeholder='email...' required onChange={updateEmail} />
                    <div className={classnames('error-login', {
                        'error-login-showed': emailError
                    })}>Email doesn't exist</div>
                </div>
                <div className='form-control'>
                    <label htmlFor="password-login">Password</label>
                    <input type="password" id='password-login' placeholder='password...' required onChange={updatePassword} />
                    <div className={classnames('error-login', {
                        'error-login-showed': passwordError
                    })}>Wrong password</div>
                </div>
                <button>Login</button>
                <p>Don't have any account? <span onClick={props.swithAuth}>Register</span></p>
            </form>
        </div>
    );
}

export default withRouter(Login);