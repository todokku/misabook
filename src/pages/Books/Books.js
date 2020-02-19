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
    const [loadMoreShowed, setLoadMoreShowed] = useState(false);

    const [books, setBooks] = useState([]);
    
    
    useEffect(() => {
        axios.get(`/books/all?page=${page}&field=${field}&sort=${sort}`, { headers: {
            token: token
        } })
        .then((res) => {
            setLoadMoreShowed(true);
            if (res.data.length === 0)
                setLoadMoreShowed(false);
            setBooks(books.concat(res.data));
        });
        // eslint-disable-next-line
    }, [field, sort, page, token]);

    const updateField = (e) => {
        setField(e.target.value);
        setBooks([]);
    }
    
    const updateSort = (e) => {
        setSort(e.target.value);
        setBooks([]);
    }

    const loadMore = () => {
        setPage(page + 1);
    }

    return (
        <div className='Books'>
            <h3 className='title'>Books</h3>
            <div className='books-selector'>
                <span className='title'>Sort by:</span>
                <select name="field" id="field" onChange={updateField}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="seller">Turnover</option>
                </select>
                <select name="sort" id="sort" onChange={updateSort}>
                    <option value="1">Ascending</option>
                    <option value="-1">Decrease</option>
                </select>
            </div>
            <div className='content'>
                {books.map(book => (
                    <Book book={book} key={book._id} />
                ))}
            </div>
            {loadMoreShowed &&
                <div className='load-more'>
                    <button onClick={loadMore}>Load more</button>
                </div>
            }
        </div>
    );
}

export default Books;