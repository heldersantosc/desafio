import React from "react";
import { useHistory } from "react-router-dom";

import FormSignUp from "../components/FormSignUp";

const SignUp = () => {
  const history = useHistory();
  return (
    <div className="container h-100 p-4">
      <div className="jumbotron shadow-lg pt-1 bg-light">
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => history.push("/")}
        >
          Voltar
        </button>
        <FormSignUp />
      </div>
    </div>
  );
};

export default SignUp;
