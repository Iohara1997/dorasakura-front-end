import React from "react";
import {
  TextField,
  outlinedInputClasses,
  inputLabelClasses,
  styled,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "white",
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "white",
    },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "white",
    },
  [`& .${outlinedInputClasses.input}`]: {
    fontFamily: "Send Flowers",
    color: "white",
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: "white",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: "white",
    },
  [`& .${inputLabelClasses.outlined}`]: {
    fontFamily: "Send Flowers",
    color: "white",
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: "white",
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "white",
  },
});

export const IconButtonCustom = (props) => {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate("../");
  };
  return (
    <IconButton
      color="primary"
      aria-label="comeback"
      size="large"
      component="label"
      onClick={navigateTo}
    >
      <ArrowBackIcon style={{ color: "black", fontSize: 50 }} />
    </IconButton>
  );
};

export const Copyright = (props) => {
  return (
    <Typography
      sx={{ mt: 4, mb: 4 }}
      variant="body2"
      color="white"
      style={{ fontFamily: "Send Flowers" }}
      align="center"
      {...props}
    >
      {"Copyright © "}
      Iohara {""}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
