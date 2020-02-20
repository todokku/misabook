import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../../../context/CartContext';

import './Item.css';

const Item = (props) => {
    const { removeFromCart } = useContext(CartContext);

    const [amount, setAmount] = useState(1);

    const findIndex = () => {
        return new Promise((resolve, reject) => {
            let _order = props.order;
            for (let i = 0; i < _order.length; i++) {
                if (_order[i].id === props.book._id) {
                    resolve(i);
                }
            }
        })
    }

    const deleteItem = async () => {
        await props.setTotal(props.total - props.book.price * amount);
        await findIndex()
        .then(index => {
            let _order = props.order;
            _order.splice(index, 1)
            props.setOrder(_order);
        })
        removeFromCart(props.book._id);
    }

    const decrease = async () => {
        if (amount > 1) {
            setAmount(amount - 1);
            props.setTotal(props.total - props.book.price);
            findIndex()
            .then(index => {
                let _order = props.order;
                const preAmount = _order[index].amount;
                _order.splice(index, 1, {
                    amount: preAmount - 1,
                    id: props.book._id
                });
                props.setOrder(_order);
            })
        }
    }

    const increase = async () => {
        setAmount(amount + 1);
        props.setTotal(props.total + props.book.price);
        findIndex()
        .then(index => {
            let _order = props.order;
            const preAmount = _order[index].amount;
            _order.splice(index, 1, {
                amount: preAmount + 1,
                id: props.book._id
            });
            props.setOrder(_order);
        })
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