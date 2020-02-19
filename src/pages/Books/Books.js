import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

import Book from '../../components/Main/components/Book';

import './Books.css';

const Books = () => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('/books', { headers: {
            token: token
        } })
        .then((res) => {
            setBooks(res.data);
        });
    });

    return (
        <div className='Books'>
            <h3 className='title'>Books</h3>
            <div className='content'>
                {books.map(book => (
                    <Book book={book} key={book._id} />
                ))}
            </div>
        </div>
    );
}

export default Books;