import React from "react";
import "./index.css";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";

export const Register = () => {
  return (
    <FormControl>
      <InputLabel htmlFor="my-input">Email address</InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text" />
      <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText>
    </FormControl>
  );
};
