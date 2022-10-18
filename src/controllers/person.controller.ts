import { Request, Response, NextFunction } from 'express'
import DeletePersonById from '../core/person/application/delete.person.by.id'
import DeletePersonByIdNumber from '../core/person/application/delete.person.by.id.number'
import GetPersonByIdentification from '../core/person/application/get.person.by.identification'
import GetUniquePersonById from '../core/person/application/get.unique.person.by.id'
import ListAllPersons from '../core/person/application/list.all.persons'
import SavePerson from '../core/person/application/save.person'
import UpdatePersonById from '../core/person/application/update.person.by.id'
import PersonPrismaRepository from '../core/person/infrastructure/prisma/person.prisma.repository'
import PersonUuidRepository from '../core/person/infrastructure/uuid/person.uuid.repository'

const listAllPersons = new ListAllPersons(new PersonPrismaRepository())
const getUniquePersonById = new GetUniquePersonById(new PersonPrismaRepository())
const getPersonByIdentification = new GetPersonByIdentification(new PersonPrismaRepository())
const savePerson = new SavePerson(new PersonUuidRepository(), new PersonPrismaRepository())
const updatePersonById = new UpdatePersonById(new PersonPrismaRepository())
const deletePersonById = new DeletePersonById(new PersonPrismaRepository())
const deletePersonByIdNumber = new DeletePersonByIdNumber(new PersonPrismaRepository())


export const getAllPersons = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { age } = request.body

  try {
    const persons = await listAllPersons.list(Number(age))
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
    const person = await getUniquePersonById.getPerson(personId)
    response.status(200).json({
      status: 'OK',
      message: 'The person was found',
      data: person
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getPersonByIdTypeAndNumber = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { idType, idNumber } = request.body

  try {
    const person = await getPersonByIdentification.getPerson(idType, idNumber)

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
    const personSaved = await savePerson.save(name, lastname, age, idType, idNumber, cityOfBirth)

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

    const personUpdated = await updatePersonById.update(personId, newPerson)

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
    const personDeleted = await deletePersonById.deletePerson(personId)

    response.status(200).json({
      status: 'OK',
      message: 'The person was deleted',
      data: personDeleted
    })
  } catch (error) {
    next(error)
  }
}

export const deletePersonByIdTypeAndNumber = async (request: Request, response: Response, next: NextFunction) => {
  const { idNumber } = request.body

  try {
    const personDeleted = await deletePersonByIdNumber.deletePerson(Number(idNumber))

    response.status(200).json({
      status: 'OK',
      message: 'The person was deleted',
      data: personDeleted
    })
  } catch (error) {
    next(error)
  }
}
