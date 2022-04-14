import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./login.css";
import "../../App.css";
import { Auth, DataStore } from "aws-amplify";
import { useAppContext } from "../../services/contextLib";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../../components/LoaderButton";
import { onError } from "../../services/errorLib";
import { createUser } from "../../services/createUser";
import { UserCredentials } from "../../models";
import { Formik } from "formik";

const Login = () => {
  const { userHasAuthenticated, setAppLoading } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="Login main">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (val) => {
          setIsLoading(true);

          try {
            await Auth.signIn(val.email, val.password);
            await DataStore.start();
            userHasAuthenticated(true);
            setTimeout(() => {
              checkUserProfile();
            }, 1000);
            setAppLoading(false);
            navigate("/home", { replace: true });
            setIsLoading(false);
          } catch (e) {
            setIsLoading(false);
            onError(e);
          }
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={values.email} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={values.password} onChange={handleChange} />
              </Form.Group>
            </Row>

            <LoaderButton
              size="lg"
              type="submit"
              variant="success"
              isLoading={isLoading}
              as={Col}
              onClick={handleSubmit}
            >
              Login
            </LoaderButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
