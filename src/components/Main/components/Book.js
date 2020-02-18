import React from 'react';
import { Link } from 'react-router-dom';

import './Book.css';

const Book = (props) => {
    return (
        <div className='Book'>
            <Link to={`/book/${props.book._id}`}
                
            >
                <div className='book-cover'
                    style={{backgroundImage: `url(${props.book.cover})`}}
                >
                    {/* <img src={props.book.cover} alt={props.book.name}/> */}
                </div>
            </Link>
            <div className='book-infor'>
                <Link to={`/book/${props.book._id}`} >
                    <h5 className='book-name'>{props.book.name}</h5>
                </Link>
                <h5 className='book-price'>{`${props.book.price} $`}</h5>
            </div>
        </div>
    );
}

export default Book;