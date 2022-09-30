import PersonUseCase from '../person/application/person.usecase.js'
import PersonPrismaRepository from '../person/infrastructure/prisma/person.prisma.repository.js'

const personUseCase = new PersonUseCase(new PersonPrismaRepository())

export const getAllPersons = async (request, response, next) => {
  try {
    const persons = await personUseCase.listAllPersons()
    response.status(201).json({
      data: persons
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getPersonById = async (request, response, next) => {
  const { personId } = request.params

  try {
    const person = await personUseCase.getUniquePerson(personId)
    response.status(201).json({
      data: person
    }).end()
  } catch (error) {
    next(error)
  }
}
