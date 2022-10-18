import { Request, Response, NextFunction } from 'express'
import DeleteImage from '../core/image/application/delete.image'
import GetImagesByPerson from '../core/image/application/get.images.by.person'
import GetUniqueImages from '../core/image/application/get.unique.image'
import ListAllImages from '../core/image/application/list.all.images'
import UpdateImage from '../core/image/application/update.image'
import UploadImageByPerson from '../core/image/application/upload.image.by.person'
import ImageAwsRepository from '../core/image/infrastructure/aws/image.aws.repository'
import ImageCloudinaryRepository from '../core/image/infrastructure/cloudinary/image.cloudinary.respository'
import ImageMongooseRespository from '../core/image/infrastructure/mongoose/image.mongoose.repository'
import ImageUuidRepository from '../core/image/infrastructure/uuid/image.uuid.repository'
import PersonPrismaRepository from '../core/person/infrastructure/prisma/person.prisma.repository'

const listAllImages = new ListAllImages(new ImageMongooseRespository())
const getUniqueImage = new GetUniqueImages(new ImageMongooseRespository(), new PersonPrismaRepository())
const getImagesByPerson = new GetImagesByPerson(new ImageMongooseRespository(), new PersonPrismaRepository())
const uploadImageByPerson = new UploadImageByPerson(new ImageUuidRepository(), new ImageMongooseRespository(), new PersonPrismaRepository(), new ImageAwsRepository())
const updateImage = new UpdateImage(new ImageMongooseRespository())
const deleteImage = new DeleteImage(new ImageMongooseRespository())

export const getAllImages = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const images = await listAllImages.list()

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
    const image = await getUniqueImage.get(imageId)

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
    const image = await getImagesByPerson.getImages(personId)

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
    const imageSaved = await uploadImageByPerson.upload(file.path, file.filename, personId, title, description)

    response.status(201).json({
      status: 'OK',
      message: 'The file was uploaded',
      data: imageSaved
    })
  } catch (error) {
    next(error)
  }
}

export const updateImageById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { imageId } = request.params
  const { title, description } = request.body

  try {
    const imageUpdated = await updateImage.update(imageId, title, description)

    response.status(200).json({
      status: 'OK',
      message: 'The file was updated',
      data: imageUpdated
    })
  } catch (error) {
    next(error)
  }
}

export const deleteImageById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { imageId } = request.params

  try {
    const imageDeleted = await deleteImage.delete(imageId)

    response.status(200).json({
      status: 'OK',
      message: 'The file was deleted',
      data: imageDeleted
    })
  } catch (error) {
    next(error)
  }
}
