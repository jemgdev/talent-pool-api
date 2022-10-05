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

  async getImageById (imageId) {
    const image = await Image.findOne({
      imageId
    })
    return image
  }

  async getImagesByPersonId (personId) {
    const image = await Image.find({
      personId
    })
    return image
  }

  async saveImageByPersonId (personId, { imageId, url, title, description }) {
    const image = new Image({
      imageId,
      personId,
      url,
      title,
      description
    })

    const imageSaved = await image.save()
    return imageSaved
  }

  async updateImageById (imageId, { url, title, description }) {
    const imageFound = await Image.findOneAndUpdate({ imageId }, {
      url,
      title,
      description
    }, {
      new: true
    })

    return imageFound
  }

  async deleteImageById (imageId) {
    const imageDeleted = await Image.findOneAndDelete({ imageId })
    return imageDeleted
  }
}
