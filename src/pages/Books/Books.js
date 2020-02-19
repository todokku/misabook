import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';

import Book from '../../components/Main/components/Book';

import './Books.css';

const Books = () => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);

    const [page, setPage] = useState(1);
    const [field, setField] = useState('name');
    const [sort, setSort] = useState(1);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get(`/books/all?page=${page}&field=${field}&sort=${sort}`, { headers: {
            token: token
        } })
        .then((res) => {
            setBooks(res.data);
        });
    }, []);

    return (
        <div className='Books'>
            <h3 className='title'>Books</h3>
            <div className='books-selector'>
                <span className='title'>Sort by:</span>
                <select name="field" id="field">
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="seller">Turnover</option>
                </select>
                <select name="sort" id="sort">
                    <option value="1">Ascending</option>
                    <option value="-1">Decrease</option>
                </select>
            </div>
            <div className='content'>
                {books.map(book => (
                    <Book book={book} key={book._id} />
                ))}
            </div>
        </div>
    );
}

export default Books;