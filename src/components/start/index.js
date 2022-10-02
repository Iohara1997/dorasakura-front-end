import React from "react";
// import { Link } from "react-router-dom";
import "./index.css";
import line from "./images/line.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Start = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  };
  return (
    <>
      <div className="content">
        <h1>Seus doramas juntos aqui!</h1>
        <div className="subTitle">
          Adicione quantos doramas quiser em um só lugar para que possa
          acompanhá-los!
        </div>
        <Button
          style={{
            borderRadius: 35,
            backgroundColor: "black",
            margin: 15,
            width: 200,
          }}
          variant="contained"
        >
          Criar conta
        </Button>
        <Button
          style={{
            borderRadius: 35,
            border: "solid",
            marginBottom: 15,
            width: 200,
            color: "black",
          }}
          variant="outlined"
          onClick={routeChange}
        >
          Entrar
        </Button>
        <img src={line} alt="Line" />
      </div>
      <footer>
        <span className="footer">
          © {new Date().getFullYear()} Desenvolvido por Iohara
        </span>
      </footer>
    </>
  );
};
