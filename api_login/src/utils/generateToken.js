const jwt = require("jsonwebtoken");

const generateToken = async (req, res, info) => {
  const privateKey = process.env.PRIVATE_TOKEN;
  const tokenExpires = process.env.TOKEN_EXPIRES;
  const token = jwt.sign({ email: info.email }, privateKey, {
    expiresIn: tokenExpires,
  });

  /** retorna o token de acesso */
  return res.status(200).send({
    auth: true,
    user: { email: info.email },
    token: `Bearer ${token}`,
  });
};

module.exports = generateToken;
