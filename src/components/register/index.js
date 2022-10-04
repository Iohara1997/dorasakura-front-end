import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Container,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import {
  IconButtonCustom,
  StyledTextField,
  Copyright,
} from "../componentsFields";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "react-relay";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { RegisterUser } from "../../mutations/RegisterUserMutation";
import { useSnack } from "../../contexts/snackBarContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Register = () => {
  const emailRef = useRef();
  const username = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState();
  const navigate = useNavigate();
  const [commit, isInFlight] = useMutation(RegisterUser);
  const { setOpenSnackBar, setMessageSnackBar } = useSnack();

  const handleSnackBar = (messageActual, typeActual) => {
    setOpen(true);
    setMessage(messageActual);
    setType(typeActual);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenSnackBar(false);
  };

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      commit({
        variables: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          username: username.current.value,
        },
        onCompleted(data) {
          setOpenSnackBar(true);
          setMessageSnackBar(
            "Usuário cadastrado com sucesso, verifique sua caixa de e-mail para confirmar."
          );
          navigate("../login", { replace: true });
        },
        onError(error) {
          if (error.message.includes("Incorrect password")) {
            handleSnackBar("Credenciais inválidas.", "error");
          } else {
            console.error(error);
            throw new Error();
          }
        },
      });
      if (isInFlight) {
        console.log(isInFlight);
      }
    } catch (error) {
      console.error(error);
      handleSnackBar("Falha interna, tente novamente.", "error");
    }
    setLoading(false);
  };

  return (
    <>
      <IconButtonCustom />
      <Container id="register" component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            backgroundColor: "rgba(24, 23, 23, 0.49)",
            borderRadius: 5,
          }}
        >
          <HowToRegIcon
            sx={{
              m: 1,
              bgcolor: "black",
              color: "white",
              borderRadius: 50,
              width: 80,
              height: 80,
            }}
          ></HowToRegIcon>
          <Box
            component="form"
            onSubmit={handleRegister}
            noValidate
            sx={{ mt: 1 }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              width={300}
            >
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="usuário"
                autoFocus
                inputRef={emailRef}
                color="secondary"
              />
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nome"
                name="username"
                autoComplete="Nome"
                autoFocus
                inputRef={username}
                color="secondary"
              />
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <InputLabel
                  style={{ color: "white", fontFamily: "Send Flowers" }}
                  htmlFor="outlined-adornment-password"
                  required
                >
                  Senha
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  inputRef={passwordRef}
                  color="secondary"
                  style={{ color: "white", fontFamily: "Send Flowers" }}
                  sx={[
                    {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                    },
                  ]}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        style={{ color: "white" }}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={[{ mt: 3, mb: 2 }]}
                disabled={loading}
                style={{ width: 200, backgroundColor: "black" }}
              >
                Criar conta
              </Button>
            </Stack>
          </Box>
          <Copyright />
        </Box>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
