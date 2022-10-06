import Person from '../domain/person.model'
import PersonRepository from '../domain/person.repository'

export default class PersonUseCase {
  personRepository: PersonRepository

  constructor (personRepository: PersonRepository) {
    this.personRepository = personRepository
  }

  async listAllPersons (age: number) {
    if (age) {
      return await this.personRepository.getPersonsGreaterOrEqualToAge(age)
    }

    return await this.personRepository.getAllPersons()
  }

  async getUniquePerson (personId: string) {
    const person = await this.personRepository.getPersonById(personId)
    return person
  }

  async getPersonByIdentification (idType: string, idNumber: number) {
    const person = await this.personRepository.getPersonByIdTypeAndIdNumber(idType, idNumber)
    return person
  }

  async savePerson (name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string ) {
    const person = new Person(name, lastname, idType, idNumber, cityOfBirth, age)
    const personSaved = await this.personRepository.insertPerson(person)
    return personSaved
  }

  async updatePerson (personId: string, person: { name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string }) {
    const oldPerson = await this.personRepository.getPersonById(personId)

    if (!oldPerson) {
      return { message: 'This person not exists' }
    }

    const newPerson = {
      name: typeof person.name === 'undefined' ? oldPerson.name : person.name,
      lastname: typeof person.lastname === 'undefined' ? oldPerson.lastname : person.lastname,
      idType: typeof person.idType === 'undefined' ? oldPerson.idType : person.idType,
      idNumber: typeof person.idNumber === 'undefined' ? oldPerson.idNumber : person.idNumber,
      cityOfBirth: typeof person.cityOfBirth === 'undefined' ? oldPerson.cityOfBirth : person.cityOfBirth,
      age: typeof person.age === 'undefined' ? oldPerson.age : person.age
    }

    const personUpdated = await this.personRepository.updatePersonById(personId, newPerson)
    return personUpdated
  }

  async deletePerson (personId: string) {
    const personDeleted = await this.personRepository.deletePersonById(personId)
    return personDeleted
  }
}
