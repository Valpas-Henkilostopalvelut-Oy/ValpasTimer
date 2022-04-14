import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Row, Col } from "react-bootstrap";
import LoaderButton from "../../../components/LoaderButton";
import { useAppContext } from "../../../services/contextLib";
import { onError } from "../../../services/errorLib";
import { Auth } from "aws-amplify";

const SingUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userForm, setNewUser } = useAppContext();

  return (
    <Formik
      initialValues={userForm}
      onSubmit={async (val) => {
        setIsLoading(true);

        try {
          await Auth.signUp({
            username: val.email,
            password: val.password,
            attributes: {
              "custom:RuningTimeEntry": "null",
              name: val.firstName,
              family_name: val.lastName,
              phone_number: `+${val.phoneNumber}`,
            },
          });
          setIsLoading(false);
          setNewUser(val);
        } catch (e) {
          //An account with the given email already exists.
          setIsLoading(false);
          alert(e);
          onError(e);
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="email" size="lg">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={values.email} onChange={handleChange} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} size="lg">
              <Form.Label>First name</Form.Label>
              <Form.Control type="text" name="firstName" value={values.firstName} onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} size="lg">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" name="lastName" value={values.lastName} onChange={handleChange} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} size="lg">
              <Form.Label>Phone number</Form.Label>
              <Form.Control type="number" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="password" size="lg">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={values.password} onChange={handleChange} />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="confirmPassword" size="lg">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" value={values.confirmPassword} onChange={handleChange} />
            </Form.Group>
          </Row>
          <LoaderButton
            size="lg"
            type="submit"
            variant="success"
            isLoading={isLoading}
            //disabled={!validateForm()}
            as={Col}
            onClick={handleSubmit}
          >
            Signup
          </LoaderButton>
        </Form>
      )}
    </Formik>
  );
};
export default SingUpForm;
