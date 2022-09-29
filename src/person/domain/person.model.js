import { v4 as uuid } from 'uuid'

export default class Person {
  constructor ({ name, lastname, age, imageId }) {
    this.personId = uuid()
    this.name = name
    this.lastname = lastname
    this.age = age
    this.imageId = imageId
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
