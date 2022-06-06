import { DataStore, Auth } from "aws-amplify";
import { UserCredentials } from "../models";
import { onError } from "./errorLib";

export async function createUser() {
  try {
    const userAuth = await Auth.currentAuthenticatedUser();
    const userProfile = await DataStore.query(UserCredentials, userAuth.attributes["custom:UserCreditails"]);

    if (userProfile === undefined || userAuth.attributes["custom:UserCreditails"] === null) {
      const createdUserSettings = await DataStore.save(
        new UserCredentials({
          userId: userAuth.username,
          activeTimeEntry: null,
          status: "ACTIVE",
          defaultWorkspace: null,
          memberships: [],
          profile: {
            profile_picture: "http://undefined.name",
            first_name: userAuth.attributes.name,
            last_name: userAuth.attributes.family_name,
            email: userAuth.attributes.email,
          },
          formChecked: [],
          settings: {
            timeFormat: "",
            timeZone: "",
            dateFormat: "",
            modalConfirmConfirm: true,
            modalSendConfirm: true,
          },
          agreement: [],
        })
      );

      await Auth.updateUserAttributes(userAuth, {
        "custom:UserCreditails": createdUserSettings.id,
      });
    }
  } catch (error) {
    onError(error);
  }
}
