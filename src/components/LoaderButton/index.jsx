import React from "react";
import { Button } from "react-bootstrap";
import LoopIcon from "@mui/icons-material/Loop";
import "./LoaderButton.css";

const LoaderButton = ({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <Button
      disabled={disabled || isLoading}
      className={`LoaderButton ${className}`}
      {...props}
    >
      {isLoading && <LoopIcon className="spinning" />}
      {props.children}
    </Button>
  );
};

export default LoaderButton;
