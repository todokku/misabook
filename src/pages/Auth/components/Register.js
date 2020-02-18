import React from 'react';
import classnames from 'classnames';

import './Register.css';

const Register = (props) => {
    return (
        <div className={classnames('Register', {
            'Register-show': props.register
        })}>
            <form>
                <h4>Register</h4>
                <div className='form-control'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' placeholder='name...' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' placeholder='email...' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="text" id='pasword' placeholder='password...' required />
                </div>
                <div className='form-control'>
                    <label htmlFor="re-password">Confirm password</label>
                    <input type="text" id='re-password' placeholder='confirm password...' required />
                </div>
                <button>Register</button>
                <p>Had an account? <span onClick={props.swithAuth}>Login</span></p>
            </form>
        </div>
    );
}

export default Register;