import { Request, Response, NextFunction } from 'express'
import PersonUseCase from '../core/person/application/person.usecase'
import PersonPrismaRepository from '../core/person/infrastructure/prisma/person.prisma.repository'

const personUseCase = new PersonUseCase(new PersonPrismaRepository())

export const getAllPersons = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { age } = request.body

  try {
    const persons = await personUseCase.listAllPersons(Number(age))
    response.status(200).json({
      status: 'OK',
      message: 'All persons were found',
      data: persons
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getPersonById = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { personId } = request.params

  try {
    const person = await personUseCase.getUniquePerson(personId)
    response.status(200).json({
      status: 'OK',
      message: 'The person was found',
      data: person
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getPersonByIdentification = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { idType, idNumber } = request.body

  try {
    const person = await personUseCase.getPersonByIdentification(idType, idNumber)

    response.status(200).json({
      status: 'OK',
      message: 'The person was found',
      data: person
    }).end()
  } catch (error) {
    next(error)
  }
}

export const createPerson = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { name, lastname, age, idType, idNumber, cityOfBirth } = request.body

  try {
    const personSaved = await personUseCase.savePerson(name, lastname, age, idType, idNumber, cityOfBirth)

    response.status(201).json({
      status: 'OK',
      message: 'The person was created',
      data: personSaved
    })
  } catch (error) {
    next(error)
  }
}

export const updatePerson = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { name, lastname, idType, idNumber, age, cityOfBirth } = request.body
  const { personId } = request.params

  try {
    const newPerson = {
      name,
      lastname,
      age,
      idType,
      idNumber,
      cityOfBirth
    }

    const personUpdated = await personUseCase.updatePerson(personId, newPerson)

    response.status(200).json({
      status: 'OK',
      message: 'The person was updated',
      data: personUpdated
    })
  } catch (error) {
    next(error)
  }
}

export const deletePerson = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { personId } = request.params

  try {
    const personDeleted = await personUseCase.deletePersonById(personId)

    response.status(200).json({
      status: 'OK',
      message: 'The person was deleted',
      data: personDeleted
    })
  } catch (error) {
    next(error)
  }
}

export const deletePersonByIdNumber = async (request: Request, response: Response, next: NextFunction) => {
  const { idNumber } = request.body

  try {
    const personDeleted = await personUseCase.deletePersonByIdNumber(Number(idNumber))

    response.status(200).json({
      status: 'OK',
      message: 'The person was deleted',
      data: personDeleted
    })
  } catch (error) {
    next(error)
  }
}
