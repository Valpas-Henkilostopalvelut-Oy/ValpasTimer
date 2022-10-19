import { Analytics, Auth } from "aws-amplify";

const mapObj = (f) => (obj) => Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: f(obj[key]) }), {});
const toArrayOfStrings = (value) => [`${value}`];
const mapToArrayOfStrings = mapObj(toArrayOfStrings);

export const startTimer = async () => {
  const { attributes } = await Auth.currentAuthenticatedUser();
  const userAttributes = mapToArrayOfStrings(attributes);
  Analytics.record({
    name: "startTimer",
  });
};
