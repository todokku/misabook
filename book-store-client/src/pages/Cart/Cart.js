import React, { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import axios from 'axios';

import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

import Item from './components/Item';

import empty from '../../assets/empty.png';

import './Cart.css';

const Cart = (props) => {
    // eslint-disable-next-line
    const [token, setToken] = useContext(AuthContext);
    const { items } = useContext(CartContext);
    
    const [total, setTotal] = useState(0);
    const [books, setBooks] = useState([]);
    const [submitShowed, setSubmitShowed] = useState(false);

    const [order, setOrder] = useState([]);

    const nameRegex = /^.{3,}$/; // Minium 3 characters
    const vnPhoneNumberRegex = /0\d{9}/;

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const [nameError, setNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);

    const updateName = (e) => {
        setName(e.target.value);
    }

    const updatePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }

    const updateAddress = (e) => {
        setAddress(e.target.value);
    }

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
    }, [items, token]);

    const showSubmit = () => {
        setSubmitShowed(!submitShowed)
    }

    const submit = (e) => {
        e.preventDefault();

        setNameError(false);
        setPhoneNumberError(false);

        let errors = 0;

        if (!nameRegex.test(name)) {
            errors++;
            setNameError(true);
        }
        if (!vnPhoneNumberRegex.test(phoneNumber)) {
            errors++;
            setPhoneNumberError(true);
        }

        if (errors === 0) {
            axios.post('/orders', {
                name: name,
                phoneNumber: phoneNumber,
                address: address,
                items: order
            }, {
                headers: {
                    token: token
                }
            })
            .then(res => {
                if (!res.data.message) {
                    setName('');
                    setPhoneNumber('');
                    setAddress('');
                    localStorage.removeItem('items');
                    setOrder([]);
                    setBooks([]);
                    items[1]([]);
                }
            })
        }
    }

    return (
        <div className='Cart'>
            <div className={classnames('wrapper', {
                'wrapper-hiden': submitShowed
            })}>
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
                            <button onClick={showSubmit} className='submit'>Submit</button>
                        </div>
                    </div>
                )}
            </div>
            {items[0].length > 0 && (
                <div className={classnames('submit-form', {
                    'submit-form-showed': submitShowed
                })}>
                    <h3 className='title'>Submit</h3>
                    <form onSubmit={submit}>
                        <div className="form-control">
                            <label htmlFor="name">Name</label>
                            <input type="text" id='name' placeholder='name...' required
                                onChange={updateName}
                            />
                            <div className={classnames('errors', {
                                'errors-showed': nameError
                            })}>Name is invalid</div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="phone-number">Phone number</label>
                            <input type="text" id='phone-number' placeholder='phone number...' required
                                onChange={updatePhoneNumber}
                            />
                            <div className={classnames('errors', {
                                'errors-showed': phoneNumberError
                            })}>Phone number is invalid</div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="address">Address</label>
                            <input type="text" id='address' placeholder='address...' required
                                onChange={updateAddress}
                            />
                        </div>
                        <div>
                            <button>Submit</button>
                            <div className='go-back' onClick={showSubmit}>
                                <i className="material-icons">arrow_back</i>&nbsp;
                                Go back
                            </div>
                        </div>
                    </form>
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