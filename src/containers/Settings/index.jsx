import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onError } from "../../services/errorLib";
import { DataStore, Auth } from "aws-amplify";
import { Button } from "react-bootstrap";
import { UserCredentials } from "../../models";

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="Settings">
      <Button
        onClick={async () => console.log(await Auth.currentAuthenticatedUser())}
      >
        Log
      </Button>
    </div>
  );
};

export default Settings;
