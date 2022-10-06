import { Request, Response, NextFunction } from 'express'
import ImageUseCase from '../core/image/application/image.usecase'
import ImageAwsRepository from '../core/image/infrastructure/aws/image.aws.repository'
import ImageMongooseRespository from '../core/image/infrastructure/mongoose/image.mongoose.repository'
import PersonPrismaRepository from '../core/person/infrastructure/prisma/person.prisma.repository'

const imageUseCase = new ImageUseCase(new ImageMongooseRespository(), new PersonPrismaRepository(), new ImageAwsRepository())

export const getAllImages = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const images = await imageUseCase.listAllImages()

    response.status(200).json({
      data: images
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getImage = async (request: Request, response: Response, next: NextFunction) => {
  const { imageId } = request.params

  try {
    const image = await imageUseCase.getUniqueImage(imageId)

    response.status(200).json({
      data: image
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getImageFromPerson = async (request: Request, response: Response, next: NextFunction) => {
  const { personId } = request.params

  try {
    const image = await imageUseCase.getImagesByPerson(personId)

    response.status(200).json({
      data: image
    }).end()
  } catch (error) {
    next(error)
  }
}

export const uploadImage = async (request: Request, response: Response, next: NextFunction) => {
  const { personId } = request.params
  const { title, description } = request.body
  const file = request.file

  if (!file) {
    return response.status(400).json({
      message: 'The file must be png, jpg or jpeg'
    })
  }

  try {
    const imageUrl = await imageUseCase.uploadImageToCloud(file.path, file.filename)
    const imageSaved = await imageUseCase.uploadImageByPerson(personId, imageUrl, title, description)

    response.status(201).json({
      data: imageSaved
    })
  } catch (error) {
    next(error)
  }
}

export const updateImage = async (request: Request, response: Response, next: NextFunction) => {
  const { imageId } = request.params
  const { title, description } = request.body

  try {
    const imageUpdated = await imageUseCase.updateImage(imageId, title, description)

    response.status(200).json({
      data: imageUpdated
    })
  } catch (error) {
    next(error)
  }
}

export const deleteImage = async (request: Request, response: Response, next: NextFunction) => {
  const { imageId } = request.params

  try {
    const imageDeleted = await imageUseCase.deleteImage(imageId)

    response.status(200).json({
      data: imageDeleted
    })
  } catch (error) {
    next(error)
  }
}
