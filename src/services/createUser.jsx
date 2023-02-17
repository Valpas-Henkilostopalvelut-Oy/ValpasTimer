import { DataStore, Auth } from "aws-amplify";
import { UserCredentials } from "../models/index.js";
import { onError } from "./errorLib.jsx";

export async function createUser() {
  try {
    const userAuth = await Auth.currentAuthenticatedUser();
    const userCredentials = await Auth.currentCredentials();
    const userProfile = await DataStore.query(UserCredentials, userAuth.attributes["custom:UserCreditails"]);

    if (userProfile === undefined || userAuth.attributes["custom:UserCreditails"] === null) {
      const createdUserSettings = await DataStore.save(
        new UserCredentials({
          userId: userAuth.username,
          activeTimeEntry: null,
          status: "ACTIVE",
          defaultWorkspace: null,
          memberships: [],
          identityId: userCredentials.identityId,
          profile: {
            iban: userAuth.attributes["custom:iban"] !== undefined ? userAuth.attributes["custom:iban"] : null,
            id_number:
              userAuth.attributes["custom:id_number"] !== undefined ? userAuth.attributes["custom:id_number"] : null,
            profile_picture: null,
            first_name: userAuth.attributes.name,
            last_name: userAuth.attributes.family_name,
            email: userAuth.attributes.email,
            email_verified: userAuth.attributes.email_verified,
            phone_number: userAuth.attributes.phone_number,
            birthdate: userAuth.attributes.birthdate !== undefined ? userAuth.attributes.birthdate : null,
            locale: userAuth.attributes.locale !== undefined ? userAuth.attributes.locale : null,
            nationality:
              userAuth.attributes["custom:nationality"] !== undefined
                ? userAuth.attributes["custom:nationality"]
                : null,
          },
          formChecked: [],
          settings: {
            timeFormat: "",
            timeZone: "",
            dateFormat: "",
            modalConfirmConfirm: true,
            modalSendConfirm: true,
          },
        })
      );

      await Auth.updateUserAttributes(userAuth, {
        "custom:UserCreditails": createdUserSettings.id,
      });
    }

    //add to old user profile identityId
    if (userProfile !== undefined && userProfile.identityId === null) {
      await DataStore.save(
        UserCredentials.copyOf(userProfile, (updated) => {
          updated.identityId = userCredentials.identityId;
        })
      );
    }
  } catch (error) {
    onError(error);
  }
}
