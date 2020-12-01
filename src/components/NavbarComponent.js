import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <div>
            {/* bg="dark" */}
            <Navbar variant="dark" expand="lg" className="navbar-custom">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                    <Navbar.Text>
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavbarComponent;