const bcrypt = require("bcrypt");

const CustomerModel = require("../model/CustomerModel");
const CustomerClass = require("../class/Customer");
const EnterpriseModel = require("../model/EnterpriseModel");
const EnterpriseClass = require("../class/Enterprise");
const generateToken = require("../utils/generateToken");

module.exports = {
  async create(req, res) {
    const userType = req.body.data.userType;
    const Customer = new CustomerClass();
    const Enterprise = new EnterpriseClass();

    switch (userType) {
      /** -> cadastro de cliente Pessoa Física */
      case "customer":
        Customer.setCustomer(req.body.data);
        Customer.getValid()
          ? await CustomerModel.create({
              customer: Customer,
              customerCpf: Customer.getPersonal().cpf,
              customerId: Customer.getAccount().email,
            })
              .then(async (result) => {
                await generateToken(req, res, {
                  email: Customer.getAccount().email,
                });
              })
              .catch((error) => {
                res.json({ error: "Já existe cadastro vinculado" });
              })
          : res.json({
              auth: false,
              error: "Existem campos obrigatórios não preenchidos",
            });
        break;

      /** -> cadastro de cliente Pessoa Jurídica */
      case "enterprise":
        Enterprise.setEnterprise(req.body.data);
        Enterprise.getValid()
          ? await EnterpriseModel.create({
              enterprise: Enterprise,
              enterpriseCnpj: Enterprise.getInformation().cnpj,
              enterpriseId: Enterprise.getAccount().email,
            })
              .then(async (result) => {
                await generateToken(req, res, {
                  email: Enterprise.getAccount().email,
                });
              })
              .catch((error) => {
                res.json({ error: "Já existe cadastro vinculado" });
                console.log(error);
              })
          : res.json({
              auth: false,
              error: "Existem campos obrigatórios não preenchidos",
            });
        break;
      default:
        res.json({ error: "Tipo de usuario inválido" });
        break;
    }
  },

  async login(req, res) {
    const userType = req.body.userType;
    const user = new Object(req.body);

    if (user.hasOwnProperty("email") && user.hasOwnProperty("password")) {
      switch (userType) {
        case "customer":
          CustomerModel.findOne({ customerId: user.email })
            .then(async (result) => {
              if (result) {
                await comparePassword(req, res, result.customer, user.password);
              } else {
                res.json({
                  auth: false,
                  status: 401,
                  error: "Usuário não cadastrado",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        case "enterprise":
          EnterpriseModel.findOne({ enterpriseId: user.email })
            .then(async (result) => {
              if (result) {
                await comparePassword(
                  req,
                  res,
                  result.enterprise,
                  user.password
                );
              } else {
                res.json({
                  auth: false,
                  error: "Usuário não cadastrado",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        default:
          res.json({ auth: false, error: "Tipo de usuario inválido" });
          break;
      }
    }
  },
};

async function comparePassword(req, res, user, password) {
  const match = await bcrypt.compare(password, user.account.password);
  if (match) {
    await generateToken(req, res, { email: user.account.email });
  } else {
    res.json({
      auth: false,
      status: 401,
      error: "Dados Incorretos",
    });
  }
}
