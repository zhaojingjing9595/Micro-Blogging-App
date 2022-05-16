import React, { useContext} from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import "./TweetForm.css";
import HomePageContext from "../Contexts/HomePageContext";

function TweetForm() {
  const { onPostNewTweet, text, onSetText, loaderShow, errorShow } = useContext(HomePageContext);
  
  return (
    <Form className="t-form py-3 mx-auto">
      <Row className="justify-content-center">
        <Col xs={12} md={9} lg={7} className="p-0">
          <Form.Control
            className="t-form-text"
            as="textarea"
            rows={5}
            placeholder="What you have in mind..."
            value={text}
            onChange={(e) => onSetText(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="justify-content-center button-error-row">
        <Col xs={9} md={7} lg={5} className="text-start error-col">
          <span
            style={{ visibility: text.length > 140 ? "visible" : "hidden" }}
          >
            The tweet can't contain more than 140 chars.
          </span>
        </Col>
        <Col xs={3} md={2} lg={2} className="text-end button-col">
          <Button
            disabled={text.length > 140 || loaderShow}
            className="t-form-btn"
            type="submit"
            onClick={onPostNewTweet}
          >
            Tweet
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center loader-row">
        <Col xs={12} md={9} lg={7}>
          {loaderShow ? (
            <Spinner className="tweet-loader" animation="border" />
          ) : null}
          {errorShow && <span>There's a server error! {errorShow} </span> }
        </Col>
      </Row>
    </Form>
  );
}

export default TweetForm;
