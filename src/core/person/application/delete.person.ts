import ImagePersistanceRepository from '../../image/domain/image.persistance.repository'
import CustomError from '../../shared/custom.error'
import PersonPersistanceRepository from '../domain/person.persistance.repository'

export default class DeletePerson {
  
  private readonly personPersistanceRepository: PersonPersistanceRepository
  private readonly imagePersistanceRepository: ImagePersistanceRepository

  constructor (personPersistanceRepository: PersonPersistanceRepository, imagePersistanceRepository: ImagePersistanceRepository) {
    this.personPersistanceRepository = personPersistanceRepository
    this.imagePersistanceRepository = imagePersistanceRepository
  }

  async delete (idType: string, idNumber: number): Promise<string | null> {
    try {
      const personFound = await this.personPersistanceRepository.getUniquePerson(idType, idNumber)

      if (!personFound) {
        throw new CustomError ('PERSON_404', 'Person', 'The person that you want to delete was not found')
      }

      await this.imagePersistanceRepository.deleteImagesByPersonId(personFound.personId)
      const message = await this.personPersistanceRepository.deletePersonByIdentification(idType, idNumber)

      return message
    } catch (error: any) {
      throw new CustomError ('PERSON_404', 'Person', 'The person that you want to delete was not found')
    }
  }
}
