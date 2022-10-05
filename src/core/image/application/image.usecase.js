import Image from '../domain/image.model.js'

export default class ImageUseCase {
  imageRepository
  personRepository

  constructor (imageRepository, personRepository) {
    this.imageRepository = imageRepository
    this.personRepository = personRepository
  }

  async listAllImages () {
    const images = await this.imageRepository.getAllImages()
    return images
  }

  async getUniqueImage (imageId) {
    const image = await this.imageRepository.getImageById(imageId)

    if (!image) {
      return { message: 'Image not found' }
    }

    const { personId, url, title, description } = image
    const { name, lastname, idType, idNumber, age, cityOfBirth } = await this.personRepository.getPersonById(personId)

    const imageDTO = {
      imageId,
      person: {
        name,
        lastname,
        idType,
        idNumber,
        age,
        cityOfBirth
      },
      url,
      title,
      description
    }

    return imageDTO
  }

  async getImagesByPerson (personId) {
    const personFound = await this.personRepository.getPersonById(personId)

    if (!personFound) {
      return { message: 'Person not found' }
    }

    const images = await this.imageRepository.getImagesByPersonId(personId)
    return images
  }

  async uploadImageByPerson (personId, { url, title, description }) {
    const personFound = await this.personRepository.getPersonById(personId)

    if (!personFound) {
      return { message: 'Person not found' }
    }

    const newImage = new Image({ url, title, description }).getImage()

    const image = await this.imageRepository.saveImageByPersonId(personId, newImage)
    return image
  }

  async updateImage (imageId, { title, description }) {
    const oldImage = this.imageRepository.getImageById(imageId)

    if (!oldImage) {
      return { message: 'Image not found' }
    }

    const newImage = {
      title: typeof title === 'undefined' ? oldImage.title : title,
      description: typeof description === 'undefined' ? oldImage.description : description
    }

    const imageUpdated = await this.imageRepository.updateImageById(imageId, newImage)
    return imageUpdated
  }

  async deleteImage (imageId) {
    const imageDeleted = await this.imageRepository.deleteImageById(imageId)

    if (!imageDeleted) {
      return { message: 'Image not found' }
    }

    return imageDeleted
  }
}
