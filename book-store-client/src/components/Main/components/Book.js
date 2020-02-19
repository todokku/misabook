import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../../context/CartContext';

import './Book.css';

const Book = (props) => {    
    const { items, addToCart, removeFromCart } = useContext(CartContext);

    return (
        <div className='Book'>
            <Link className='book-cover-link' to={`/books/${props.book._id}`}
                
            >
                <div className='book-cover'
                    style={{backgroundImage: `url(${props.book.cover})`}}
                >
                </div>
            </Link>
            <div className='book-infor'>
                <Link to={`/books/${props.book._id}`} >
                    <h5 className='book-name'>{props.book.name}</h5>
                </Link>
                <div className='cart-wrapper'>
                    <h5 className='book-price'>{`${props.book.price} $`}</h5>
                    {!items[0].includes(props.book._id) && (
                        <button onClick={() => {
                            addToCart(props.book._id)
                        }}>
                            <div>
                                <i className="material-icons">add_shopping_cart</i>
                            </div>
                            <div>Add to cart</div>
                        </button>
                    )}
                    {items[0].includes(props.book._id) && (
                        <button className='btn-added'
                            onClick={() => {
                                removeFromCart(props.book._id);
                            }}
                        >
                            <div>
                                <i className="material-icons">remove_shopping_cart</i>
                            </div>
                            <div>Remove from cart</div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Book;