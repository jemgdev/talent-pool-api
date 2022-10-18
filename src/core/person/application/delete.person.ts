import CustomError from '../../shared/custom.error'
import PersonPersistanceRepository from '../domain/person.persistance.repository'

export default class DeletePerson {
  
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor (personPersistanceRepository: PersonPersistanceRepository) {
    this.personPersistanceRepository = personPersistanceRepository
  }

  async delete (idType: string, idNumber: number): Promise<string | null> {
    try {
      const message = await this.personPersistanceRepository.deletePersonByIdentification(idType, idNumber)
      
      return message
    } catch (error: any) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to delete was not found')
    }
  }
}
