import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

import Item from './components/Item';

import empty from '../../assets/empty.png';

import './Cart.css';

const Cart = () => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);
    const { items } = useContext(CartContext);
    
    const [total, setTotal] = useState(0);
    const [books, setBooks] = useState([]);

    const [order, setOrder] = useState([]);

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
                    let _total = 0;
                    let _order = [];
                    for (let i = 0; i < res.data.length; i++) {
                        _total += res.data[i].price;
                        _order.push({
                            amount: 1,
                            id: res.data[i]._id
                        });
                    }
                    setTotal(_total);
                    setOrder(_order);
                }
            })
        }
    }, [items, token])

    return (
        <div className='Cart'>
            <h3 className='title'>Cart</h3>
            {items[0].length > 0 && (
                <div className='container'>
                    {books.map(book => (
                        <Item
                            book={book}
                            total={total}
                            setTotal={setTotal}
                            order={order}
                            setOrder={setOrder}
                            key={book._id}
                        />
                    ))}
                    <div className='bill'>
                        <div>
                            <div className='total'>Total: {total} $</div>
                        </div>
                        <button className='submit'>Submit</button>
                    </div>
                </div>
            )}
            {items[0].length === 0 && (
                <div className='empty'>
                    <img src={empty} alt="empty"/>
                </div>
            )}
        </div>
    );
}

export default Cart;