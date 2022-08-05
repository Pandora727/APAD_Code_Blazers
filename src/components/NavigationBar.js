// import { Link } from "react-router-dom"
import NavDropdown from 'react-bootstrap/NavDropdown'
// import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Code_Blazers</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/hardwaremanagement">Hardware Management</Nav.Link>
                        <NavDropdown title="Dropdown" >
                            <NavDropdown.Item href="/loginrequest">Log off</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            {/* </Container> */}
        </Navbar>
    )
}

export default NavigationBar