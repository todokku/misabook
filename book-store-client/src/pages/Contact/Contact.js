import React, { useState } from 'react';

import './Contact.css';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

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

    return (
        <div className='Contact'>
            <div className='content'>
                <h3 className='title'>Contact</h3>
                <form>
                    <div className="form-control">
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' placeholder='name...' required
                            onChange={updateName}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' placeholder='email...' required
                            onChange={updateEmail}
                        />
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
        </div>
    );
}

export default Contact;