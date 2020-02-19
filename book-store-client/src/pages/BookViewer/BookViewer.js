import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

import './BookViewer.css';

const BookViewer = (props) => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);
    const { items, addToCart, removeFromCart } = useContext(CartContext);

    const [book, setBook] = useState({});

    useEffect(() => {
        const id = props.match.params.id;
        
        axios.get(`/books/${id}`, { headers: {
            token: token
        } })
        .then((res) => {
            setBook(res.data[0]);
        });
        // eslint-disable-next-line
    }, [props.match.params.id, token])

    return (
        <div className='BookViewer'>
            <div className='container'>
                <div className='cover'>
                    <img src={book.cover} alt="cover"/>
                </div>
                <div className='infor'>
                    <h3 className='title'>{book.name}</h3>
                    <h3 className='author'>{book.author}</h3>
                    <h3 className='price'>{book.price} $</h3>
                    <ul>
                        <li>Free shipping</li>
                        <li>Prestige</li>
                        <li>High quality</li>
                    </ul>
                    {!items[0].includes(book._id) && (
                        <button className='btn-add-to-cart'
                            onClick={() => {
                                addToCart(book._id)
                            }}
                        >
                            <i className="material-icons">add_shopping_cart</i>
                            <div>Add to cart</div>
                        </button>
                    )}
                    {items[0].includes(book._id) && (
                        <button className='btn-add-to-cart btn-added'
                            onClick={() => {
                                removeFromCart(book._id)
                            }}
                        >
                            <i className="material-icons">remove_shopping_cart</i>
                            <div>Remove from cart</div>
                        </button>
                    )}
                </div>
            </div>
            <div className='description-wrapper'>
                <h3 className='description'>Description</h3>
                <p>{book.description}</p>
            </div>
        </div>
    );
}

export default BookViewer;