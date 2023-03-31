import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals.js";

//Custom imports
import { BrowserRouter } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { Amplify, Hub, DataStore } from "aws-amplify";
import awsconfig from "./aws-exports.js";
import { createUser } from "./services/createUser.jsx";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-west-1",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

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

Hub.listen("datastore", async (data) => {
  const { payload: event } = data;
  switch (event.event) {
    case "ready":
      console.log(event.event);
      createUser();
      break;
    default:
      break;
  }
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
