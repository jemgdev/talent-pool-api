import CustomError from '../../shared/custom.error'
import ImagePersistanceRepository from '../domain/image.persistance.repository'
import PersonPersistanceRepository from '../../person/domain/person.persistance.repository'
import ImageIdGeneratorRepository from '../domain/image.id.generator.repository'
import UploaderRepository from '../domain/uploader.repository'
import Image from '../domain/image.model'

export default class UploadImageByPerson {
  private readonly imageIdGeneratorRepository: ImageIdGeneratorRepository
  private readonly imagePersistanceRepository: ImagePersistanceRepository
  private readonly personPersistanceRepository: PersonPersistanceRepository
  private readonly uploaderRepository: UploaderRepository

  constructor(imageIdGeneratorRepository: ImageIdGeneratorRepository, imagePersistanceRepository: ImagePersistanceRepository, personPersistanceRepository: PersonPersistanceRepository, uploaderRepository: UploaderRepository) {
    this.imageIdGeneratorRepository = imageIdGeneratorRepository
    this.imagePersistanceRepository = imagePersistanceRepository
    this.personPersistanceRepository = personPersistanceRepository
    this.uploaderRepository = uploaderRepository
  }

  async upload (path: string, fileName: string, personId: string, title: string, description: string, isUnlinkeable?: boolean): Promise<Image | null| void> {
    const personFound = await this.personPersistanceRepository.getPersonById(personId)

    if (!personFound) {
      throw new CustomError ('PERSON_404', 'Person', 'Person not found')
    }
    
    const imageUrl = await this.uploaderRepository.uploadImage(path, fileName, isUnlinkeable)
    const image = new Image(this.imageIdGeneratorRepository, personId, imageUrl, title, description)
    const imageUploaded = await this.imagePersistanceRepository.saveImageByPersonId(personId, image.imageId, image.url, image.title, image.description)
    return imageUploaded    
  }
}