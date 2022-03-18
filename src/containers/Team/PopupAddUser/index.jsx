import React from "react";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { Button, InputGroup, Form } from "react-bootstrap";
import { Auth, DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../../models";
import { useAppContext } from "../../../services/contextLib";
import { Formik } from "formik";
import { onError } from "../../../services/errorLib";

const PopupAddUser = () => {
  const { selectedOption } = useAppContext();

  return (
    <Popup trigger={<Button>add user function</Button>} modal nested>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (val) => {
          const creditails = await DataStore.query(UserCredentials);

          if (selectedOption === null) {
            alert("Workspace not selected");
            return;
          }

          if (val.email !== "") {
            let foundUser = creditails.find(
              (u) => u.profile.email === val.email
            );

            if (foundUser !== undefined) {
              let originalWorkspace = await DataStore.query(
                AllWorkSpaces,
                selectedOption.id
              );
              let originalUser = await DataStore.query(
                UserCredentials,
                foundUser.id
              );

              if (
                !originalUser.memberships.filter(
                  (u) => u.targetId === selectedOption.id
                ).length > 0
              ) {
                try {
                  await DataStore.save(
                    UserCredentials.copyOf(originalUser, (updated) => {
                      updated.memberships.push({
                        hourlyRate: originalWorkspace.hourlyRate,
                        costRate: {},
                        membershipStatus: "",
                        membershipType: "WORKSPACE",
                        userId: originalUser.id,
                        targetId: selectedOption.id,
                      });
                    })
                  );
                } catch (error) {
                  console.log(error);
                }
              }

              if (
                !originalWorkspace.memberships.filter(
                  (e) => e.userId === foundUser.id
                ).length > 0
              ) {
                try {
                  await DataStore.save(
                    AllWorkSpaces.copyOf(originalWorkspace, (updated) => {
                      updated.memberships.push({
                        hourlyRate: originalWorkspace.hourlyRate,
                        membershipStatus: "",
                        membershipType: "WORKSPACE",
                        userId: foundUser.id,
                        targetId: originalWorkspace.id,
                      });
                    })
                  );
                } catch (error) {
                  onError(error);
                }
              } else console.log();
            } else onError("User not found!");
          }
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
