import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

import Item from './components/Item';

import './Cart.css';

const Cart = () => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);
    const { items } = useContext(CartContext);

    const [total, setTotal] = useState(0);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (items[0].length !== 0) {
            axios.post('/books/ids', {
                items: items[0] 
            }, {
                headers: {
                    token: token
                }
            })
            .then(res => {
                if (!res.data.message) {
                    setBooks(res.data);
                    let _total = 0
                    for (let i = 0; i < res.data.length; i++) {
                        _total += res.data[i].price;
                    }
                    setTotal(_total)
                }
            })
        }
    }, [items, token])

    return (
        <div className='Cart'>
            <h3 className='title'>Cart</h3>
            <div className='container'>
                {books.map(book => (
                    <Item
                        book={book}
                        total={total}
                        setTotal={setTotal}
                        key={book._id}
                    />
                ))}
                <div className='total'>Total: {total} $</div>
            </div>
        </div>
    );
}

export default Cart;