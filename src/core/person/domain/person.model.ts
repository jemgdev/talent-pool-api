import PersonIdGeneratorRepository from './person.id.generator.repository'

export default class Person {
  personId: string
  name: string
  lastname: string
  idType: string
  idNumber: number
  cityOfBirth: string
  age: number

  constructor (personIdGeneratorRepository: PersonIdGeneratorRepository, name: string, lastname: string, idType: string, idNumber: number, cityOfBirth: string, age: number) {
    this.personId = personIdGeneratorRepository.generatePersonId()
    this.name = name
    this.lastname = lastname
    this.idType = idType
    this.idNumber = idNumber
    this.cityOfBirth = cityOfBirth
    this.age = age
  }
}
