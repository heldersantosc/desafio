const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

module.exports = class Customer {
  constructor() {
    this.valid = false;
    this.personal = {
      name: "",
      lastName: "",
      birthDate: "",
      gender: "",
      cpf: 0,
      rg: "",
    };
    this.address = {
      identification: "",
      recipientFullName: "",
      cep: 0,
      street: "",
      number: "",
      complement: "",
      district: "",
      city: "",
      state: "",
      reference: "",
    };
    this.contact = {
      phoneNumber: "",
      cellphoneNumber: "",
    };
    this.account = {
      email: "",
      password: "",
    };
  }

  setCustomer(payload) {
    this.setValid(payload);
    this.getValid()
      ? (this.setPersonal(payload.personal),
        this.setAddress(payload.address),
        this.setContact(payload.contact),
        this.setAccount(payload.account))
      : null;
  }

  setValid(payload) {
    payload.personal.name &&
    payload.personal.lastName &&
    payload.personal.birthDate &&
    payload.personal.rg &&
    payload.address.identification &&
    payload.address.cep &&
    payload.address.street &&
    payload.address.number &&
    payload.address.complement &&
    payload.address.district &&
    payload.address.city &&
    payload.address.state &&
    payload.address.reference &&
    payload.contact.cellphoneNumber &&
    payload.account.email &&
    payload.account.password
      ? (this.valid = true)
      : (this.valid = false);
  }

  setPersonal(personal) {
    this.personal.name = personal.name;
    this.personal.lastName = personal.lastName;
    this.personal.birthDate = personal.birthDate;
    this.personal.gender = personal.gender;
    this.personal.cpf = personal.cpf;
    this.personal.rg = personal.rg;
  }
  setAddress(address) {
    this.address.identification = address.identification;
    this.address.recipientFullName = address.recipientFullName;
    this.address.cep = address.cep;
    this.address.street = address.street;
    this.address.number = address.number;
    this.address.complement = address.complement;
    this.address.district = address.district;
    this.address.city = address.city;
    this.address.state = address.state;
    this.address.reference = address.reference;
  }
  setContact(contact) {
    this.contact.cellphoneNumber = contact.cellphoneNumber;
    this.contact.phoneNumber = contact.phoneNumber;
  }
  setAccount(account) {
    const salt = bcrypt.genSaltSync(saltRounds);
    this.account.email = account.email;
    this.account.password = bcrypt.hashSync(account.password, salt);
  }

  getPersonal() {
    return this.personal;
  }
  getAddress() {
    return this.address;
  }
  getContact() {
    return this.contact;
  }
  getAccount() {
    return this.account;
  }
  getValid() {
    return this.valid;
  }
};
