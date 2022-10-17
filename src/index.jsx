import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";

//Custom imports
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { Amplify, Hub, DataStore } from "aws-amplify";
import awsconfig from "./aws-exports";
import { createUser } from "./services/createUser.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

Amplify.configure(awsconfig);

Hub.listen("auth", async (data) => {
  const { payload: event } = data;
  switch (event.event) {
    case "signIn":
      console.log("signed in");
      await DataStore.start();
      break;
    case "signOut":
      console.log("signed out");
      await DataStore.clear();
      await DataStore.stop();
      break;
    default:
      break;
  }
});

Hub.listen("datastore", (data) => {
  const { payload: event } = data;
  switch (event.event) {
    case "ready":
      console.log("ready");
      createUser();
      break;
    default:
      break;
  }
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
