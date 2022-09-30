import PersonRepository from '../../domain/person.repository.js'
import prisma from './prisma.connection.js'

export default class PersonPrismaRepository extends PersonRepository {
  async getAllPersons () {
    const persons = await prisma.person.findMany({})
    return persons
  }
}
