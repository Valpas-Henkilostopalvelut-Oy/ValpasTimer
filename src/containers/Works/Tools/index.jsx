import { DataStore } from "aws-amplify";
import { Tasks } from "../../../models/index.js";

export const deleteTask = async ({ id }) => {
  await DataStore.query(Tasks, id)
    .then((data) => {
      DataStore.delete(data);
    })
    .catch((e) => console.warn(e));
};
