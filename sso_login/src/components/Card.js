import React from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

const Card = (props) => {
  const history = useHistory();
  const token = sessionStorage.getItem("x-token");
  const path = props.path;

  /** funcao para redirecionar pra uma pagina*/
  function redirect() {
    sessionStorage.setItem("path", path);
    history.push("/sso");
  }

  /** funcao para fazer logout automatico */
  function logout() {
    sessionStorage.setItem("path", path);
    sessionStorage.removeItem("x-token");
    sessionStorage.removeItem("email");
    history.push("/sso");
  }

  /** funcão para verificar o login */
  function handleSingleSignOn() {
    sessionStorage.setItem("path", path);
    if (token === null) {
      history.push("/sso");
    } else {
      history.push(`/${path}`);
      api
        .post(
          `/auth`,
          {},
          {
            headers: {
              authorization: token,
            },
          }
        )
        .then((result) => {
          result.data.auth === true ? redirect() : logout();
        })
        .catch((error) => {
          history.push("/");
        });
    }
  }

  return (
    <div className="card text-center mt-1 mb-1" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <button
          className="btn btn-primary"
          onClick={() => handleSingleSignOn()}
        >
          Acessar
        </button>
      </div>
    </div>
  );
};

export default Card;
