import React, { useContext, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

import './Cart.css';

const Cart = () => {
    const [token, setToken] = useContext(AuthContext);
    const { items } = useContext(CartContext);
    
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
                console.log(res);
            })
        }
    }, [items])

    return (
        <div className='Cart'>
            <h3>Cart</h3>
            <div className='container'>

            </div>
        </div>
    );
}

export default Cart;