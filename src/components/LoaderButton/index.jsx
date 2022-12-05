import React from "react";
import { Button } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import { PropTypes } from "prop-types";

const LoaderButton = ({ isLoading, className, disabled = false, loadingText, text, ...props }) => {
  return (
    <Button disabled={disabled || isLoading} className={`LoaderButton ${className}`} {...props}>
      {isLoading && <LoopIcon className="spinning" />}
      {!isLoading ? text : loadingText}
    </Button>
  );
};

LoaderButton.propTypes = {
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  loadingText: PropTypes.string,
  text: PropTypes.string,
};

export default LoaderButton;
