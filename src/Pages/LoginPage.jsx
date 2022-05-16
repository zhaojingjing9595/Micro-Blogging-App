import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Nav,
  Alert,
  Spinner,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { onLoginWithEmail, onLoginWithGoogle } = useContext(AuthContext);

  async function handleLoginWithEmail() {
    try {
      setIsLoggingIn(true);
      setLoginError(false);
      await onLoginWithEmail(email, password);
    } catch (err) {
      setLoginError(true);
      setIsLoggingIn(false);
    }
  }

  async function handleLoginWithGoogle() {
    try {
      await onLoginWithGoogle();
    } catch (err) {
      console.Error(err);
    }
  }
  return (
    <Container className="login-form text-start mt-5" style={{ width: "35vw" }}>
      <Row>
        <h1>Login to the blog</h1>
      </Row>
      <Row>
        {" "}
        {loginError && (
          <Alert variant="danger" className="py-1">
            Invalid Login! Incorrect email or password!
          </Alert>
        )}
      </Row>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
              variant="primary"
              type="button"
              onClick={handleLoginWithEmail}
              disabled={isLoggingIn}
            >
              Login &nbsp;
              {isLoggingIn && <Spinner animation="border" size="sm" />}
            </Button>
          </div>
          <div className="d-grid gap-2 mt-2">
            <Button
              variant="outline-primary"
              type="button"
              onClick={handleLoginWithGoogle}
              //   disabled={isLoggingIn}
            >
              Login with Google account &nbsp;
              {/* {isLoggingIn && <Spinner animation="border" size="sm" />} */}
            </Button>
          </div>
          <Nav.Link className="px-0" as={NavLink} to="/register">
            Create your account
          </Nav.Link>
        </Form>
      </Row>
    </Container>
  );
}

export default LoginPage;
