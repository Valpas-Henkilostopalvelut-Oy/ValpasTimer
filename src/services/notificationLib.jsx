import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase.js";
import { getMessaging, getToken } from "firebase/messaging";

export const notifications = () => {
  const app = initializeApp(firebaseConfig);
  const message = getMessaging(app);

  Notification.requestPermission().then((permission) => {
    console.log("Requesting permission...");
    if (permission === "granted") {
      console.log("Notification permission granted.");
    } else {
      console.log("Unable to get permission to notify.");
    }
  });

  getToken(message, {
    vapidKey: "BAzYKv4pz8ygnCiMayhKrJM4DJfH6IRitae6ynbBvsJH4j9rWtZ3FiRrwivA40xE3XDwakZOpwWDiQk0DCv0sq4",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((err) => {
      console.warn("An error occurred while retrieving token. ", err);
    });
};
