import { Button } from "@mui/material";
import React from "react";

const CreateButton = ({
  startIcon = "",
  endIcon = "",
  children = "",
  style = {},
  color = "",
  className = "",
  variant = "",
  sx = {},
  onClick,
  type,
  disabled,
}) => {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      className={className}
      style={style}
      sx={sx}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CreateButton;
