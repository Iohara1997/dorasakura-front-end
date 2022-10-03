import * as React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  createTheme,
  ThemeProvider,
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
  outlinedInputClasses,
  inputLabelClasses,
  styled,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoginRequest } from "../../mutations/LoginMutation";
import { useMutation } from "react-relay";
import "./index.css";
import { GC_AUTH_TOKEN, GC_USERNAME } from "../../constants";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTextField = styled(TextField)({
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

function Copyright(props) {
  return (
    <Typography
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
}

export function Login() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const theme = createTheme();
  const [remember, setRemember] = useState(false);
  const isLoggedIn = localStorage.getItem("email");
  const [commit, isInFlight] = useMutation(LoginRequest);

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

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      if (remember) localStorage.setItem("email", emailRef.current.value);
      setLoading(true);
      // eslint-disable-next-line react-hooks/rules-of-hooks
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
      });
      if (isInFlight) {
        console.log(isInFlight);
      }
    } catch (error) {
      console.error(error);
      handleClick();
    }
    setLoading(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Navigate to={"/home"} />
      ) : (
        <>
          <IconButton
            color="primary"
            aria-label="comeback"
            size="large"
            component="label"
          >
            <ArrowBackIcon style={{ color: "black", fontSize: 50 }} />
          </IconButton>
          <ThemeProvider theme={theme}>
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
                <Avatar
                  src="/images/user.png"
                  sx={{ m: 1, bgcolor: "black", width: 80, height: 80 }}
                ></Avatar>
                <Box
                  component="form"
                  onSubmit={handleLogin}
                  noValidate
                  sx={{ mt: 1 }}
                >
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
                      label="Usuário"
                      name="email"
                      autoComplete="usuário"
                      autoFocus
                      inputRef={emailRef}
                      color="secondary"
                      defaultValue={
                        localStorage.getItem("email")
                          ? localStorage.getItem("email")
                          : ""
                      }
                    />
                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                      <InputLabel
                        style={{ color: "white", fontFamily: "Send Flowers" }}
                        htmlFor="outlined-adornment-password"
                      >
                        Senha *
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
                        to="/recuperar-senha"
                      >
                        Esqueceu sua senha?
                      </Link>
                    </Grid>
                  </Stack>
                </Box>
                <Copyright sx={{ mt: 4, mb: 4 }} />
              </Box>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Falha no login
              </Alert>
            </Snackbar>
          </ThemeProvider>
        </>
      )}
    </>
  );
}
