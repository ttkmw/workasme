import React from "react";
import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
/** @jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from '@emotion/react'
import Colors from "src/pages/constants/Colors";
import {SerializedStyles} from "@emotion/serialize";


const TopNavigation: React.FC<{ containerStyle: SerializedStyles }> = (props: { containerStyle: SerializedStyles }) => {
  const {containerStyle} = props;

  return <Navbar expand="lg" css={containerStyle}>
    <Container>
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
};

export default TopNavigation;
