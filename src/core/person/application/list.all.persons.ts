import Person from '../domain/person.model'
import PersonPersistanceRepository from '../domain/person.persistance.repository'

export default class ListAllPersons {
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(personPersistanceRepository: PersonPersistanceRepository) {
    this.personPersistanceRepository = personPersistanceRepository
  }

  async list (): Promise<Person[] | null> {
    return await this.personPersistanceRepository.getAllPersons()
  }

  async listGreaterOrEqualsToAge (age: number): Promise<Person[] | null> {
    const ageNumber = Number(age)
    return await this.personPersistanceRepository.getPersonsGreaterOrEqualToAge(ageNumber)
  }
}