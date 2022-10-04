import React, { Suspense } from "react";
import "./App.css";
import { RoutesApp } from "./routes.js";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { createTheme, ThemeProvider } from "@mui/material";
import environment from "./relay/Environment";
import { Loading } from "./components/Loading/index";
import { SnackBarProvider } from "./contexts/snackBarContext";

function HandlingError({ error, resetErrorBoundary }) {
  const navigate = useNavigate();
  const navigateTo = () => {
    navigate("../");
    navigate(0);
  };
  if (error.message.includes("You are not authenticated!"))
    return (
      <Container id="alert" component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            backgroundColor: "rgba(24, 23, 23, 0.49)",
            borderRadius: 5,
            color: "white",
          }}
        >
          <h1>Alguma coisa deu errado:</h1>
          <h2>Usuário não autenticado.</h2>
          <p>Você precisa estar logado para continuar nesta página.</p>
          <Button
            onClick={() => {
              resetErrorBoundary();
              navigateTo();
            }}
            style={{
              borderRadius: 35,
              backgroundColor: "black",
              margin: 15,
              width: 200,
            }}
            variant="contained"
          >
            Início
          </Button>
        </Box>
      </Container>
    );
}

export function App() {
  const theme = createTheme();
  return (
    <RelayEnvironmentProvider environment={environment}>
      <SnackBarProvider>
        <ThemeProvider theme={theme}>
          <ErrorBoundary FallbackComponent={HandlingError}>
            <Suspense fallback={<Loading />}>
              <RoutesApp />
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </SnackBarProvider>
    </RelayEnvironmentProvider>
  );
}
