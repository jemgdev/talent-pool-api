import { Router } from 'express'
import { getAllPersons, getUniquePerson, createPerson, updatePerson, deletePersonByIdTypeAndNumber, getPersonsThatAge } from '../controllers/person.controller'
const personRouter = Router()

personRouter
  .get('/', getAllPersons)
  .get('/age/:ageNumber', getPersonsThatAge)
  .get('/:idType/:idNumber', getUniquePerson)
  .post('/', createPerson)
  .put('/:idType/:idNumber', updatePerson)
  .delete('/:idType/:idNumber', deletePersonByIdTypeAndNumber)

export default personRouter
