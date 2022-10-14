import PersonPersistanceRepository from '../../domain/person.persistance.repository'
import prisma from './prisma.connection'
import Person from '../../domain/person.model'

export default class PersonPrismaRepository implements PersonPersistanceRepository {
  async getAllPersons (): Promise<Person[]> {
    const persons = await prisma.person.findMany({})
    return persons
  }

  async getPersonById (personId: string): Promise<Person | null> {
    const person = await prisma.person.findUnique({
      where: {
        personId
      }
    })
    return person
  }

  async getPersonByIdTypeAndIdNumber (idType: string, idNumber: number): Promise<Person | null> {
    const personFound = await prisma.person.findMany({
      where: {
        idType,
        idNumber
      }
    })
    return personFound[0]
  }

  async getPersonsGreaterOrEqualToAge (age: number): Promise<Person[]> {
    const personsFound = await prisma.person.findMany({
      where: {
        age: {
          gte: age
        }
      }
    })
    return personsFound
  }

  async insertPerson (person: { personId: string, name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string }): Promise<Person> {
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

  async updatePersonById (personId: string, person: { name: string, lastname: string, age: number, idType: string, idNumber: number, cityOfBirth: string }): Promise<Person> {
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

  async deletePersonById (personId: string): Promise<Person> {
    const personDeleted = await prisma.person.delete({
      where: {
        personId
      }
    })
    return personDeleted
  }

  async deletePersonByIdNumber (idNumber: number): Promise<Person> {
    const personDeleted = await prisma.person.delete({
      where: {
        idNumber
      }
    })
    return personDeleted
  }
}
