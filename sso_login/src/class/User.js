export default class User {
  constructor() {
    this.userType = "customer";
    this.personal = {
      name: "",
      lastName: "",
      birthDate: "",
      gender: "",
      cpf: 0,
      rg: "",
    };
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

  setUserType(value) {
    this.userType = value;
  }
  setName(value) {
    this.personal.name = value;
    this.information.name = value;
  }
  setLastName(value) {
    this.personal.lastName = value;
  }
  setBirthDate(value) {
    this.personal.birthDate = value;
  }
  setGender(value) {
    this.personal.gender = value;
  }
  setCpf(value) {
    this.personal.cpf = value;
  }
  setRg(value) {
    this.personal.rg = value;
  }
  setSocialName(value) {
    this.information.socialName = value;
  }
  setCnpj(value) {
    this.information.cnpj = value;
  }
  setStateRegistration(value) {
    this.information.stateRegistration = value;
  }
  setIdentification(value) {
    this.address.identification = value;
  }
  setRecipientFullName(value) {
    this.address.recipientFullName = value;
  }
  setCep(value) {
    this.address.cep = value;
  }
  setStreet(value) {
    this.address.street = value;
  }
  setNumber(value) {
    this.address.number = value;
  }
  setComplement(value) {
    this.address.complement = value;
  }
  setDistrict(value) {
    this.address.district = value;
  }
  setCity(value) {
    this.address.city = value;
  }
  setState(value) {
    this.address.state = value;
  }
  setReference(value) {
    this.address.reference = value;
  }
  setCellPhoneNumber(value) {
    this.contact.cellphoneNumber = value;
  }
  setPhoneNumber(value) {
    this.contact.phoneNumber = value;
  }
  setEmail(value) {
    this.account.email = value;
  }
  setPassword(value) {
    this.account.password = value;
  }

  getUserType() {
    return this.userType;
  }
  getCpf() {
    return this.personal.cpf;
  }
  getStreet() {
    return this.address.street;
  }
  getDistrict() {
    return this.address.district;
  }
  getCity() {
    return this.address.city;
  }
  getState() {
    return this.address.state;
  }
  getPassword() {
    return this.account.password;
  }
}
