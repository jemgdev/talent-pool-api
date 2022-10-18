import Person from '../domain/person.model'
import PersonPersistanceRepository from '../domain/person.persistance.repository'
import CustomError from '../../shared/custom.error'

export default class DeletePersonById {
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(personPersistanceRepository: PersonPersistanceRepository) {
    this.personPersistanceRepository = personPersistanceRepository
  }

  async deletePerson (personId: string): Promise<Person | null> {
    try {
      const personDeleted = await this.personPersistanceRepository.deletePersonById(personId)
      return personDeleted
    } catch (error: any) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to delete was not found')
    }
  }
}