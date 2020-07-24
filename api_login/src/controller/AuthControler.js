const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken(req, res, next) {
    const privateKey = process.env.PRIVATE_TOKEN;
    const authHeader = req.headers["authorization"];
    const tokenArray = authHeader.split(" ");
    const token = tokenArray[1];

    jwt.verify(token, privateKey, { algorithm: ["RS256"] }, (err, decoded) => {
      if (err)
        return res.json({
          auth: false,
          status: 401,
          message: "Não autorizado",
        });

      if (decoded) {
        req.userId = decoded.id;
        return res.json({
          auth: true,
          status: 200,
          email: decoded.email,
          message: "Acesso autorizado",
        });
      }
      next();
    });
  },
};
