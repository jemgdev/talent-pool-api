import { v4 as uuid } from 'uuid'

export default class Person {
  constructor ({ name, lastname, idType, idNumber, age, cityOfBirth }) {
    this.personId = uuid()
    this.name = name
    this.lastname = lastname
    this.idType = idType
    this.idNumber = idNumber
    this.cityOfBirth = cityOfBirth
    this.age = age
  }

  getPerson () {
    return {
      personId: this.personId,
      name: this.name,
      lastname: this.lastname,
      idType: this.idType,
      idNumber: this.idNumber,
      cityOfBirth: this.cityOfBirth,
      age: this.age
    }
  }
}
