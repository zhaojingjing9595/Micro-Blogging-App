import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import AuthContext from "../Contexts/AuthContext";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { onSignUpWithEmail } = useContext(AuthContext);
  return (
    <Container className="login-form text-start mt-5" style={{ width: "35vw" }}>
      <Row>
        <h1>Sign up your account</h1>
      </Row>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Your display name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              variant="outline-primary"
              type="button"
              onClick={() => onSignUpWithEmail(email, password, displayName)}
            >
              Sign up
            </Button>
          </div>

          <div className="mt-2">
            Already have an account? &nbsp;
            <Nav.Link
              style={{ display: "inline-block", padding: "0" }}
              as={NavLink}
              to="/login"
            >
              Login here
            </Nav.Link>
          </div>
        </Form>
      </Row>
    </Container>
  );
}

export default SignUpPage;
