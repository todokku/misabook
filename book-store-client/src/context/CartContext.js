import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = (props) => {
    const [items, setItems] = useState([]);
    
    const addToCart = (id) => {
        setItems(items.concat(id));
    }

    const removeFromCart = (id) => {
        setItems(items.splice(items.indexOf(id), 1));
    }

    return (
        <CartContext.Provider value={[items, setItems], addToCart, removeFromCart}>
            {props.children}
        </CartContext.Provider>
    );
}

export default { CartContext, CartProvider }