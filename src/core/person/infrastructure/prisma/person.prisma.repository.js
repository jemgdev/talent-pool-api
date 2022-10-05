import PersonRepository from '../../domain/person.repository.js'
import prisma from './prisma.connection.js'

/**
 * @class PersonPrismaRepository
 * @extends { PersonRepository }
 */

export default class PersonPrismaRepository extends PersonRepository {
  async getAllPersons () {
    const persons = await prisma.person.findMany({})
    return persons
  }

  async getPersonById (personId) {
    const person = await prisma.person.findUnique({
      where: {
        personId
      }
    })
    return person
  }

  async getPersonByIdTypeAndIdNumber (idType, idNumber) {
    const personFound = await prisma.person.findMany({
      where: {
        idType,
        idNumber
      }
    })
    console.log(personFound)
    return personFound
  }

  async getPersonsGreaterOrEqualToAge (age) {
    const personsFound = await prisma.person.findMany({
      where: {
        age: {
          gte: age
        }
      }
    })
    return personsFound
  }

  async insertPerson ({ personId, name, lastname, age, idType, idNumber, cityOfBirth }) {
    const personSaved = await prisma.person.create({
      data: {
        personId,
        name,
        lastname,
        age,
        idType,
        idNumber,
        cityOfBirth
      }
    })
    return personSaved
  }

  async updatePersonById (personId, { name, lastname, age, idType, idNumber, cityOfBirth }) {
    const personUpdated = await prisma.person.update({
      data: {
        name,
        lastname,
        age,
        idType,
        idNumber,
        cityOfBirth
      },
      where: {
        personId
      }
    })
    return personUpdated
  }

  async deletePersonById (personId) {
    const personDeleted = await prisma.person.delete({
      where: {
        personId
      }
    })
    return personDeleted
  }
}
