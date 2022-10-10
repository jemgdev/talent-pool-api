import PersonRepository from '../../domain/person.repository'
import prisma from '../../../../connections/prisma.connection'

export default class PersonPrismaRepository implements PersonRepository {
  async getAllPersons () {
    const persons = await prisma.person.findMany({})
    return persons
  }

  async getPersonById (personId: string) {
    const person = await prisma.person.findUnique({
      where: {
        personId
      }
    })
    return person
  }

  async getPersonByIdTypeAndIdNumber (idType: string, idNumber: number) {
    const personFound = await prisma.person.findMany({
      where: {
        idType,
        idNumber
      }
    })
    return personFound[0]
  }

  async getPersonsGreaterOrEqualToAge (age: number) {
    const personsFound = await prisma.person.findMany({
      where: {
        age: {
          gte: age
        }
      }
    })
    return personsFound
  }

  async insertPerson (person: { personId: string, name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string }) {
    const personSaved = await prisma.person.create({
      data: {
        personId: person.personId,
        name: person.name,
        lastname: person.lastname,
        age: person.age,
        idType: person.idType,
        idNumber: person.idNumber,
        cityOfBirth: person.cityOfBirth
      }
    })
    return personSaved
  }

  async updatePersonById (personId: string, person: { name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string }) {
    const personUpdated = await prisma.person.update({
      data: {
        name: person.name,
        lastname: person.lastname,
        age: person.age,
        idType: person.idType,
        idNumber: person.idNumber,
        cityOfBirth: person.cityOfBirth
      },
      where: {
        personId
      }
    })
    return personUpdated
  }

  async deletePersonById (personId: string) {
    const personDeleted = await prisma.person.delete({
      where: {
        personId
      }
    })
    return personDeleted
  }

  async deletePersonByIdNumber (idNumber: number) {
    const personDeleted = await prisma.person.delete({
      where: {
        idNumber
      }
    })
    return personDeleted
  }
}
