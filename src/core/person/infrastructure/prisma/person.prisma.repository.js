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

  async insertPerson ({ personId, name, lastname, age }) {
    const personSaved = await prisma.person.create({
      data: {
        personId,
        name,
        lastname,
        age
      }
    })
    return personSaved
  }

  async updatePersonById (personId, { name, lastname, age }) {
    const personUpdated = await prisma.person.update({
      data: {
        name,
        age,
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
