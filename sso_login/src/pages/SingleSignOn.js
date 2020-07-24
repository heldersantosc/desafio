import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import api from "../services/api";
import loading from "../assets/loading.svg";

const SingleSignOn = (props) => {
  const history = useHistory();
  const token = sessionStorage.getItem("x-token");
  const [userType, setUserType] = useState("customer");
  const [logged, setLogged] = useState({ error: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  /** captura a opção pessoa fisica ou juridica */
  function handleUserType(target) {
    setUserType(target.value);
  }
  /** captura o email digitada */
  function handleEmail(target) {
    setEmail(target.value);
  }
  /** captura a senha digitada */
  function handlePassword(target) {
    setPassword(target.value);
  }
  /** manipula o token e redireciona a página  */
  function handleToken(token, email) {
    const path =
      sessionStorage.getItem("path") === null
        ? ""
        : sessionStorage.getItem("path");
    if (token && email) {
      history.push(`/${path}`);
      sessionStorage.setItem("x-token", token);
      sessionStorage.setItem("email", email);
    } else {
      sessionStorage.removeItem("x-token");
      sessionStorage.removeItem("email");
    }
  }

  /** função pra fazer o login */
  function handleLogin(event) {
    setVisible(true);
    event.preventDefault();
    api
      .post(`/login`, {
        userType: userType,
        email: email,
        password: password,
      })
      .then((result) => {
        if (result.data.error) {
          setLogged({ error: result.data.error });
          handleToken("");
          setVisible(false);
        } else {
          setLogged({ error: "" });
          handleToken(result.data.token, result.data.user.email);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    /** função executada quando a pagina é acessada */
    function handleSingleSignOn() {
      if (token === null) {
        history.push("/sso");
      } else {
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
            result.data.auth === true
              ? handleToken(token, result.data.email)
              : history.push("/sso");
          })
          .catch((error) => {
            history.push("/");
          });
      }
    }
    handleSingleSignOn();
  }, [token, history]);
  return (
    <div
      className="container p-3"
      style={{ visibility: token ? "hidden" : "visible" }}
    >
      <div className="jumbotron shadow-lg d-flex justify-content-center flex-wrap">
        <div className=" w-75">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => history.push("/")}
          >
            Voltar
          </button>
        </div>
        <div className="card w-75 m-1">
          <div className="card-header">
            <h5>Já tem cadastro?</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="form-row justify-content-center m-2">
                <div className="form-check mr-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radios"
                    id="userType1"
                    value="customer"
                    defaultChecked
                    onChange={(event) => handleUserType(event.target)}
                  />
                  <label className="form-check-label" htmlFor="userType1">
                    Pessoa Física
                  </label>
                </div>
                <div className="form-check ml-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radios"
                    id="userType2"
                    value="enterprise"
                    onChange={(event) => handleUserType(event.target)}
                  />
                  <label className="form-check-label" htmlFor="userType2">
                    Pessoa Jurídica
                  </label>
                </div>
              </div>
              <small id="emailHelp" className="form-text text-muted">
                Preencha seus dados para acessar sua conta
              </small>
              <div className="form-group mt-2">
                <label htmlFor="email">*Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  onChange={(event) => handleEmail(event.target)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">*Senha</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(event) => handlePassword(event.target)}
                />
              </div>
              {logged.error !== "" ? (
                <div
                  className="alert alert-danger"
                  style={{ position: "relative", left: "auto" }}
                  role="alert"
                >
                  {logged.error}
                </div>
              ) : null}

              <div className="d-flex justify-content-end">
                {visible ? <img src={loading} height="35" alt="" /> : null}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(event) => handleLogin(event)}
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card w-75 mt-4">
          <div className="card-header">
            <h5>Não tem cadastro?</h5>
          </div>
          <div className="card-body d-flex justify-content-center">
            <Link to="/signup" type="submit" className="btn btn-primary">
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSignOn;
