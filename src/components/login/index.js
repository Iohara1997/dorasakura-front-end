import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginMutation from "../../mutations/LoginMutation";
import "./index.css";
import { GC_USERNAME, GC_AUTH_TOKEN } from "../../constants";

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
      LoginMutation(
        emailRef.current.value,
        passwordRef.current.value,
        (username, token) => {
          console.log("Login!");
          localStorage.setItem(GC_USERNAME, username);
          localStorage.setItem(GC_AUTH_TOKEN, token);
        }
      );
      navigate("/home");
    } catch (error) {
      console.error(error);
      handleClick();
    }

    setLoading(false);
  };

  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-label="comeback"
        size="large"
        component="label"
        onClick={routeChange}
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
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Falha no login
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
}
