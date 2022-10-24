import { Analytics, Auth } from "aws-amplify";

export const startTimer = async ({ user = "", email = "", timeStart = "", workname = "" }) => {
  await Analytics.record({ name: "Started" })
    .then((l) => {
      console.log(l);
    })
    .catch((err) => console.warn(err));
};

export const stopTimer = async () => {
  await Analytics.record({ name: "Stopped" })
    .then((l) => {
      console.log(l);
    })
    .catch((err) => console.warn(err));
};
