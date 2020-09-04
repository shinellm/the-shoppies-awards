import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
// import logo from '../../images/svg/reactlogo.svg';
import logo from '../../images/svg/logo.svg';

function Footer() {
    return (
        <footer>
            <Navbar bg="light" variant="light">
                <span className="navbar-brand" href="/">
                    {/* <img className='logo' src={logo} alt="logo"/> */}
                    <span className='logo-text'>&copy; 2020 Shinell<b>Manwaring</b></span>
                </span>
            </Navbar>
        </footer>
    );
}

export default Footer;