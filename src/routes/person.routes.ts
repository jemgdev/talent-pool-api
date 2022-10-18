import { Router } from 'express'
import { getAllPersons, getPersonById, getPersonByIdTypeAndNumber, createPerson, updatePerson, deletePerson, deletePersonByIdTypeAndNumber } from '../controllers/person.controller'
const personRouter = Router()

personRouter
  .get('/', getAllPersons)
  .get('/identification', getPersonByIdTypeAndNumber)
  .get('/:personId', getPersonById)
  .post('/', createPerson)
  .put('/:personId', updatePerson)
  .delete('/', deletePersonByIdTypeAndNumber)
  .delete('/:personId', deletePerson)

export default personRouter
