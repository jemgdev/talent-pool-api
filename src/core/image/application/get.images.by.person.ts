import CustomError from '../../shared/custom.error'
import ImagePersistanceRepository from '../domain/image.persistance.repository'
import PersonPersistanceRepository from '../../person/domain/person.persistance.repository'
import Image from '../domain/image.model'

export default class GetImagesByPerson {
  private readonly imagePersistanceRepository: ImagePersistanceRepository
  private readonly personPersistanceRepository: PersonPersistanceRepository

  constructor(imagePersistanceRepository: ImagePersistanceRepository, personPersistanceRepository: PersonPersistanceRepository) {
    this.imagePersistanceRepository = imagePersistanceRepository
    this.personPersistanceRepository = personPersistanceRepository
  }

  async getImages (idType: string, idNumber: number): Promise<Image[] | null> {
    const person = await this.personPersistanceRepository.getUniquePerson(idType, idNumber)

    if (!person) {
      throw new CustomError ('PERSON_404', 'Person', 'Person not found')
    }
    
    const images = await this.imagePersistanceRepository.getImagesByPersonId(person.personId)

    return images
  }
}