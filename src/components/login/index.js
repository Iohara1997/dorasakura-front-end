import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  Box,
  Container,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Stack,
  FormControl,
  InputLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import MuiAlert from "@mui/material/Alert";
import { LoginRequest } from "../../mutations/LoginMutation";
import { useMutation } from "react-relay";
import "./index.css";
import { GC_AUTH_TOKEN, GC_USERNAME } from "../../constants";
import {
  StyledTextField,
  IconButtonCustom,
  Copyright,
} from "../componentsFields";
import { useSnack } from "../../contexts/snackBarContext";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Login() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const isLoggedIn = localStorage.getItem("email");
  const [type, setType] = useState();
  const [commit, isInFlight] = useMutation(LoginRequest);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { openSnackBar, setOpenSnackBar, showMessagesSnackBar } = useSnack();

  useEffect(() => {
    if (showMessagesSnackBar) setMessage(showMessagesSnackBar);
    if (openSnackBar) setOpen(true);
  }, [showMessagesSnackBar, openSnackBar]);

  const rememberMe = (event) => {
    remember ? setRemember(false) : setRemember(true);
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

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (remember) {
        localStorage.setItem("emailRemember", emailRef.current.value);
      }
      setLoading(true);
      commit({
        variables: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        onCompleted(data) {
          window.localStorage.setItem(GC_USERNAME, data.login.username);
          window.localStorage.setItem(GC_AUTH_TOKEN, data.login.token);
          window.localStorage.setItem("email", data.login.email);
          navigate("../home", { replace: true });
        },
        onError(error) {
          if (
            error.message.includes("Incorrect password") ||
            error.message.includes("No user with that email")
          ) {
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
      {isLoggedIn ? (
        <Navigate to={"/home"} />
      ) : (
        <>
          <IconButtonCustom />
          <Container id="login" component="main" maxWidth="xs">
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
              <PersonIcon
                sx={{
                  m: 1,
                  bgcolor: "black",
                  color: "white",
                  borderRadius: 50,
                  width: 80,
                  height: 80,
                }}
              ></PersonIcon>
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                >
                  <StyledTextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    autoComplete="e-mail"
                    autoFocus
                    inputRef={emailRef}
                    color="secondary"
                    defaultValue={
                      localStorage.getItem("emailRemember")
                        ? localStorage.getItem("emailRemember")
                        : ""
                    }
                  />
                  <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel
                      style={{
                        color: "white",
                        fontFamily: "Send Flowers",
                        fontSize: 24,
                        paddingLeft: 3,
                      }}
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
                      style={{
                        color: "white",
                        fontFamily: "Send Flowers",
                        fontSize: 24,
                      }}
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
                </Stack>
                <FormControl>
                  <FormControlLabel
                    style={{
                      margin: 0,
                      position: "relative",
                      color: "white",
                    }}
                    label=<Box
                      component="div"
                      fontSize={18}
                      style={{ fontFamily: "Send Flowers" }}
                    >
                      Lembrar-me
                    </Box>
                    control={
                      <Checkbox
                        style={{ color: "white" }}
                        name="remember"
                        checked={remember}
                        onChange={rememberMe}
                      />
                    }
                  />
                </FormControl>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={[{ mt: 3, mb: 2 }]}
                    disabled={loading}
                    style={{ width: 200, backgroundColor: "black" }}
                  >
                    Entrar
                  </Button>
                  <Grid item xs>
                    <Link
                      style={{
                        color: "white",
                        fontFamily: "Send Flowers",
                      }}
                      to="/"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </Grid>
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
      )}
    </>
  );
}
