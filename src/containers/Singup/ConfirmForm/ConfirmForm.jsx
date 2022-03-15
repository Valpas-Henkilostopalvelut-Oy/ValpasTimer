import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap"
import { Formik } from "formik";
import LoaderButton from "../../../components/LoaderButton";
import { useAppContext } from "../../../services/contextLib";
import { Auth } from "aws-amplify";
import { createUser } from "../../../services/createUser";
import { onError } from "../../../services/errorLib";
import { useNavigate } from "react-router-dom";

const ConfirmationForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { userForm, userHasAuthenticated, newUser } = useAppContext()
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{
                confirmationCode: ""
            }}
            onSubmit={async (values) => {
                setIsLoading(true);

                try {
                    await Auth.confirmSignUp(newUser.email, values.confirmationCode);
                    await Auth.signIn(newUser.email, newUser.password);
                    createUser();

                    userHasAuthenticated(true);
                    navigate("");
                } catch (e) {
                    onError(e);
                    setIsLoading(false);
                }
            }}>
            {({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting, }) => (
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="confirmationCode" size="lg">
                            <Form.Label>Confirmation Code</Form.Label>
                            <Form.Control
                                autoFocus
                                type="tel"
                                onChange={handleChange}
                                value={values.confirmationCode}
                            />
                            <Form.Text muted>Please check your email for the code.</Form.Text>
                        </Form.Group>
                    </Row>
                    <LoaderButton
                        size="lg"
                        type="submit"
                        variant="success"
                        isLoading={isLoading}
                        disabled={false}
                    >
                        Verify
                    </LoaderButton>
                </Form>
            )}
        </Formik>
    )
};

export default ConfirmationForm