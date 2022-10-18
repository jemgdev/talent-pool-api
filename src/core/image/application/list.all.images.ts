import Image from '../domain/image.model'
import ImagePersistanceRepository from '../domain/image.persistance.repository'

export default class ListAllImages {
  private readonly imagePersistanceRepository: ImagePersistanceRepository

  constructor(imagePersistanceRepository: ImagePersistanceRepository) {
    this.imagePersistanceRepository = imagePersistanceRepository
  }

  async list (): Promise<Image[] | null> {
    const images = await this.imagePersistanceRepository.getAllImages()
    return images
  }
}