import { Request, Response, NextFunction } from 'express'
import ImageUseCase from '../core/image/application/image.usecase'
import ImageCloudinaryRepository from '../core/image/infrastructure/cloudinary/image.cloudinary.respository'
import ImageMongooseRespository from '../core/image/infrastructure/mongoose/image.mongoose.repository'
import PersonPrismaRepository from '../core/person/infrastructure/prisma/person.prisma.repository'

const imageUseCase = new ImageUseCase(new ImageMongooseRespository(), new PersonPrismaRepository(), new ImageCloudinaryRepository())

export const getAllImages = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const images = await imageUseCase.listAllImages()

    response.status(200).json({
      status: 'OK',
      message: 'The images were found',
      data: images
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getImage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { imageId } = request.params

  try {
    const image = await imageUseCase.getUniqueImage(imageId)

    response.status(200).json({
      status: 'OK',
      message: 'The image was found',
      data: image
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getImageFromPerson = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { personId } = request.params

  try {
    const image = await imageUseCase.getImagesByPerson(personId)

    response.status(200).json({
      status: 'OK',
      message: 'The images were found',
      data: image
    }).end()
  } catch (error) {
    next(error)
  }
}

export const uploadImage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { personId } = request.params
  const { title, description } = request.body
  const file = request.file

  if (!file) {
    response.status(400).json({
      status: 'fail',
      message: 'The file must be png, jpg or jpeg',
      data: {}
    })
    return
  }

  try {
    const imageSaved = await imageUseCase.uploadImageByPerson(file.path, file.filename, personId, title, description)

    response.status(201).json({
      status: 'OK',
      message: 'The file was uploaded',
      data: imageSaved
    })
  } catch (error) {
    next(error)
  }
}

export const updateImage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { imageId } = request.params
  const { title, description } = request.body

  try {
    const imageUpdated = await imageUseCase.updateImage(imageId, title, description)

    response.status(200).json({
      status: 'OK',
      message: 'The file was updated',
      data: imageUpdated
    })
  } catch (error) {
    next(error)
  }
}

export const deleteImage = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { imageId } = request.params

  try {
    const imageDeleted = await imageUseCase.deleteImage(imageId)

    response.status(200).json({
      status: 'OK',
      message: 'The file was deleted',
      data: imageDeleted
    })
  } catch (error) {
    next(error)
  }
}
