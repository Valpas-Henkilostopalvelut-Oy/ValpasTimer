import { DataStore, Auth } from "aws-amplify";
import { UserCredentials } from "../models";
import { onError } from "./errorLib";

export async function createUser() {
  try {
    const userAuth = await Auth.currentAuthenticatedUser();

    const createdUserSettings = await DataStore.save(
      new UserCredentials({
        "formChecked": [],
        "activeTimeEntry": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
        "status": "Lorem ipsum dolor sit amet",
        defaultWorkspace: {
          value: "value",
          label: "label",
          id: "id",
        },
        "memberships": [],
        "profile": {
          profile_picture: "http://undefined.name",
          first_name: userAuth.attributes.name,
          last_name: userAuth.attributes.last_name,
          username: userAuth.attributes.username,
          phone_number: userAuth.attributes.phone_number,
          address: null,
          zip_code: 0,
          contry: null,
          email: userAuth.attributes.email
        }
      })
    );

    await Auth.updateUserAttributes(userAuth, {
      "custom:UserCreditails": createdUserSettings.id,
    });
  } catch (error) {
    onError(error);
  }
}
