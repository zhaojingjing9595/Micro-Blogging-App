import React from "react";
import { Container, Row } from "react-bootstrap";
import ProfileForm from "../Components/ProfileForm";
import "./ProfilePage.css";

function ProfilePage() {

  return (
    <Container className="profile-form text-start mt-5">
      <Row>
        <h2 className="mb-4">Profile</h2>
        <ProfileForm />
      </Row>
    </Container>
  );
}

export default ProfilePage;
