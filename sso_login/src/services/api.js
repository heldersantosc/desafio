const axios = require("axios");

const cep = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/"
      : "http://api-login-com-br.umbler.net/",
});

module.exports = cep;
