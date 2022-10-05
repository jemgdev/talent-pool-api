/**
 * @class PersonRepository
 */

export default class PersonRepository {
  constructor () {
    if (this.constructor === PersonRepository) {
      throw new Error("Abstract classes can't be instantiated.")
    }
  }

  getAllPersons () {
    throw new Error("Method 'getAllPersons()' must be implemented.")
  }

  getPersonById (personId) {
    throw new Error("Method 'getPersonById()' must be implemented.")
  }

  getPersonByIdTypeAndIdNumber (idType, idNumber) {
    throw new Error("Method 'getPersonByIdTypeAndIdNumber()' must be implemented.")
  }

  getPersonsGreaterOrEqualToAge (age) {
    throw new Error("Method 'getPersonsGreaterOrEqualTo()' must be implemented.")
  }

  insertPerson ({ name, lastname, idType, idNumber, age, cityOfBirth }) {
    throw new Error("Method 'insertPerson()' must be implemented.")
  }

  updatePersonById (personId, { name, lastname, idType, idNumber, age, cityOfBirth }) {
    throw new Error("Method 'updatePersonById()' must be implemented.")
  }

  deletePersonById (personId) {
    throw new Error("Method 'deletePersonById()' must be implemented.")
  }

  getPersons
}
