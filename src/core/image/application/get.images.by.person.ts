import Image from '../domain/image.model'
import CustomError from '../../shared/custom.error'
import ImagePersistanceRepository from '../domain/image.persistance.repository'
import PersonPersistanceRepository from '../../person/domain/person.persistance.repository'

export default class GetImagesByPerson {
  private readonly imagePersistanceRepository: ImagePersistanceRepository
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(imagePersistanceRepository: ImagePersistanceRepository, personPersistanceRepository: PersonPersistanceRepository) {
    this.imagePersistanceRepository = imagePersistanceRepository
    this.personPersistanceRepository = personPersistanceRepository
  }

  async getImages (personId: string): Promise<Image[] | null> {
    const personFound = await this.personPersistanceRepository.getPersonById(personId)

    if (!personFound) {
      throw new CustomError ('PERSON_404', 'Person', 'Person not found')
    }

    const images = await this.imagePersistanceRepository.getImagesByPersonId(personId)
    return images
  }
}