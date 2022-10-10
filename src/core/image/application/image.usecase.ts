import Image from '../domain/image.model'
import ImageRepository from '../domain/image.repository'
import PersonRepository from '../../person/domain/person.repository'
import UploaderRepository from '../domain/uploader.repository'
import CustomError from '../../shared/custom.error'

export default class ImageUseCase {
  private readonly imageRepository: ImageRepository
  private readonly personRepository: PersonRepository
  private readonly uploaderRepository: UploaderRepository

  constructor (imageRepository: ImageRepository, personRepository: PersonRepository, uploaderRepository) {
    this.imageRepository = imageRepository
    this.personRepository = personRepository
    this.uploaderRepository = uploaderRepository
  }

  async listAllImages () {
    const images = await this.imageRepository.getAllImages()
    return images
  }

  async getUniqueImage (imageId) {
    const image = await this.imageRepository.getImageById(imageId)

    if (!image) {
      throw new CustomError ('TALENT_POOL_API_IMAGE', 'Image not found', 'Image not found')
    }

    const { personId, url, title, description } = image
    const person = await this.personRepository.getPersonById(personId)

    if (!person) {
      throw new CustomError ('TALENT_POOL_API_PERSON', 'Person not found', 'Person not found')
    }

    const imageDTO = {
      imageId,
      person,
      url,
      title,
      description
    }

    return imageDTO
  }

  async getImagesByPerson (personId) {
    const personFound = await this.personRepository.getPersonById(personId)

    if (!personFound) {
      throw new CustomError ('TALENT_POOL_API_PERSON', 'Person not found', 'Person not found')
    }

    const images = await this.imageRepository.getImagesByPersonId(personId)
    return images
  }

  async uploadImageByPerson (personId, url, title, description) {
    const personFound = await this.personRepository.getPersonById(personId)

    if (!personFound) {
      throw new CustomError ('TALENT_POOL_API_PERSON', 'Person not found', 'Person not found')
    }

    const image = new Image(personId, url, title, description)
    const imageUploaded = await this.imageRepository.saveImageByPersonId(personId, image.imageId, image.url, image.title, image.description)
    return imageUploaded
  }

  async updateImage (imageId: string, title: string, description: string) {
    const oldImage = await this.imageRepository.getImageById(imageId)

    if (!oldImage) {
      throw new CustomError ('TALENT_POOL_API_IMAGE', 'Image not found', 'Image not found')
    }

    const newImage = {
      title: typeof title === 'undefined' ? oldImage.title : title,
      description: typeof description === 'undefined' ? oldImage.description : description
    }

    const imageUpdated = await this.imageRepository.updateImageById(imageId, newImage.title, newImage.description)
    return imageUpdated
  }

  async deleteImage (imageId: string) {
    const imageDeleted = await this.imageRepository.deleteImageById(imageId)

    if (!imageDeleted) {
      throw new CustomError ('TALENT_POOL_API_IMAGE', 'Image not found', 'Image not found')
    }

    return imageDeleted
  }

  async uploadImageToCloud (path: string, fileName: string) {
    const imageUrl = await this.uploaderRepository.uploadImage(path, fileName)
    return imageUrl
  }
}
