import Person from '../domain/person.model'
import PersonPersistanceRepository from '../domain/person.persistance.repository'
import CustomError from '../../shared/custom.error'

export default class GetUniquePersonById {
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(personPersistanceRepository: PersonPersistanceRepository) {
    this.personPersistanceRepository = personPersistanceRepository
  }

  async getPerson (personId: string): Promise<Person | null> {
    const person = await this.personPersistanceRepository.getPersonById(personId)

    if (!person) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to get was not found')
    }

    return person
  }
}