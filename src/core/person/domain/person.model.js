import { v4 as uuid } from 'uuid'

export default class Person {
  constructor ({ name, lastname, age }) {
    this.personId = uuid()
    this.name = name
    this.lastname = lastname
    this.age = age
  }

  getPerson () {
    return {
      personId: this.personId,
      name: this.name,
      lastname: this.lastname,
      age: this.age
    }
  }
}
