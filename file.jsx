import AWS from "aws-sdk";

// Configure AWS SDK with your credentials
AWS.config.update({
  region: "your-region",
  accessKeyId: "your-access-key-id",
  secretAccessKey: "your-secret-access-key",
});

// Create an instance of the AWS.CognitoIdentityServiceProvider client
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

function createUser(username, email, password) {
  // Define the parameters for the AdminCreateUser API
  const params = {
    UserPoolId: "your-user-pool-id",
    Username: username,
    DesiredDeliveryMediums: ["EMAIL"],
    ForceAliasCreation: false,
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  // Call the AdminCreateUser API
  cognitoIdentityServiceProvider.adminCreateUser(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

createUser("newuser", "newuser@example.com", "mypassword");

AWS.config.update({
  region: "your-region",
  credentials: new AWS.Credentials({
    accessKeyId: "your-access-key-id",
    secretAccessKey: "your-secret-access-key",
  }),
});

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  credentials: new AWS.Credentials({
    accessKeyId: "your-access-key-id",
    secretAccessKey: "your-secret-access-key",
  }),
});
