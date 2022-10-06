import { v4 as uuid } from 'uuid'
import IPerson from './person.interface'

export default class Person implements IPerson {
  personId: string
  name: string
  lastname: string
  idType: string
  idNumber: number
  cityOfBirth: string
  age: number

  constructor (name: string, lastname: string, idType: string, idNumber: number, cityOfBirth: string, age: number) {
    this.personId = uuid()
    this.name = name
    this.lastname = lastname
    this.idType = idType
    this.idNumber = idNumber
    this.cityOfBirth = cityOfBirth
    this.age = age
  }
}
