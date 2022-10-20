import { Request, Response, NextFunction } from 'express'
import ImageMongooseRespository from '../core/image/infrastructure/mongoose/image.mongoose.repository'
import DeletePerson from '../core/person/application/delete.person'
import GetPersonByIdentification from '../core/person/application/get.person.by.identification'
import ListAllPersons from '../core/person/application/list.all.persons'
import SavePerson from '../core/person/application/save.person'
import UpdatePersonByIdentification from '../core/person/application/update.person.by.identification'
import PersonPrismaRepository from '../core/person/infrastructure/prisma/person.prisma.repository'
import PersonUuidRepository from '../core/person/infrastructure/uuid/person.uuid.repository'

const listAllPersons = new ListAllPersons(new PersonPrismaRepository())
const getPersonByIdentification = new GetPersonByIdentification(new PersonPrismaRepository())
const savePerson = new SavePerson(new PersonUuidRepository(), new PersonPrismaRepository())
const updatePersonByIdentification = new UpdatePersonByIdentification(new PersonPrismaRepository())
const deletePersonByIdNumber = new DeletePerson(new PersonPrismaRepository(), new ImageMongooseRespository())

export const getAllPersons = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const persons = await listAllPersons.list()
    response.status(200).json({
      status: 'OK',
      message: 'All persons were found',
      data: persons
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getPersonsThatAge = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { ageNumber } = request.params

  try {
    const persons = await listAllPersons.listGreaterOrEqualsToAge(Number(ageNumber))
    response.status(200).json({
      status: 'OK',
      message: 'All persons were found',
      data: persons
    }).end()
  } catch (error) {
    next(error)
  }
}

export const getUniquePerson = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const { idType, idNumber } = request.params

  try {
    const person = await getPersonByIdentification.getPerson(idType, Number(idNumber))
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
  const { idType, idNumber } = request.params
  const { name, lastname, age, cityOfBirth, idType: idTypeBody, idNumber: idNumberBody } = request.body

  try {
    const newPerson = {
      name,
      lastname,
      age,
      idTypeChange: idTypeBody,
      idNumberChange: Number(idNumberBody),
      cityOfBirth
    }

    const message = await updatePersonByIdentification.update(idType, Number(idNumber), newPerson)

    response.status(200).json({
      status: 'OK',
      message,
      data: {}
    })
  } catch (error) {
    next(error)
  }
}

export const deletePersonByIdTypeAndNumber = async (request: Request, response: Response, next: NextFunction) => {
  const { idType, idNumber } = request.params

  try {
    const message = await deletePersonByIdNumber.delete(idType, Number(idNumber))

    response.status(200).json({
      status: 'OK',
      message,
      data: {}
    })
  } catch (error) {
    next(error)
  }
}
