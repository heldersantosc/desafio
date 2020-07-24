const axios = require("axios");

module.exports = {
  async search(req, res) {
    const { cep } = req.query;
    let CEP = {
      cep: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
    };
    if (cep.length === 8) {
      await axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(function (response) {
          const data = new Object(response.data);
          if (!data.hasOwnProperty("erro")) {
            CEP.cep = data.cep;
            CEP.logradouro = data.logradouro;
            CEP.complemento = data.complemento;
            CEP.bairro = data.bairro;
            CEP.localidade = data.localidade;
            CEP.uf = data.uf;
            res.json(CEP);
          } else {
            res.status(400).json({ error: "CEP Inválido" });
          }
        })
        .catch(function (error) {
          res.status(400).json({ error: "CEP Inválido" });
        });
    } else {
      res.status(400).json({ error: "CEP Inválido" });
    }
  },
};
