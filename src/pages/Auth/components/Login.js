import React from 'react';
import classnames from 'classnames';

import './Login.css';

const Login = (props) => {
    return (
        <div className={classnames('Login', {
            'Login-hide': props.register
        })}>
            <form>
                <h4>Welcome</h4>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' placeholder='email...' required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="text" id='pasword' placeholder='password...' required/>
                </div>
                <button>Login</button>
                <p>Don't have any account? <span onClick={props.swithAuth}>Register</span></p>
            </form>
        </div>
    );
}

export default Login;