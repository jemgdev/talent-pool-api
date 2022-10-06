import '../../../../mongoose.connect'
import ImageRepository from '../../domain/image.repository'
import Image from './image'
import IImage from '../../domain/image.interface'

export default class ImageMongooseRespository implements ImageRepository {
  async getAllImages () {
    const images = await Image.find({})
    return images
  }

  async getImageById (imageId: string): Promise<IImage | null> {
    const image = await Image.findOne({
      imageId
    })
    return image
  }

  async getImagesByPersonId (personId): Promise<IImage[] | null> {
    const image = await Image.find({
      personId
    })
    return image
  }

  async saveImageByPersonId (personId: string, imageId: string, url: string, title: string, description: string): Promise<IImage | null> {
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

  async updateImageById (imageId: string, title: string, description: string): Promise<IImage | null> {
    const imageFound = await Image.findOneAndUpdate({ imageId }, {
      title,
      description
    }, {
      new: true
    })

    return imageFound
  }

  async deleteImageById (imageId: string) {
    const imageDeleted = await Image.findOneAndDelete({ imageId })
    return imageDeleted
  }
}
