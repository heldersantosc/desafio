import React from "react";
import { useHistory } from "react-router-dom";

import Navbar from "../components/Navbar";

const Bob = () => {
  const history = useHistory();
  return (
    <>
      <Navbar />
      <div className="container h-100 p-4">
        <div className="jumbotron shadow-lg pt-4 bg-light">
          <h4>Bob</h4>
          <button
            type="button"
            className="btn btn-primary mt-5"
            onClick={() => history.push("/")}
          >
            Voltar
          </button>
        </div>
      </div>
    </>
  );
};

export default Bob;
