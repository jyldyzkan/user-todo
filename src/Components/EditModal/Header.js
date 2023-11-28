import React from 'react';
import './Header.css'

const Header = () => {
    return (
        <header className="header">
            <a href="#" className="logo">
                <img src="https://www.svgrepo.com/show/530661/genetic-data.svg" width={'70px'} alt=""/>
                <p className="logo-text">todo<span> list</span></p>
            </a>
        </header>
    );
}

export default Header;