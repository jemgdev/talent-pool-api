import PersonRepository from '../../domain/person.repository.js'
import prisma from './prisma.connection.js'

/**
 * @class PersonPrismaRepository
 * @extends {PersonRepository}
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

  async insertPerson ({ personId, name, lastname, age, imageId }) {
    const personSaved = await prisma.person.create({
      data: {
        personId,
        name,
        lastname,
        age,
        imageId: typeof imageId === 'undefined' ? '387e387e37gh9383h93' : imageId
      }
    })
    return personSaved
  }

  async updatePersonById (personId, { name, lastname, age, imageId }) {
    const personUpdated = await prisma.person.update({
      data: {
        name,
        age,
        imageId,
        lastname
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
