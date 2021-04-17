import React from 'react'
import {Container, Row, Col, Navbar, NavDropdown, Nav} from 'react-bootstrap'

const Dash = () => {
    return (
        <>
        <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">@themost/react</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link href="#user">User</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
         <Container fluid>
                <Row>
                    <Col xs={2} id="sidebar-wrapper">
                      <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
                      activeKey="/home"
                      onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                      >
                          <div className="sidebar-sticky"></div>
                      <Nav.Item>
                          <Nav.Link href="/home">Active</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link eventKey="link-1">Link</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link eventKey="link-2">Link</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link eventKey="disabled" disabled>
                          Disabled
                          </Nav.Link>
                      </Nav.Item>
                      </Nav>
                    </Col>
                    <Col  xs={10} id="page-content-wrapper">
                        this is a test
                    </Col>
                </Row>

            </Container>
        </>
        );
  };
  const Dashboard = Dash;
  export default Dashboard
