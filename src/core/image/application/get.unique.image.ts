import ImageDTO from '../domain/image.dto'
import CustomError from '../../shared/custom.error'
import ImagePersistanceRepository from '../domain/image.persistance.repository'
import PersonPersistanceRepository from '../../person/domain/person.persistance.repository'

export default class GetUniqueImages {
  private readonly imagePersistanceRepository: ImagePersistanceRepository
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(imagePersistanceRepository: ImagePersistanceRepository, personPersistanceRepository: PersonPersistanceRepository) {
    this.imagePersistanceRepository = imagePersistanceRepository
    this.personPersistanceRepository = personPersistanceRepository
  }

  async get (imageId: string): Promise<ImageDTO | null> {
    const image = await this.imagePersistanceRepository.getImageById(imageId)

    if (!image) {
      throw new CustomError ('IMAGE_404', 'Image', 'Image not found')
    }

    const { personId, url, title, description } = image
    const person = await this.personPersistanceRepository.getPersonById(personId)

    if (!person) {
      throw new CustomError ('PERSON_404', 'Person', 'Person not found')
    }

    const imageDTO: ImageDTO = {
      imageId,
      person,
      url,
      title,
      description
    }

    return imageDTO
  }
}