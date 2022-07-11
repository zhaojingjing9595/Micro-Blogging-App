import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap'
import HomePageContext from '../Contexts/HomePageContext';
import './Tweet.css'


function Tweet({ tweetObj}) {
  const { users } = useContext(HomePageContext)
  return (
    <>
      {users && (
        <Row className="tweet-container justify-content-center mt-3">
          <Col xs={12} md={9} lg={7} className="tweet-container-col p-3">
            <Row>
              <Col className="tweet-user">
                {users.length &&
                  users.find((user) => user.userId === tweetObj.userId).userName}
              </Col>
              <Col className="tweet-date text-end">{tweetObj.date}</Col>
            </Row>
            <Row>
              <Col className="tweet-text my-1">{tweetObj.content}</Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Tweet;