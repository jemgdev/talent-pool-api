import Image from '../domain/image.model'
import ImagePersistanceRepository from '../domain/image.persistance.repository'
import PersonPersistanceRepository from '../../person/domain/person.persistance.repository'
import UploaderRepository from '../domain/uploader.repository'
import CustomError from '../../shared/custom.error'
import ImageDTO from '../domain/image.dto'
import ImageIdGeneratorRepository from '../domain/image.id.generator.repository'

export default class ImageUseCase {
  private readonly imagePersistanceRepository: ImagePersistanceRepository
  private readonly personRepository: PersonPersistanceRepository
  private readonly uploaderRepository: UploaderRepository
  private readonly imageIdGeneratorRepository: ImageIdGeneratorRepository

  constructor (imageIdGeneratorRepository: ImageIdGeneratorRepository, imagePersistanceRepository: ImagePersistanceRepository, personRepository: PersonPersistanceRepository, uploaderRepository) {
    this.imageIdGeneratorRepository = imageIdGeneratorRepository
    this.imagePersistanceRepository = imagePersistanceRepository
    this.personRepository = personRepository
    this.uploaderRepository = uploaderRepository
  }

  async listAllImages (): Promise<Image[] | null> {
    const images = await this.imagePersistanceRepository.getAllImages()
    return images
  }

  async getUniqueImage (imageId: string): Promise<ImageDTO | null> {
    const image = await this.imagePersistanceRepository.getImageById(imageId)

    if (!image) {
      throw new CustomError ('IMAGE_404', 'Image', 'Image not found')
    }

    const { personId, url, title, description } = image
    const person = await this.personRepository.getPersonById(personId)

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

  async getImagesByPerson (personId: string): Promise<Image[] | null> {
    const personFound = await this.personRepository.getPersonById(personId)

    if (!personFound) {
      throw new CustomError ('PERSON_404', 'Person', 'Person not found')
    }

    const images = await this.imagePersistanceRepository.getImagesByPersonId(personId)
    return images
  }

  async uploadImageByPerson (path: string, fileName: string, personId: string, title: string, description: string, isUnlinkeable?: boolean): Promise<Image | null| void> {
    const personFound = await this.personRepository.getPersonById(personId)

    if (!personFound) {
      throw new CustomError ('PERSON_404', 'Person', 'Person not found')
    }
    
    const imageUrl = await this.uploaderRepository.uploadImage(path, fileName, isUnlinkeable)
    const image = new Image(this.imageIdGeneratorRepository, personId, imageUrl, title, description)
    const imageUploaded = await this.imagePersistanceRepository.saveImageByPersonId(personId, image.imageId, image.url, image.title, image.description)
    return imageUploaded    
  }

  async updateImage (imageId: string, title: string, description: string): Promise<Image | null> {
    const oldImage = await this.imagePersistanceRepository.getImageById(imageId)

    if (!oldImage) {
      throw new CustomError ('IMAGE_404', 'Image', 'Image not found')
    }

    const newImage = {
      title: typeof title === 'undefined' ? oldImage.title : title,
      description: typeof description === 'undefined' ? oldImage.description : description
    }

    const imageUpdated = await this.imagePersistanceRepository.updateImageById(imageId, newImage.title, newImage.description)
    return imageUpdated
  }

  async deleteImage (imageId: string): Promise<Image | null> {
    const imageDeleted = await this.imagePersistanceRepository.deleteImageById(imageId)

    if (!imageDeleted) {
      throw new CustomError ('IMAGE_404', 'Image', 'Image not found')
    }

    return imageDeleted
  }

  async uploadImageToCloud (path: string, fileName: string): Promise<string> {
    const imageUrl = await this.uploaderRepository.uploadImage(path, fileName)
    return imageUrl
  }
}
