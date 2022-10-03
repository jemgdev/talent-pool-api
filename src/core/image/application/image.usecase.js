import Image from '../domain/image.model.js'
import errorHandler from '../../shared/error.handler.js'

export default class ImageUseCase {
  imageRepository
  personRepository

  constructor (imageRepository, personRepository) {
    imageRepository = this.imageRepository
    personRepository = this.personRepository
  }

  async listAllImages () {
    try {
      const images = await this.imageRepository.getAllImages()
      return images
    } catch (error) {
      errorHandler(Error)
    }
  }

  async getUniqueImage (imageId) {
    try {
      const image = await this.imageRepository.getImageById(imageId)
      return image
    } catch (error) {
      errorHandler(error)
    }
  }

  async getImagesByPerson (personId) {
    const personFound = await this.personRepository.getPersonById(personId)

    if (!personFound) {
      throw new Error('Person not found')
    }

    const images = await this.imageRepository.getImagesByPersonId(personId)
    return images
  }

  async uploadImageByPerson (personId, { url, title, description }) {
    const personFound = await this.personRepository.getPersonById(personId)

    if (!personFound) {
      throw new Error('Person not found')
    }

    const newImage = new Image({ url, title, description }).getImage()

    const image = await this.imageRepository.saveImageByPersonId(personId, newImage)
    return image
  }

  async updateImage (imageId, { url, title, description }) {
    const oldImage = this.imageRepository.getImageById(imageId)

    const newImage = {
      url: typeof url === 'undefined' ? oldImage.url : url,
      title: typeof title === 'undefined' ? oldImage.title : title,
      description: typeof description === 'undefined' ? oldImage.description : description
    }

    const imageUpdated = await this.imageRepository.updateImageById(imageId, newImage)
    return imageUpdated
  }

  async deleteImage (imageId) {
    const imageDeleted = await this.imageRepository.deleteImageById(imageId)
    return imageDeleted
  }
}
