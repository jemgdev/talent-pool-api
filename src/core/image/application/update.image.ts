import Image from '../domain/image.model'
import ImagePersistanceRepository from '../domain/image.persistance.repository'
import CustomError from '../../shared/custom.error'

export default class UpdateImage {
  private readonly imagePersistanceRepository: ImagePersistanceRepository

  constructor(imagePersistanceRepository: ImagePersistanceRepository) {
    this.imagePersistanceRepository = imagePersistanceRepository
  }

  async update (imageId: string, title: string, description: string): Promise<Image | null> {
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
}