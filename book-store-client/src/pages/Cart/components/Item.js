import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../../context/CartContext';

import './Item.css';

const Item = (props) => {
    const { removeFromCart } = useContext(CartContext);

    const [amount, setAmount] = useState(1);

    const decrease = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    }

    const increase = () => {
        setAmount(amount + 1);
    }

    useEffect(() => {
        
    }, [amount])
    
    return (
        <div className='Item'>
            <div className='item-header'>
                <Link to={`/books/${props.book._id}`} className='book-title'>{props.book.name}</Link>
                <div className='delete-btn' onClick={() => {
                    removeFromCart(props.book._id)
                }}>
                    <i className="material-icons">delete_outline</i>
                </div>
            </div>
            <div className='infor-item'>
                <Link to={`/books/${props.book._id}`} className='book-cover'>
                    <img src={props.book.cover} alt="cover"/>
                </Link>
                <div className='amount'>
                    <div className='amount'>
                        <div onClick={decrease} className='d'>-</div>
                        <div className='number'>{amount}</div>
                        <div onClick={increase} className='a'>+</div>
                    </div>
                </div>
                <div className='money'>{props.book.price} $</div>
            </div>
        </div>
    );
}

export default Item;