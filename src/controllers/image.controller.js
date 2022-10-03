import ImageUseCase from '../core/image/application/image.usecase.js'
import ImageMongooseRespository from '../core/image/infrastructure/mongoose/image.mongoose.repository.js'
import PersonPrismaRepository from '../core/person/infrastructure/prisma/person.prisma.repository.js'

const imageUseCase = new ImageUseCase(new ImageMongooseRespository(), new PersonPrismaRepository())

export const getAllImages = async (request, response, next) => {
  try {
    const images = await imageUseCase.listAllImages()
    response.status(200).json({
      data: images
    })
  } catch (error) {
    next(error)
  }
}
