import { API, Auth, DataStore } from "aws-amplify";
import { UserCredentials, UserAgreementStatus } from "../../../models/index.js";
import { CognitoIdentityServiceProvider } from "aws-sdk";

const createUser = async (values, password) => {
  var data = {
    UserPoolId: process.env.REACT_APP_USER_POOL_ID,
    Username: values.email,
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: "custom:UserCreditails",
        Value: "null",
      },
      {
        Name: "custom:RuningTimeEntry",
        Value: "null",
      },
      {
        Name: "name",
        Value: values.first_name,
      },
      {
        Name: "family_name",
        Value: values.last_name,
      },
      {
        Name: "email",
        Value: values.email,
      },
    ],
  };

  new CognitoIdentityServiceProvider().adminCreateUser(data, async (err, data) => {
    if (err) {
      console.warn(err);
    } else {
      const { User } = data;
      const { Attributes, Username } = User;
      let first_name = Attributes.find((attr) => attr.Name === "name")?.Value;
      let last_name = Attributes.find((attr) => attr.Name === "family_name")?.Value;
      let email = Attributes.find((attr) => attr.Name === "email")?.Value;
      let email_verified = Attributes.find((attr) => attr.Name === "email_verified")?.Value;

      const newDatastore = await DataStore.save(
        new UserCredentials({
          identityId: null,
          userId: data.Username,
          activeTimeEntry: null,
          status: UserAgreementStatus.ACTIVE,
          defaultWorkspace: null,
          memberships: [],
          profile: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            email_verified: email_verified,
          },
          formChecked: [],
          settings: {},
          workcards: [],
          ownCars: [],
        })
      );

      const newParams = {
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        Username: Username,
        UserAttributes: [
          {
            Name: "custom:UserCreditails",
            Value: newDatastore.id,
          },
        ],
      };

      new CognitoIdentityServiceProvider().adminUpdateUserAttributes(newParams, (err, data) => {
        if (err) {
          console.warn(err);
        } else {
          console.log(data);
        }
      });
    }
  });
};

const enableUser = async (username, dataid) => {
  try {
    let apiName = "AdminQueries";
    let path = "/enableUser";
    let myInit = {
      body: {
        username: username,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    };

    return await API.post(apiName, path, myInit).then(async () => {
      await DataStore.query(UserCredentials, dataid).then(async (data) => {
        await DataStore.save(
          UserCredentials.copyOf(data, (updated) => {
            updated.status = "ACTIVE";
          })
        );
      });
    });
  } catch (error) {
    console.warn(error);
  }
};

const disableUser = async (username, dataid) => {
  try {
    let apiName = "AdminQueries";
    let path = "/disableUser";
    let myInit = {
      body: { username: username },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    };

    return await API.post(apiName, path, myInit).then(async () => {
      await DataStore.query(UserCredentials, dataid).then(async (data) => {
        await DataStore.save(UserCredentials.copyOf(data, (updated) => (updated.status = "DISABLED")));
      });
    });
  } catch (error) {
    console.warn(error);
  }
};

const deleteUser = async (username, dataid) => {
  try {
    const cognito = new CognitoIdentityServiceProvider();
    // Set the parameters for the AdminDeleteUser method
    const params = {
      // eslint-disable-next-line no-undef
      UserPoolId: process.env.REACT_APP_USER_POOL_ID,
      Username: username,
    };
    // Call the AdminDeleteUser method
    await cognito
      .adminDeleteUser(params)
      .promise()
      .then(async () => {
        await DataStore.query(UserCredentials, dataid).then(async (data) => {
          await DataStore.save(
            UserCredentials.copyOf(data, (updated) => {
              updated.status = "DELETED";
            })
          );
        });
      });
    console.log(`User ${username} deleted.`);
  } catch (error) {
    console.warn(error);
  }
};

export { enableUser, disableUser, deleteUser, createUser };
