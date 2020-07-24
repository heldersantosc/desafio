import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const [email, setEmail] = useState(sessionStorage.getItem("email"));
  const history = useHistory();

  /** funcão de logout */
  function handleLogout(params) {
    sessionStorage.removeItem("x-token");
    sessionStorage.removeItem("email");
    history.push("/");
    document.location.reload(true);
  }

  useEffect(() => {
    setEmail(sessionStorage.getItem("email"));
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="collapse navbar-collapse d-flex justify-content-end text-white">
        <div className="pt-2">
          <h6 className="mr-3">{email ? email : ""}</h6>
        </div>
        {email ? (
          <button
            className="btn btn-danger my-2 my-sm-0 pl-4 pr-4"
            type="submit"
            onClick={() => handleLogout()}
          >
            Sair
          </button>
        ) : (
          <>
            <button
              className="btn btn-light my-2 my-sm-0 pl-4 pr-4 ml-2 mr-2"
              type="submit"
              onClick={() => history.push("/sso")}
            >
              Entrar
            </button>
            <button
              className="btn btn-warning my-2 my-sm-0 pl-4 pr-4"
              type="submit"
              onClick={() => history.push("/signup")}
            >
              Criar conta
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
