import CustomError from '../../shared/custom.error'
import Person from '../domain/person.model'
import PersonPersistanceRepository from '../domain/person.persistance.repository'

export default class DeletePersonByIdNumber {
  
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor (personPersistanceRepository: PersonPersistanceRepository) {
    this.personPersistanceRepository = personPersistanceRepository
  }

  async deletePerson (idNumber: number): Promise<Person | null> {
    try {
      const personDeleted = await this.personPersistanceRepository.deletePersonByIdNumber(idNumber)
      return personDeleted
    } catch (error: any) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to delete was not found')
    }
  }
}
