import Person from '../domain/person.model.js'

export default class PersonUseCase {
  personRepository

  constructor (personRepository) {
    this.personRepository = personRepository
  }

  async listAllPersons (age) {
    if (age) {
      return await this.personRepository.getPersonsGreaterOrEqualToAge(age)
    }

    return await this.personRepository.getAllPersons()
  }

  async getUniquePerson (personId) {
    const person = await this.personRepository.getPersonById(personId)
    return person
  }

  async getPersonByIdentification (idType, idNumber) {
    const person = await this.personRepository.getPersonByIdTypeAndIdNumber(idType, idNumber)
    return person
  }

  async savePerson ({ name, lastname, idType, idNumber, age, cityOfBirth }) {
    const person = new Person({ name, lastname, idType, idNumber, age, cityOfBirth }).getPerson()
    const personSaved = await this.personRepository.insertPerson(person)
    return personSaved
  }

  async updatePerson (personId, { name, lastname, idType, idNumber, age, cityOfBirth }) {
    const oldPerson = await this.personRepository.getPersonById(personId)

    const newPerson = {
      name: typeof name === 'undefined' ? oldPerson.name : name,
      lastname: typeof lastname === 'undefined' ? oldPerson.lastname : lastname,
      idType: typeof idType === 'undefined' ? oldPerson.idType : idType,
      idNumber: typeof idNumber === 'undefined' ? oldPerson.idNumber : idNumber,
      cityOfBirth: typeof cityOfBirth === 'undefined' ? oldPerson.cityOfBirth : cityOfBirth,
      age: typeof age === 'undefined' ? oldPerson.age : age
    }

    const personUpdated = await this.personRepository.updatePersonById(personId, newPerson)
    return personUpdated
  }

  async deletePerson (personId) {
    const personDeleted = await this.personRepository.deletePersonById(personId)
    return personDeleted
  }
}
