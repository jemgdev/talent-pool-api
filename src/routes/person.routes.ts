import { Router } from 'express'
import { getAllPersons, getPersonById, getPersonByIdentification, createPerson, updatePerson, deletePerson, deletePersonByIdNumber } from '../controllers/person.controller'
const personRouter = Router()

personRouter
  .get('/', getAllPersons)
  .get('/identification', getPersonByIdentification)
  .get('/:personId', getPersonById)
  .post('/', createPerson)
  .put('/:personId', updatePerson)
  .delete('/', deletePersonByIdNumber)
  .delete('/:personId', deletePerson)

export default personRouter
