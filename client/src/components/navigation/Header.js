import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
// import logo from '../../images/svg/reactlogo.svg';
import logo from '../../images/svg/logo.svg';

export default class Header extends Component {
    render () {
        return (
            <header style={{position: "sticky", top: "0", zIndex: "1020"}}>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Nav.Link className="navbar-brand" href="/" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <div style={{width: "40px", height: "40px", borderRadius: "50%", background: "#e44d26", marginRight: ".5em"}}>
                            <img className='logo' src={logo} alt="logo"/>
                        </div>
                        <span className='logo-text align-middle'>The<b>Shoppies</b></span>
                    </Nav.Link>
                    <Navbar.Toggle aria-controls="header-navbar-nav"/>
                    <Navbar.Collapse id="header-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link className="m-auto" href="/vote">Vote</Nav.Link>
                            <Nav.Link className="m-auto" href="/nominees">Nominees</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}