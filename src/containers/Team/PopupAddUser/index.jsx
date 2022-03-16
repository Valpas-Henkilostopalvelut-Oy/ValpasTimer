import React from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { Button, Col, InputGroup, Form } from "react-bootstrap";
import { Auth, DataStore } from "aws-amplify";
import { AllWorkSpaces } from "../../../models";
import { useAppContext } from "../../../services/contextLib";
import { Formik } from "formik";

const PopupAddUser = () => {
  const { selectedOption } = useAppContext();

  return (
    <Popup trigger={<Button>add user function</Button>} modal nested>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (val) => {
          const loggedUser = await Auth.currentAuthenticatedUser();
          const creditails = await DataStore.query(
            AllWorkSpaces,
            selectedOption.id
          );
        }}
      >
        {({ values, handleSubmit, handleChange }) => (
          <InputGroup className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="add user by email"
              value={values.email}
              onChange={handleChange}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              id="button-addon2"
              variant="outline-secondary"
            >
              Find
            </Button>
          </InputGroup>
        )}
      </Formik>
    </Popup>
  );
};

export default PopupAddUser;
