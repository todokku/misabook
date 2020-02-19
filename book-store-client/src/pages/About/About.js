import React from 'react';

import './About.css';

const About = () => {
    return (
        <div className='About'>
            <h3 className='title'>About</h3>
            <div className="container">
                <div className='image-header'>
                    <img src='https://res.cloudinary.com/dumfvnj9f/image/upload/v1582135271/bookstore/ezgif.com-webp-to-png_1_vvnksx.png' alt=""/>
                </div>
                <div className='open-p'>
                    <span>MisaBook</span> is a design-minded, multi-disciplinary brand offering objects, events, and experiences related to books and reading.  We are based in the San Francisco Bay Area and New York City. 
                </div>
                <div className='content'>
                    <h3>Our Philosophy</h3>
                    <p>
                        Some people like to read on a screen. Other people need the variety and artistry, the sight, smell, and feel of actual books.They love seeing them on their shelves; they love having shelves for them.
                    </p>
                    <p>
                        They love taking them along when they leave the house, and stacking them by their bedsides. They love finding old letters and bookmarks in them. They like remembering where they bought them or who they received them from.
                    </p>
                    <p>
                        They want to read in a way that offers a rich experience, more than the words only: the full offering of a book. They are particular about covers, they want to surround themselves with the poetry of good design.
                    </p>
                    <p>
                        They can't pass a bookstore without going in and getting something, they keep a library card and use it.
                    </p>
                    <p>
                        They are allergic to cheap bestsellers; they delight in the out-of-the-way and the rare, the well-made and the hard-to-accomplish. They take care of their books; they  know a book is only theirs until it passes on to someone else. They are good stewards of a timeless object.
                    </p>
                    <p>
                        These are the people we're working for.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;