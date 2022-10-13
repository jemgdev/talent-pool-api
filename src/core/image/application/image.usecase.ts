import Image from '../domain/image.model'
import ImageRepository from '../domain/image.repository'
import PersonRepository from '../../person/domain/person.repository'
import UploaderRepository from '../domain/uploader.repository'
import CustomError from '../../shared/custom.error'
import IImage from '../domain/image.interface'
import ImageDTO from '../domain/image.dto'

export default class ImageUseCase {
  private readonly imageRepository: ImageRepository
  private readonly personRepository: PersonRepository
  private readonly uploaderRepository: UploaderRepository

  constructor (imageRepository: ImageRepository, personRepository: PersonRepository, uploaderRepository) {
    this.imageRepository = imageRepository
    this.personRepository = personRepository
    this.uploaderRepository = uploaderRepository
  }

  async listAllImages (): Promise<IImage[] | null> {
    const images = await this.imageRepository.getAllImages()
    return images
  }

  async getUniqueImage (imageId: string): Promise<ImageDTO | null> {
    const image = await this.imageRepository.getImageById(imageId)

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

  async getImagesByPerson (personId: string): Promise<IImage[] | null> {
    const personFound = await this.personRepository.getPersonById(personId)

    if (!personFound) {
      throw new CustomError ('PERSON_404', 'Person', 'Person not found')
    }

    const images = await this.imageRepository.getImagesByPersonId(personId)
    return images
  }

  async uploadImageByPerson (path: string, fileName: string, personId: string, title: string, description: string, isUnlinkeable?: boolean): Promise<IImage | null| void> {
    const personFound = await this.personRepository.getPersonById(personId)

    if (!personFound) {
      throw new CustomError ('PERSON_404', 'Person', 'Person not found')
    }
    
    const imageUrl = await this.uploaderRepository.uploadImage(path, fileName, isUnlinkeable)
    const image = new Image(personId, imageUrl, title, description)
    const imageUploaded = await this.imageRepository.saveImageByPersonId(personId, image.imageId, image.url, image.title, image.description)
    return imageUploaded    
  }

  async updateImage (imageId: string, title: string, description: string): Promise<IImage | null> {
    const oldImage = await this.imageRepository.getImageById(imageId)

    if (!oldImage) {
      throw new CustomError ('IMAGE_404', 'Image', 'Image not found')
    }

    const newImage = {
      title: typeof title === 'undefined' ? oldImage.title : title,
      description: typeof description === 'undefined' ? oldImage.description : description
    }

    const imageUpdated = await this.imageRepository.updateImageById(imageId, newImage.title, newImage.description)
    return imageUpdated
  }

  async deleteImage (imageId: string): Promise<IImage | null> {
    const imageDeleted = await this.imageRepository.deleteImageById(imageId)

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
