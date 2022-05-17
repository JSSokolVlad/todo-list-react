import TextField from "@mui/material/TextField";
import React from "react";
import { CustomTextFieldProps } from "./types";

const CustomTextField = React.forwardRef<
  HTMLInputElement,
  CustomTextFieldProps
>(({ error = false, multipline = false, ...props }, ref) => {
  return (
    <TextField inputRef={ref} error={error} multiline={multipline} {...props} />
  );
});

export default React.memo(CustomTextField);
