import { DataStore, Auth } from "aws-amplify";
import { UserCredentials } from "../models";
import { onError } from "./errorLib";

export async function createUser() {
  try {
    const userAuth = await Auth.currentAuthenticatedUser();

    const createdUserSettings = await DataStore.save(
      new UserCredentials({
        username: userAuth.username,
        formChecked: [],
        email: userAuth.attributes.email,
        memberships: [],
        name: userAuth.attributes.name,
        activeTimeEntry: "null",
        profilePicture: "http://undefined.name",
        settings: {
          timeFormat: "",
          timeZone: "",
          dateFormat: "",
        },
        status: "ACTIVE",
        defaultWorkspace: {
          value: "value",
          label: "label",
          id: "id",
        },
      })
    );

    await Auth.updateUserAttributes(userAuth, {
      "custom:UserCreditails": createdUserSettings.id,
    });
  } catch (error) {
    onError(error);
  }
}
