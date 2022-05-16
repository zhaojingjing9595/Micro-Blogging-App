import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import "./TweetNavbar.css";

function TweetNavbar() {
  const { activeUser, onLogout } = useContext(AuthContext);
  
  return (
    <Container className="navbar-container">
      <Navbar variant="dark">
        <Container className="navbar-container-inner">
          <Navbar.Brand className="me-4" to="/" as={NavLink}>
            Micro Blog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {activeUser && (
                <>
                  <Nav.Link className="me-4" as={NavLink} to="/home">
                    Home
                  </Nav.Link>
                  <Nav.Link className="me-4" as={NavLink} to="/profile">
                    Profile
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {activeUser ? (
                <Nav.Link as={NavLink} to="/" onClick={onLogout}>
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default TweetNavbar;
