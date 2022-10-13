import PersonRepository from '../../domain/person.repository'
import prisma from '../../../../connections/prisma.connection'
import IPerson from '../../domain/person.interface'

export default class PersonPrismaRepository implements PersonRepository {
  async getAllPersons (): Promise<IPerson[]> {
    const persons = await prisma.person.findMany({})
    return persons
  }

  async getPersonById (personId: string): Promise<IPerson | null> {
    const person = await prisma.person.findUnique({
      where: {
        personId
      }
    })
    return person
  }

  async getPersonByIdTypeAndIdNumber (idType: string, idNumber: number): Promise<IPerson | null> {
    const personFound = await prisma.person.findMany({
      where: {
        idType,
        idNumber
      }
    })
    return personFound[0]
  }

  async getPersonsGreaterOrEqualToAge (age: number): Promise<IPerson[]> {
    const personsFound = await prisma.person.findMany({
      where: {
        age: {
          gte: age
        }
      }
    })
    return personsFound
  }

  async insertPerson (person: { personId: string, name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string }): Promise<IPerson> {
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

  async updatePersonById (personId: string, person: { name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string }): Promise<IPerson> {
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

  async deletePersonById (personId: string): Promise<IPerson> {
    const personDeleted = await prisma.person.delete({
      where: {
        personId
      }
    })
    return personDeleted
  }

  async deletePersonByIdNumber (idNumber: number): Promise<IPerson> {
    const personDeleted = await prisma.person.delete({
      where: {
        idNumber
      }
    })
    return personDeleted
  }
}
