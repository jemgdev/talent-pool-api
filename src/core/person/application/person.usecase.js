import Person from '../domain/person.model.js'

export default class PersonUseCase {
  personRepository

  constructor (personRepository) {
    this.personRepository = personRepository
  }

  async listAllPersons () {
    const persons = await this.personRepository.getAllPersons()
    return persons
  }

  async getUniquePerson (personId) {
    const person = await this.personRepository.getPersonById(personId)
    return person
  }

  async savePerson ({ name, lastname, age }) {
    const person = new Person({ name, lastname, age }).getPerson()

    const personSaved = await this.personRepository.insertPerson(person)
    return personSaved
  }

  async updatePerson (personId, { name, lastname, age }) {
    const oldPerson = await this.personRepository.getPersonById(personId)

    const newPerson = {
      name: typeof name === 'undefined' ? oldPerson.name : name,
      lastname: typeof lastname === 'undefined' ? oldPerson.lastname : lastname,
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
