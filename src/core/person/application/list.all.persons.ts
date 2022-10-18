import Person from '../domain/person.model'
import PersonPersistanceRepository from '../domain/person.persistance.repository'

export default class ListAllPersons {
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(personPersistanceRepository: PersonPersistanceRepository) {
    this.personPersistanceRepository = personPersistanceRepository
  }

  async list (age?: number): Promise<Person[] | null> {
    if (age) {
      const ageNumber = Number(age)
      return await this.personPersistanceRepository.getPersonsGreaterOrEqualToAge(ageNumber)
    }

    return await this.personPersistanceRepository.getAllPersons()
  }
}