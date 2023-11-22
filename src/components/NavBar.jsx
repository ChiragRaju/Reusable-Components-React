import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "../components/NavBar.css";

const NavBar = () => {
  const largeFontStyle = {
    fontSize: "20px",
    color: "white",
    marginRight: "5px",
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">EmployeeLists</Navbar.Brand>
          <Nav className="me-auto-end">
            <Nav.Link href="/" className="nav-links" style={largeFontStyle}>
              Create
            </Nav.Link>
            <Nav.Link
              href="/lists"
              className="nav-links"
              style={largeFontStyle}
            >
              Lists
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
