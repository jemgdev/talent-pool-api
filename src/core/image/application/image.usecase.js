import Image from '../domain/image.model.js'

export default class ImageUseCase {
  imageRepository
  personRepository

  constructor (imageRepository, personRepository) {
    this.imageRepository =imageRepository
    this.personRepository = personRepository
  }

  async listAllImages () {
    const images = await this.imageRepository.getAllImages()
    return images
  }

  async getUniqueImage (imageId) {
    const { url, personId, title, description } = await this.imageRepository.getImageById(imageId)
    const { name, lastname, age } = await this.personRepository.getPersonById(personId)
    
    const imageDTO = { 
      imageId,
      person: {
        personId,
        name,
        lastname,
        age
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
