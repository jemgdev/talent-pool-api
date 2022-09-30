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

  async savePerson ({ name, lastname, age, imageId }) {
    const personSaved = await this.personRepository.insertPerson({ name, lastname, age, imageId })
    return personSaved
  }

  async updatePerson (personId, { name, lastname, age, imageId }) {
    const personUpdated = await this.personRepository.updatePersonById(personId, { name, lastname, age, imageId })
    return personUpdated
  }

  async deletePerson (personId) {
    const personDeleted = await this.personRepository.deletePersonById(personId)
    return personDeleted
  }
}
