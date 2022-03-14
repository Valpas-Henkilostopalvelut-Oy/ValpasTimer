import React from "react";
import { Button, Form } from "react-bootstrap";
import { useAppContext } from "../../services/contextLib";
import "../../App.css";
import "./Settings.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFormFields } from "../../services/hooksLib";
import LoaderButton from "../../components/LoaderButton";

const Settings = () => {
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const valSchema = Yup.object().shape({
    lastName: Yup.string()
      .min(3, "*Last name must have at least 2 characters")
      .max(100, "*Last names can't be longer than 100 characters")
      .required("*Last name is required"),

    firstName: Yup.string()
      .min(3, "*First name must have at least 2 characters")
      .max(100, "*Frist names can't be longer than 100 characters")
      .required("*First names is required"),

    nickname: Yup.string()
      .min(3, "*Nickname must have at least 2 characters")
      .max(100, "*Nicknames can't be longer than 100 characters")
      .required("*Nickname is required"),

    email: Yup.string()
      .email("*Must be a valid email address")
      .max(100, "*Email must be less than 100 characters")
      .required("*Email is required"),

    phoneNumber: Yup.string()
      .matches(phoneRegExp, "*Phone number is not valid")
      .required("*Phone number required"),

    address: Yup.string()
      .min(3, "*Address must have at least 2 characters")
      .max(100, "*Addreses can't be longer than 100 characters"),
    city: Yup.string()
      .min(3, "*City must have at least 2 characters")
      .max(100, "*City can't be longer than 100 characters"),
    zipCode: Yup.string()
      .min(3, "*Zip code must have at least 3 characters")
      .max(100, "*Zip code can't be longer than 100 characters"),
    contry: Yup.string()
      .min(3, "*Contry must have at least 2 characters")
      .max(100, "*Contry can't be longer than 100 characters"),
  });

  const Avatar = () => {
    return (
      <div className="current-image">
        <div className="image-text">OK</div>
      </div>
    );
  };

  return (
    <div className="settings main container">
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
            initialValues={{
              lastName: "",
              firstName: "",
              nickname: "",
              email: "",
              phoneNumber: "",
              address: "",
              city: "",
              zipCode: "",
              contry: "",
            }}
            validationSchema={valSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 1000);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} id="settings-form">
                <Form.Group controlId="lastName">
                  <Form.Label>Last name: </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    className={
                      touched.name && errors.name ? "errorborder" : null
                    }
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="firstName">
                  <Form.Label>First name: </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    className={
                      touched.name && errors.name ? "errorborder" : null
                    }
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={
                      touched.name && errors.name ? "errorborder" : null
                    }
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="phoneNumber">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    className={
                      touched.name && errors.name ? "errorborder" : null
                    }
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    className={
                      touched.name && errors.name ? "errorborder" : null
                    }
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="zipCode">
                  <Form.Label>Zip code</Form.Label>
                  <Form.Control
                    type="number"
                    name="zipCode"
                    placeholder="Zip code"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.zipCode}
                    className={
                      touched.name && errors.name ? "errorborder" : null
                    }
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </Form.Group>

                <Form.Group controlId="contry">
                  <Form.Label>Contry</Form.Label>
                  <Form.Control
                    type="text"
                    name="contry"
                    placeholder="Contry"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contry}
                    className={
                      touched.name && errors.name ? "errorborder" : null
                    }
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ) : null}
                </Form.Group>

                <Button type="submit" disabled={isSubmitting}>
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Settings;
