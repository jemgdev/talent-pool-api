import PersonUseCase from '../core/person/application/person.usecase.js'
import PersonPrismaRepository from '../core/person/infrastructure/prisma/person.prisma.repository.js'

const personUseCase = new PersonUseCase(new PersonPrismaRepository())

export const getAllPersons = async (request, response, next) => {
  const { age } = request.body

  try {
    const persons = await personUseCase.listAllPersons(age)
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

export const getPersonByIdentification = async (request, response, next) => {
  const { idType, idNumber } = request.body

  try {
    const person = await personUseCase.getPersonByIdentification(idType, idNumber)

    response.status(200).json({
      data: person
    }).end()
  } catch (error) {
    next(error)
  }
}

export const createPerson = async (request, response, next) => {
  const { name, lastname, age, idType, idNumber, cityOfBirth } = request.body

  try {
    const newPerson = {
      name,
      lastname,
      age,
      idType,
      idNumber,
      cityOfBirth
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
  const { name, lastname, idType, idNumber, age, cityOfBirth } = request.body
  const { personId } = request.params

  try {
    const personUpdated = await personUseCase.updatePerson(personId, {
      name,
      lastname,
      idType,
      idNumber,
      cityOfBirth,
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
