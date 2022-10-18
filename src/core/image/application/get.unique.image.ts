import CustomError from '../../shared/custom.error'
import ImagePersistanceRepository from '../domain/image.persistance.repository'
import PersonPersistanceRepository from '../../person/domain/person.persistance.repository'
import ImageDTO from '../domain/image.dto'

export default class GetUniqueImages {
  private readonly imagePersistanceRepository: ImagePersistanceRepository
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(imagePersistanceRepository: ImagePersistanceRepository, personPersistanceRepository: PersonPersistanceRepository) {
    this.imagePersistanceRepository = imagePersistanceRepository
    this.personPersistanceRepository = personPersistanceRepository
  }

  async getImage (imageId: string): Promise<ImageDTO | null> {

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
      person: {
        name: person.name,
        lastname: person.lastname,
        idType: person.idType,
        idNumber: person.idNumber,
        cityOfBirth: person.cityOfBirth,
        age: person.age
      },
      url,
      title,
      description
    }

    return imageDTO
  }
}