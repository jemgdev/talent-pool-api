import ImageUseCase from '../core/image/application/image.usecase.js'
import cloudinary from '../cloudinary.sdk.js'
import ImageMongooseRespository from '../core/image/infrastructure/mongoose/image.mongoose.repository.js'
import PersonPrismaRepository from '../core/person/infrastructure/prisma/person.prisma.repository.js'

const imageUseCase = new ImageUseCase(new ImageMongooseRespository(), new PersonPrismaRepository())

export const getAllImages = async (request, response, next) => {
  try {
    const images = await imageUseCase.listAllImages()
    response.status(200).json({
      data: images
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getImage = async (request, response, next) => {
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

export const getImageFromPerson = async (request, response, next) => {
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

export const uploadImage = async (request, response, next) => {
  const { personId } = request.params
  const { title, description } = request.body
  const file = request.file

  if (!file) {
    response.status(400).json({
      message: 'The file must be png, jpg or jpeg'
    })
  }

  try {
    const { secure_url } = await cloudinary.uploader.upload(file.path)
    const imageSaved = await imageUseCase.uploadImageByPerson(personId, { url: secure_url, title, description })

    response.status(201).json({
      data: imageSaved
    })
  } catch (error) {
    next(error)
  }
}
