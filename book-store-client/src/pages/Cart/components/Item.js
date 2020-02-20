import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../../context/CartContext';

import './Item.css';

const Item = (props) => {
    const { removeFromCart } = useContext(CartContext);

    const [amount, setAmount] = useState(1);

    const deleteItem = async () => {
        await props.setTotal(props.total - props.book.price * amount);
        removeFromCart(props.book._id);
    }

    const decrease = () => {
        if (amount > 1) {
            setAmount(amount - 1);
            props.setTotal(props.total - props.book.price);
        }
    }

    const increase = () => {
        setAmount(amount + 1);
        props.setTotal(props.total + props.book.price);
    }

    
    return (
        <div className='Item'>
            <div className='item-header'>
                <Link to={`/books/${props.book._id}`} className='book-title'>{props.book.name}</Link>
                <div className='delete-btn' onClick={deleteItem}>
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