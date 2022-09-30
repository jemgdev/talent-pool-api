import PersonUseCase from '../person/application/person.usecase.js'
import PersonPrismaRepository from '../person/infrastructure/prisma/person.prisma.repository.js'

const personUseCase = new PersonUseCase(new PersonPrismaRepository())

export const getAllPersons = async (request, response) => {
  try {
    const persons = await personUseCase.listAllPersons()
    response.status(201).json({
      persons
    })
  } catch (error) {
    console.log(error)
  }
}
