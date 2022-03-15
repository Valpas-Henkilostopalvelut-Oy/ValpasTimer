import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./login.css";
import "../../App.css"
import { Auth, DataStore } from "aws-amplify";
import { useAppContext } from "../../services/contextLib";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { onError } from "../../services/errorLib";
import { useFormFields } from "../../services/hooksLib";
import { createUser } from "../../services/createUser";
import { UserCredentials } from "../../models";

const Login = () => {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const checkUserProfile = async () => {
    try {
      const currentuser = await DataStore.query(UserCredentials);
      if (currentuser.length === 0) {
        createUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () =>
    fields.email.length > 0 && fields.password.length > 0;
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      await DataStore.start();
      setTimeout(() => {
        checkUserProfile();
        navigate("");
        userHasAuthenticated(true);
        setIsLoading(false);
      }, 1000);
    } catch (e) {
      setIsLoading(false);
      onError(e);
    }
  };

  return (
    <div className="Login main">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
};

export default Login;
