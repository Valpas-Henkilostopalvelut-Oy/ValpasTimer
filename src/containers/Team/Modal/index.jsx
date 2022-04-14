import React, { useState } from "react";
import { Button, TextField, Box, Modal, Grid } from "@mui/material";
import { Auth, DataStore } from "aws-amplify";
import { AllWorkSpaces, UserCredentials } from "../../../models";
import { useAppContext } from "../../../services/contextLib";
import { onError } from "../../../services/errorLib";

const PopupAddUser = ({ workspaceId, groups, modalState, closeModal }) => {
  const { selectedOption } = useAppContext();
  const [userEmail, setUserEmail] = useState("");

  const handleChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleAddUser = async () => {
    if (groups.includes("Admins")) {
      const credentials = (await DataStore.query(UserCredentials)).find((u) => u.profile.email === userEmail);
      const original = await DataStore.query(AllWorkSpaces, workspaceId);
      if (groups.includes("Admins") && credentials !== undefined && original !== undefined) {
        try {
          await DataStore.save(
            AllWorkSpaces.copyOf(original, (updated) => {
              updated.memberships.push({
                hourlyRate: original.hourlyRate,
                membershipStatus: "",
                membershipType: "USER",
                userId: credentials.userId,
                targetId: original.id,
              });
            })
          );
        } catch (error) {
          onError(error);
        }
        try {
          await DataStore.save(
            UserCredentials.copyOf(credentials, (updated) => {
              updated.memberships.push({
                hourlyRate: original.hourlyRate,
                costRate: {},
                membershipStatus: "",
                membershipType: "WORKSPACE",
                userId: credentials.userId,
                targetId: selectedOption.id,
              });
            })
          );
        } catch (error) {
          onError(error);
        }
      }
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={modalState}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} noValidate autoComplete="off">
        <Grid container alignItems={"center"} spacing={1}>
          <Grid item md={10}>
            <TextField
              fullWidth
              variant="standard"
              id="outlined-name"
              label="Name"
              value={userEmail}
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={2}>
            <Button onClick={handleAddUser} variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PopupAddUser;
