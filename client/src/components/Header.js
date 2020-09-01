import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../images/svg/logo.svg';

export default class Header extends Component {
    render () {
        return (
            <header>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Nav.Link className="navbar-brand" href="/">
                        {/* <img className='logo' src={logo} alt="logo"/> */}
                        <span className='logo-text align-middle'>The<b>Shoppies</b></span>
                    </Nav.Link>
                    <Navbar.Toggle aria-controls="header-navbar-nav"/>
                    <Navbar.Collapse id="header-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link classname="m-auto" href="/">Resume</Nav.Link>
                            <Nav.Link className="m-auto" href="/">Works</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}