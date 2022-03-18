import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, InputGroup } from "react-bootstrap";
import { Auth, DataStore } from "aws-amplify";
import { useAppContext } from "../../services/contextLib";
import "../../App.css";
import "./Settings.css";
import { Formik } from "formik";
import * as yup from "yup";
import { useFormFields } from "../../services/hooksLib";
import LoaderButton from "../../components/LoaderButton";
import { UserCredentials } from "../../models";

const Settings = () => {
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const valSchema = yup.object().shape({
    lastName: yup
      .string()
      .min(3, "*Last name must have at least 2 characters")
      .max(100, "*Last names can't be longer than 100 characters")
      .required("*Last name is required"),

    firstName: yup
      .string()
      .min(3, "*First name must have at least 2 characters")
      .max(100, "*Frist names can't be longer than 100 characters")
      .required("*First names is required"),

    username: yup
      .string()
      .min(3, "*Nickname must have at least 2 characters")
      .max(100, "*Nicknames can't be longer than 100 characters")
      .required("*Nickname is required"),

    email: yup
      .string()
      .email("*Must be a valid email address")
      .max(100, "*Email must be less than 100 characters")
      .required("*Email is required"),

    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "*Phone number is not valid")
      .required("*Phone number required"),
  });

  const [initValues, setIniValues] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      let loggedUser = await Auth.currentAuthenticatedUser();
      setIniValues({
        lastName: loggedUser.attributes.family_name,
        firstName: loggedUser.attributes.name,
        username: loggedUser.nickname,
        email: loggedUser.attributes.email,
        phoneNumber: loggedUser.attributes.phone_number.slice(4),
        address: "",
        city: "",
        zipCode: "",
        contry: "",
      });
    };
    if (initValues === null) loadSettings();
  });

  const updateAttributes = async (formVal) => {};

  const Avatar = () => {
    return (
      <div className="current-image">
        <div className="image-text">OK</div>
      </div>
    );
  };

  return (
    <div className="settings main container">
      {initValues != null && (
        <div>
          <div>
            <div>Profile settings</div>
          </div>
          <div className="settings-card">
            <div className="profile-image">
              <div className="photo-upload">
                <Avatar />
                <div className="upload">
                  <Button className="upload-button">Upload image</Button>
                </div>
              </div>
            </div>

            <Formik
              initialValues={initValues}
              validationSchema={valSchema}
              onSubmit={async (values) => {
                console.log(values);
                try {
                  const loggedUser = await Auth.currentAuthenticatedUser();
                  await Auth.updateUserAttributes(loggedUser, {
                    nickname: values.username,

                    name: values.firstName,
                    family_name: values.lastName,

                    phone_number: `+358${values.phoneNumber}`,
                    email: values.email,
                  });

                  const original = await DataStore.query(
                    UserCredentials,
                    loggedUser.attributes["custom:UserCreditails"]
                  );

                  await DataStore.save(
                    UserCredentials.copyOf(original, (updated) => {
                      updated.profile.first_name = values.firstName;
                      updated.profile.last_name = values.lastName;
                      updated.profile.phone_number = `+358${values.phoneNumber}`;
                      updated.profile.email = values.email;
                    })
                  );
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                <Form id="settings-form" noValidate>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationFormik01">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.firstName}
                      />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationFormik02">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.lastName}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      md="4"
                      controlId="validationFormikUsername"
                    >
                      <Form.Label>Username</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">
                          @
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="email">
                      <Form.Label>Email: </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="phoneNumber">
                      <Form.Label>Phone number</Form.Label>
                      <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">
                          +358
                        </InputGroup.Text>
                        <Form.Control
                          type="number"
                          name="phoneNumber"
                          placeholder="Phone number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                          isInvalid={!!errors.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phoneNumber}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>

                  {/*<Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        isInvalid={!!errors.address}
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="zipCode">
                      <Form.Label>Zip code</Form.Label>
                      <Form.Control
                        type="number"
                        name="zipCode"
                        placeholder="Zip code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.zipCode}
                        isInvalid={!!errors.zipCode}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="contry">
                      <Form.Label>Contry</Form.Label>
                      <Form.Control
                        type="text"
                        name="contry"
                        placeholder="Contry"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contry}
                        isInvalid={!!errors.contry}
                      />
                    </Form.Group>
                    </Row>
                    */}
                  <Button type="submit" onClick={handleSubmit}>
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
