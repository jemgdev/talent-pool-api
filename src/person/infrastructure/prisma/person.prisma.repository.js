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
}
