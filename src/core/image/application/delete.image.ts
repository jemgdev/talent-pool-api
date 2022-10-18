import Image from '../domain/image.model'
import ImagePersistanceRepository from '../domain/image.persistance.repository'
import CustomError from '../../shared/custom.error'

export default class DeleteImage {
  private readonly imagePersistanceRepository: ImagePersistanceRepository

  constructor(imagePersistanceRepository: ImagePersistanceRepository) {
    this.imagePersistanceRepository = imagePersistanceRepository
  }

  async delete (imageId: string): Promise<Image | null> {
    const imageDeleted = await this.imagePersistanceRepository.deleteImageById(imageId)

    if (!imageDeleted) {
      throw new CustomError ('IMAGE_404', 'Image', 'Image not found')
    }

    return imageDeleted
  }
}