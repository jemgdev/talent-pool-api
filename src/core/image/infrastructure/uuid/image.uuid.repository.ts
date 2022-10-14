import ImageIdGeneratorRepository from '../../domain/image.id.generator.repository'
import { v4 as uuid } from 'uuid'

export default class ImageUuidRepository implements ImageIdGeneratorRepository {
  generateImageId (): string {
    return uuid()
  }
}