import PersonUseCase from '../core/person/application/person.usecase.js'
import PersonPrismaRepository from '../core/person/infrastructure/prisma/person.prisma.repository.js'

const personUseCase = new PersonUseCase(new PersonPrismaRepository())

export const getAllPersons = async (request, response, next) => {
  try {
    const persons = await personUseCase.listAllPersons()
    response.status(200).json({
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
    response.status(200).json({
      data: person
    }).end()
  } catch (error) {
    next(error)
  }
}

export const createPerson = async (request, response, next) => {
  const { name, lastname, age, imageId } = request.body

  try {
    const newPerson = {
      name,
      lastname,
      age,
      imageId
    }

    const personSaved = await personUseCase.savePerson(newPerson)

    response.status(201).json({
      data: personSaved
    })
  } catch (error) {
    next(error)
  }
}

export const updatePerson = async (request, response, next) => {
  const { name, lastname, age } = request.body
  const { personId } = request.params

  try {
    const personUpdated = await personUseCase.updatePerson(personId, {
      name,
      lastname,
      age
    })

    response.status(200).json({
      data: personUpdated
    })
  } catch (error) {
    next(error)
  }
}

export const deletePerson = async (request, response, next) => {
  const { personId } = request.params

  try {
    const personDeleted = await personUseCase.deletePerson(personId)

    response.status(200).json({
      data: personDeleted
    })
  } catch (error) {
    next(error)
  }
}
