import React, { useState } from "react";
import "./Signup.css";
import "../../App.css";

import SingUpForm from "./SingUp";
import ConfirmationForm from "./ConfirmForm";
import { AppContext, useAppContext } from "../../services/contextLib";

const Signup = () => {
  const { userHasAuthenticated } = useAppContext();
  const userForm = {
    email: "",
    phoneNumber: "",
    lastName: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  };

  const [newUser, setNewUser] = useState(null);

  return (
    <div className="Signup main">
      <AppContext.Provider value={{ userForm, setNewUser, newUser, userHasAuthenticated }}>
        {newUser == null ? <SingUpForm /> : <ConfirmationForm />}
      </AppContext.Provider>
    </div>
  );
};

export default Signup;
