const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

module.exports = class Enterprise {
  constructor() {
    this.valid = false;
    this.information = {
      name: "",
      socialName: "",
      cnpj: "",
      stateRegistration: "",
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

  setEnterprise(payload) {
    this.setValid(payload);
    this.getValid()
      ? (this.setInformation(payload.information),
        this.setAddress(payload.address),
        this.setContact(payload.contact),
        this.setAccount(payload.account))
      : null;
  }

  setValid(payload) {
    payload.information.name &&
    payload.information.socialName &&
    payload.information.cnpj &&
    payload.information.stateRegistration &&
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

  setInformation(information) {
    this.information.name = information.name;
    this.information.socialName = information.socialName;
    this.information.cnpj = information.cnpj;
    this.information.stateRegistration = information.stateRegistration;
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

  getInformation() {
    return this.information;
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
