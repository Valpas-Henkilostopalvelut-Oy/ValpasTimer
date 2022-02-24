import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { onError } from "../../services/errorLib";
import { DataStore } from "aws-amplify";
import { Button } from "react-bootstrap";
import { UserCredentials } from "../../models";

const Settings = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="Settings">
      <Button
        onClick={async () => console.log(await DataStore.query(UserCredentials))}
      >
        Log
      </Button>
    </div>
  );
};

export default Settings;
