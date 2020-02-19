import React, { useState, useEffect, useContext } from 'react';
import classnames from 'classnames';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

import successImg from '../../assets/success.png';

import './Contact.css';

const Contact = () => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);

    const [success, setSuccess] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const nameRegex = /^.{3,}$/; // Minium 3 characters
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // eslint-disable-next-line

    const updateName = (e) => {
        setName(e.target.value);
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updateMessage = (e) => {
        setMessage(e.target.value);
    }

    const submit = (e) => {
        e.preventDefault();

        setNameError(false);
        setEmailError(false);

        let errors = 0;

        if (!nameRegex.test(name)) {
            errors++;
            setNameError(true);
        }

        if (!emailRegex.test(email)) {
            errors++;
            setEmailError(true);
        }
        
        if (errors === 0) {
            axios.post('/message', {
                name: name,
                email: email,
                message: message
            }, { headers: {
                token: token
            } })
            .then((res) => {
                if (!res.data.message) {
                    setSuccess(true);
                }
            });
        }
    }

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(false);
            }, 2500);
        }
    }, [success])

    return (
        <div className='Contact'>
            <div className={classnames('content', {
                'content-hiden': success
            })}>
                <h3 className='title'>Contact</h3>
                <form onSubmit={submit}>
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' placeholder='name...' required
                            onChange={updateName}
                        />
                        <div className={classnames('errors', {
                            'errors-showed': nameError
                        })}>Name is invalid</div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' placeholder='email...' required
                            onChange={updateEmail}
                        />
                        <div className={classnames('errors', {
                            'errors-showed': emailError
                        })}>Email is invalid</div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" cols="30" rows="10" required
                            onChange={updateMessage}
                        ></textarea>
                    </div>
                    <button>Send</button>
                </form>
            </div>
            <div className={classnames('success', {
                'success-showed': success
            })}>
                <img src={successImg} alt="success"/>
                <div className='success-title'>Success</div>
            </div>
        </div>
    );
}

export default Contact;