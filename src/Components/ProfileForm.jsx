import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../Contexts/AuthContext";
import './ProfileForm.css'


function ProfileForm() {
  const { activeUser, onUpdateDisplayName } = useContext(AuthContext);
  const [ userName, setUsername ] = useState(activeUser.displayName);
    
    return (
      <Form>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            User Name
          </Form.Label>
          <Form.Control
            className="profile-form-text p-2"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="user name"
          />
        </Form.Group>
        <div className="text-end">
          <Button
            variant="primary"
            type="button"
            onClick={() => {onUpdateDisplayName(activeUser, userName);
            }}
          >
            Update 
          </Button>
        </div>
      </Form>
    );
}

export default ProfileForm;