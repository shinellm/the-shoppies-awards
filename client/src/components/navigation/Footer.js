import React from 'react';
import { Navbar } from 'react-bootstrap';
// import logo from '../../images/svg/logo.svg';

function Footer() {
    return (
        <footer>
            <Navbar bg="light" variant="light">
                <span className="navbar-brand" href="/">
                    {/* <img className='logo' src={logo} alt="logo"/> */}
                    <span className="copyright">
                        <span className='logo-text'>&copy; 2020 The<b>Shoppies</b></span>
                        <span className="contributor">Coded by<span className="heart"> ❤ </span>Shinell Manwaring</span>
                    </span>
                </span>
            </Navbar>
        </footer>
    );
}

export default Footer;