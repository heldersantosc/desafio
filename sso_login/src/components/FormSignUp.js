import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import UserClass from "../class/User";
import api from "../services/api";
import loading from "../assets/loading.svg";
let User = new UserClass();

const FormSignUp = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [userType, setUserType] = useState("customer");
  const [address, setAddress] = useState({});
  const [matchPassword, setMatchPassword] = useState({ error: "" });
  const [cpf, setCpf] = useState({});
  const [cnpj, setCnpj] = useState({});
  const [created, setCreated] = useState({ error: "" });
  const [cepVisible, setCepVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);

  function handleUserType(target) {
    User = new UserClass();
    User.setUserType(target.value);
    setUserType(target.value);
  }
  function handlePersonal(target) {
    const id = target.id;
    const value = target.value;
    switch (id) {
      case "name":
        User.setName(value);
        break;
      case "lastName":
        User.setLastName(value);
        break;
      case "birthDate":
        User.setBirthDate(value);
        break;
      case "gender":
        User.setGender(value);
        break;
      case "cpf":
        if (value.length < 11) {
          setCpf({ error: "CPF Incompleto" });
        } else if (value.length > 11) {
          setCpf({ error: "CPF Inválido" });
        } else {
          setCpf({});
          User.setCpf(value.slice(0, 11));
        }
        break;
      case "rg":
        User.setRg(value);
        break;
      default:
        break;
    }
  }
  function handleInformation(target) {
    const id = target.id;
    const value = target.value;
    switch (id) {
      case "name":
        User.setName(value);
        break;
      case "socialName":
        User.setSocialName(value);
        break;
      case "cnpj":
        if (value.length < 14) {
          setCnpj({ error: "CNPJ Incompleto" });
        } else if (value.length > 14) {
          setCnpj({ error: "CNPJ Inválido" });
        } else {
          setCnpj({});
          User.setCnpj(value.slice(0, 14));
        }
        break;
      case "stateRegistration":
        User.setStateRegistration(value);
        break;
      default:
        break;
    }
  }
  function handleAddress(target) {
    const id = target.id;
    const value = target.value;
    switch (id) {
      case "identification":
        User.setIdentification(value);
        break;
      case "recipientFullName":
        User.setRecipientFullName(value);
        break;
      case "cep":
        if (value.length === 8) {
          setCepVisible(true);
          api
            .post(`/search-cep?cep=${value}`)
            .then((result) => {
              User.setCep(result.data.cep);
              User.setStreet(result.data.logradouro);
              User.setDistrict(result.data.bairro);
              User.setCity(result.data.localidade);
              User.setState(result.data.uf);
              setAddress(result.data);
              setCepVisible(false);
            })
            .catch((error) => {
              setCepVisible(false);
              setAddress({ error: "CEP Inválido" });
            });
        } else {
          User.setStreet("");
          User.setDistrict("");
          User.setCity("");
          User.setState("");
          setAddress({});
        }
        break;
      case "number":
        User.setNumber(value);
        break;
      case "complement":
        User.setComplement(value);
        break;
      case "reference":
        User.setReference(value);
        break;
      default:
        break;
    }
  }
  function handleContact(target) {
    const id = target.id;
    const value = target.value;
    switch (id) {
      case "cellPhoneNumber":
        User.setCellPhoneNumber(value);
        break;
      case "phoneNumber":
        User.setPhoneNumber(value);
        break;
      default:
        break;
    }
  }
  function handleAccount(target) {
    const id = target.id;
    const value = target.value;
    switch (id) {
      case "email":
        User.setEmail(value);
        break;
      case "password":
        User.setPassword(value);
        setMatchPassword({ error: "Senhas diferentes" });
        break;
      case "repeatPassword":
        checkPassword(value);
        break;
      default:
        break;
    }
  }
  function checkPassword(value) {
    if (User.getPassword() === value && value !== "") {
      setMatchPassword({ error: "" });
    } else {
      setMatchPassword({ error: "Senhas diferentes" });
    }
  }
  function createUser(event) {
    event.preventDefault();
    if (matchPassword.error === "") {
      setCreateVisible(true);
      api
        .post(`/create-${userType}`, { data: User })
        .then((result) => {
          if (result.data.auth) {
            setCreated({ error: "" });
            sessionStorage.setItem("x-token", result.data.token);
            sessionStorage.setItem("email", result.data.user.email);
            User = new UserClass();
            history.push("/");
          } else {
            setCreated({ error: result.data.error });
            setCreateVisible(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    if (userType === "enterprise") {
      User.setUserType("enterprise");
      setCategories(["Informações", "Endereço", "Contato", "Conta"]);
    } else {
      User.setUserType("customer");
      setCategories(["Pessoais", "Endereço", "Contato", "Conta"]);
    }
  }, [userType, address]);

  return (
    <>
      <div className="p-4" id="form">
        <header className="form-row">
          <h3>Dados Cadastrais</h3>
        </header>
        <div className="form-row justify-content-center m-4">
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
        <h4>{categories[0]}</h4>
        {User.userType === "customer" ? (
          <>
            <div className="form-group">
              <label htmlFor="name">*Nome</label>
              <input
                type="name"
                className="form-control"
                id="name"
                required
                autoComplete="nope"
                onChange={(event) => {
                  handlePersonal(event.target);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">*Sobrenome</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                autoComplete="nope"
                onChange={(event) => {
                  handlePersonal(event.target);
                }}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="birthDate">*Data de Nascimento</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthDate"
                  required
                  onChange={(event) => {
                    handlePersonal(event.target);
                  }}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="gender">Sexo</label>
                <select
                  className="form-control"
                  id="gender"
                  onChange={(event) => {
                    handlePersonal(event.target);
                  }}
                >
                  <option>Selecione</option>
                  <option>Feminino</option>
                  <option>Masculino</option>
                  <option>Indefinido</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="cpf">*CPF</label>
                <input
                  type="number"
                  className="form-control"
                  id="cpf"
                  required
                  min={1}
                  max={99999999999}
                  autoComplete="nope"
                  onChange={(event) => {
                    handlePersonal(event.target);
                  }}
                />
                {cpf.error ? (
                  <div className="alert alert-danger mt-1" role="alert">
                    {cpf.error}
                  </div>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="rg">*RG</label>
                <input
                  type="text"
                  className="form-control"
                  id="rg"
                  required
                  autoComplete="nope"
                  onChange={(event) => {
                    handlePersonal(event.target);
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="name">*Nome</label>
              <input
                type="name"
                className="form-control"
                id="name"
                required
                autoComplete="nope"
                onChange={(event) => {
                  handleInformation(event.target);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="socialName">*Razão Social</label>
              <input
                type="socialName"
                className="form-control"
                id="socialName"
                required
                autoComplete="nope"
                onChange={(event) => {
                  handleInformation(event.target);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cnpj">*CNPJ</label>
              <input
                type="cnpj"
                className="form-control"
                id="cnpj"
                required
                maxLength={14}
                autoComplete="nope"
                onChange={(event) => {
                  handleInformation(event.target);
                }}
              />
              {cnpj.error ? (
                <div className="alert alert-danger mt-1" role="alert">
                  {cnpj.error}
                </div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="stateRegistration">*Inscrição Estadual</label>
              <input
                type="stateRegistration"
                className="form-control"
                id="stateRegistration"
                required
                autoComplete="nope"
                onChange={(event) => {
                  handleInformation(event.target);
                }}
              />
            </div>
          </>
        )}
        <hr />
        <h4>{categories[1]}</h4>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="identification">*Identificação</label>
            <input
              type="text"
              className="form-control"
              id="identification"
              required
              autoComplete="nope"
              onChange={(event) => handleAddress(event.target)}
            />
            <small>ex: Escritório, Casa, etc.</small>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="recipientFullName">
              Nome e Sobrenome do destinatário
            </label>
            <input
              type="text"
              className="form-control"
              id="recipientFullName"
              autoComplete="nope"
              onChange={(event) => handleAddress(event.target)}
            />
            <small>Informar o nome e o sobrenome do destinatário</small>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="cep">*CEP</label>
            <input
              type="number"
              className="form-control"
              id="cep"
              name="cep"
              required
              min={0}
              placeholder="Digite o número do seu CEP"
              autoComplete="nope"
              onChange={(event) => handleAddress(event.target)}
            />
            {cepVisible ? (
              <>
                <img src={loading} height="35" alt="" />
                <small>Pesquisando CEP</small>
              </>
            ) : null}
            {address.error ? (
              <div className="alert alert-danger mt-1" role="alert">
                {address.error}
              </div>
            ) : null}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="street">*Endereço</label>
            <input
              type="text"
              className="form-control"
              id="street"
              required
              readOnly
              defaultValue={User.getStreet()}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="number">*Número</label>
            <input
              type="text"
              className="form-control"
              id="number"
              required
              autoComplete="nope"
              onChange={(event) => handleAddress(event.target)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="complement">*Complemento</label>
            <input
              type="text"
              className="form-control"
              id="complement"
              required
              autoComplete="nope"
              onChange={(event) => handleAddress(event.target)}
            />
            <small>
              Informar, por exemplo, o número do apto, bloco, sítio, etc.
            </small>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="district">*Bairro</label>
            <input
              type="text"
              className="form-control"
              id="district"
              required
              readOnly
              defaultValue={User.getDistrict()}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="city">*Cidade</label>
            <input
              type="text"
              className="form-control"
              id="city"
              required
              readOnly
              defaultValue={User.getCity()}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="state">*Estado</label>
            <input
              type="text"
              className="form-control"
              id="state"
              required
              readOnly
              defaultValue={User.getState()}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="reference">*Referência</label>
            <input
              type="text"
              className="form-control"
              id="reference"
              required
              autoComplete="nope"
              onChange={(event) => handleAddress(event.target)}
            />
            <small>
              Informar local próximo, por exemplo, um mercadinho, igreja, rua
              principal, etc.
            </small>
          </div>
        </div>
        <hr />
        <h4>{categories[2]}</h4>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="cellPhoneNumber">*Numero de Celular</label>
            <input
              type="text"
              className="form-control"
              id="cellPhoneNumber"
              required
              autoComplete="nope"
              maxLength="20"
              onChange={(event) => {
                handleContact(event.target);
              }}
            />
            <small>Ex: DDD + Telefone</small>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phoneNumber">Numero de Telefone Fixo</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              maxLength="20"
              autoComplete="nope"
              onChange={(event) => handleContact(event.target)}
            />
            <small>Ex: DDD + Telefone</small>
          </div>
        </div>
        <hr />
        <h4>{categories[3]}</h4>
        <div className="form-group">
          <label htmlFor="email">*Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            autoComplete="nope"
            onChange={(event) => handleAccount(event.target)}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="password">*Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              onChange={(event) => handleAccount(event.target)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="repeatPassword">*Repita a Senha</label>
            <input
              type="password"
              className="form-control"
              id="repeatPassword"
              required
              onChange={(event) => handleAccount(event.target)}
            />
            {matchPassword.error !== "" ? (
              <div className="alert alert-danger mt-1" role="alert">
                {matchPassword.error}
              </div>
            ) : null}
          </div>
        </div>

        {created.error !== "" && created.error !== undefined ? (
          <div
            className="alert alert-danger"
            style={{ position: "fixed", right: 10, bottom: 10 }}
            role="alert"
          >
            {created.error}
          </div>
        ) : null}

        <button
          className="btn btn-primary"
          onClick={(event) => {
            createUser(event);
          }}
        >
          Criar conta
        </button>
        {createVisible ? (
          <>
            <img src={loading} height="35" alt="" />
            <small>Criando conta</small>
          </>
        ) : null}
      </div>
    </>
  );
};

export default FormSignUp;
