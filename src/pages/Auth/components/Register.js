import React, { useState } from 'react';
import classnames from 'classnames';
import axios from 'axios';

import './Register.css';

const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailErrorExists, setEmailErrorExists] = useState(false);
    const [emailErrorInvalid, setEmailErrorInvalid] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rePasswordError, setRePasswordError] = useState(false);

    const nameRegex = /^.{3,}$/; // Minium 3 characters
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // eslint-disable-next-line
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number

    const updateName = (e) => {
        setName(e.target.value);
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const updateRePassword = (e) => {
        setRePassword(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();

        setNameError(false);
        setEmailErrorExists(false);
        setEmailErrorInvalid(false);
        setPasswordError(false);
        setRePasswordError(false);

        let errors = 0;

        if (!nameRegex.test(name)) {
            errors++;
            setNameError(true);
        }    
        if (!emailRegex.test(email)) {
            errors++;
            setEmailErrorInvalid(true);
        }
        if (!passwordRegex.test(password)) {
            errors++;
            setPasswordError(true);
        }
        else if (password !== rePassword) {
            setRePasswordError(true);
            errors++
        }

        if (errors === 0) {
            axios.post('http://localhost:5000/auth/register', {
                name: name,
                email: email,
                password: password
            })
            .then((res) => {
                if (res.data.message === 'Email already exists')
                    setEmailErrorExists(true);
                else if (res.data.user) {
                    props.swithAuth();
                    setName('');
                    setEmail('');
                    setPassword('');
                    setRePassword('');
                }
            })
        }
    }

    return (
        <div className={classnames('Register', {
            'Register-show': props.register
        })}>
            <form onSubmit={submit}>
                <h4>Register</h4>
                <div className='form-control'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' placeholder='name...' required
                        onChange={updateName}
                    />
                    <div className={classnames('error-register', {
                        'error-register-showed': nameError
                    })}>Name is invalid</div>
                </div>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' placeholder='email...' required
                        onChange={updateEmail}
                    />
                    <div className={classnames('error-register', {
                        'error-register-showed': emailErrorInvalid
                    })}>Email is invalid</div>
                    <div className={classnames('error-register', {
                        'error-register-showed': emailErrorExists
                    })}>Email already exists</div>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' placeholder='password...' required
                        onChange={updatePassword}
                    />
                    <div className={classnames('error-register', {
                        'error-register-showed': passwordError
                    })}>Password must be at least 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number</div>
                </div>
                <div className='form-control'>
                    <label htmlFor="re-password">Confirm password</label>
                    <input type="password" id='re-password' placeholder='confirm password...' required
                        onChange={updateRePassword}
                    />
                    <div className={classnames('error-register', {
                        'error-register-showed': rePasswordError
                    })}>The passwords don't match</div>
                </div>
                <button>Register</button>
                <p>Had an account? <span onClick={props.swithAuth}>Login</span></p>
            </form>
        </div>
    );
}

export default Register;