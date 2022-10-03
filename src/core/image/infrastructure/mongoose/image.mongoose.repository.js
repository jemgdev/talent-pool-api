import './mongoose.connect.js'
import ImageRepository from '../../domain/image.repository.js'
import Image from './image.js'

/**
 * @class ImageMongooseRespository
 * @extends { ImageRepository }
 */

export default class ImageMongooseRespository extends ImageRepository {
  async getAllImages () {
    const images = await Image.find({})
    return images
  }
}
