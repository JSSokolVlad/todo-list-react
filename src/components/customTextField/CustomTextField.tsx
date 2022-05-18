import React from "react";
import TextField from "@mui/material/TextField";
import { CustomTextFieldProps } from "./types";

const CustomTextField = React.forwardRef<
  HTMLInputElement,
  CustomTextFieldProps
>(({ error = false, multiline = false, ...props }, ref) => {
  return (
    <TextField inputRef={ref} error={error} multiline={multiline} {...props} />
  );
});

export default React.memo(CustomTextField);
