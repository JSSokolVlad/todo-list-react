import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { CustomCheckboxProps } from "./types";

const CustomCheckbox: React.FC<CustomCheckboxProps> = (props) => {
  return <Checkbox {...props} />;
};

export default React.memo(CustomCheckbox);
