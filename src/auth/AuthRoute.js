import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

const AuthRoute = (props) => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);

    const savedToken = localStorage.getItem('token');

    useEffect(() => {
        if (!savedToken) {
            props.history.push('/auth');
        }
        else {
            axios.get('http://localhost:5000/auth/user', { token: savedToken })
            .then((res) => {
                console.log(res.data);
                if (res.data.message !== 'Successfully') {
                    localStorage.removeItem('token')
                    props.history.push('/auth');
                }
                else {
                    setToken(savedToken);
                }
            })
        }
    }, [savedToken, setToken, props.history]);

    if (token === '')
        return (
            <div></div>
        );
    else {
        return (
            props.children
        );
    }
}

export default withRouter(AuthRoute);