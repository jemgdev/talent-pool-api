import './mongoose.connect'
import ImagePersistanceRepository from '../../domain/image.persistance.repository'
import ImageModel from './image.model'
import Image from '../../domain/image.model'

export default class ImageMongooseRespository implements ImagePersistanceRepository {
  async getAllImages (): Promise<Image[] | null> {
    const images = await ImageModel.find({}, {
      personId: 0
    })

    return images
  }

  async getImageById (imageId: string): Promise<Image | null> {
    const image = await ImageModel.findOne({
      imageId
    })
    return image
  }

  async getImagesByPersonId (personId): Promise<Image[] | null> {
    const image = await ImageModel.find({
      personId
    }, {
      personId: 0
    })
    return image
  }

  async saveImageByPersonId ({ personId , imageId , url , title , description }: { personId: string, imageId: string, url: string, title: string, description: string }): Promise<Image | null> {
    const image = new ImageModel({
      imageId,
      personId,
      url,
      title,
      description
    })

    const imageSaved = await image.save()
    return {
      imageId: imageSaved.imageId,
      url: imageSaved.url,
      title: imageSaved.title,
      description: imageSaved.description
    }
  }

  async updateImageById ({ imageId , title , description  }: { imageId: string, title: string, description: string }): Promise<Image | null> {
    const imageFound = await ImageModel.findOneAndUpdate({ imageId }, {
      title,
      description
    }, {
      new: true,
      projection: {
        personId: 0
      }
    })

    return imageFound
  }

  async deleteImageById (imageId: string) {
    const imageDeleted = await ImageModel.findOneAndDelete({ imageId }, {
      projection: {
        personId: 0
      }
    })
    return imageDeleted
  }

  async deleteImagesByPersonId (personId: string) {
    await ImageModel.deleteMany({ personId })
  }
}
