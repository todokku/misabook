import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let localItems = localStorage.getItem('items');
        if (localItems) {
            let parsedItems = JSON.parse(localItems);
            setItems(parsedItems);
        }
    }, []);
    
    const addToCart = (id) => {
        if (!items.includes(id)) {
            const newItems = items.concat(id);
            localStorage.setItem('items', JSON.stringify(newItems));
            setItems(newItems);
        }
    }

    const removeFromCart = (id) => {
        let newItems = items;
        let index = items.indexOf(id);
        newItems = newItems.filter((_, i) => i !== index)
        localStorage.setItem('items', JSON.stringify(newItems));
        setItems(newItems);
    }

    return (
        <CartContext.Provider value={{
            items: [items, setItems],
            addToCart,
            removeFromCart
        }}>
            {props.children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider }