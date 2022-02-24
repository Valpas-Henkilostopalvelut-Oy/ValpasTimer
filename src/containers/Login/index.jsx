import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./login.css";
import { Auth, DataStore } from "aws-amplify";
import { useAppContext } from "../../services/contextLib";
import { useHistory } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { onError } from "../../services/errorLib";
import { useFormFields } from "../../services/hooksLib";

const Login = () => {
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  const validateForm = () => fields.email.length > 0 && fields.password.length > 0;
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      DataStore.start()
      userHasAuthenticated(true);
      history.push("/timer");
    } catch (e) {
      setIsLoading(false)
      onError(e);
    }
  };

  return (
    <div className="Login">
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
          block
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
