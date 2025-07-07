import React from "react";
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <nav className="menu">
                <a className="menu-btn" href="#">About Me</a>
                <a className="menu-btn" href="#">Contact</a>
            </nav>

            <div className="buttons">
                <a className="menu-btn" href="#">Book a Lesson</a>
                <a className="menu-btn" href="#">Grammar Tips</a>
                <a className="menu-btn" href="#">Vocabulary Search</a>
            </div>
        </header>
    )
};

export default Header;