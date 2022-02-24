import { DataStore, Auth } from "aws-amplify";
import { UserCredentials } from "../models";
import { onError } from "./errorLib";

export async function createUser() {
  try {
    const userAuth = await Auth.currentAuthenticatedUser();

    await DataStore.save(
      new UserCredentials({
        username: userAuth.username,
        formChecked: [],
        email: userAuth.attributes.email,
        memberships: [],
        name: userAuth.attributes.name,
        activeTimeEntry: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
        profilePicture: "http://undefined.name",
        settings: {
          timeFormat: "",
          timeZone: "",
          dateFormat: "",
        },
        status: "ACTIVE",
        defaultWorkspace: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
      })
    );
  } catch (error) {
    onError(error);
  }
}
