import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

import Book from '../../components/Main/components/Book';

import './Home.css';

const Home = () => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);

    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/books/best-seller', {
            headers: {
                token: token//the token is a variable which holds the token
            }
        })
        .then((res) => {
            setBestSeller(res.data);
            console.log(res.data)
        })
    }, [token]);

    return (
        <div className='Home'>
            <h3>Best Seller</h3>
            <div id='best-seller'>
                {bestSeller.map(book => (
                    <Book book={book} key={book._id}/>
                ))}
            </div>
        </div>
    );
}

export default Home;