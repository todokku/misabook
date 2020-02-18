import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

const AuthRoute = (props) => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);

    useEffect(() => {
        let savedToken = localStorage.getItem('token');

        if (!savedToken) {
            setToken('');
            props.history.push('/auth');
        }
        else {
            axios.post('http://localhost:5000/auth/user', {
                token: savedToken
            })
            .then((res) => {
                if (res.data.message !== 'Successfully') {
                    localStorage.removeItem('token')
                    props.history.push('/auth');
                }
                else {
                    setToken(savedToken);
                }
            })
        }
    }, [setToken, props.history]);

    return (
        <div className='AuthRoute'>
            {token !== '' && props.children}
            {token === '' && null}
        </div>
    )
}

export default withRouter(AuthRoute);