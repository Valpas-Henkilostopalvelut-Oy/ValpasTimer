import React from "react";
import { Button } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";

const LoaderButton = ({ isLoading, className = "", disabled = false, loadingText, text, ...props }) => {
  return (
    <Button disabled={disabled || isLoading} className={`LoaderButton ${className}`} {...props}>
      {isLoading && <LoopIcon className="spinning" />}
      {!isLoading ? text : loadingText}
    </Button>
  );
};

export default LoaderButton;
