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

  async getUniquePerson (idType: string, idNumber: number): Promise<Person | null> {
    const person = await prisma.person.findFirst({
      where: {
        AND: {
          idNumber,
          idType
        }
      }
    })

    return person
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

  async updatePersonByIdentification (idType, idNumber, { name, lastname, age, cityOfBirth }: { name: string, lastname: string, age: number, cityOfBirth: string }): Promise<string> {
    await prisma.person.updateMany({
      data: {
        name,
        lastname,
        age,
        cityOfBirth
      },
      where: {
        idType,
        idNumber
      }
    })

    return 'The person was updated'
  }

  async deletePersonByIdentification (idType: string, idNumber: number): Promise<string> {
    await prisma.person.deleteMany({
      where: {
        AND: {
          idNumber,
          idType
        }
      }
    })

    return 'The user has been deleted'
  }
}
