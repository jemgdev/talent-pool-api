import { Router } from 'express'
import { getAllPersons, getPersonById, getPersonByIdentification, createPerson, updatePerson, deletePerson } from '../controllers/person.controller.js'
const personRouter = Router()

personRouter.get('/', getAllPersons)
personRouter.get('/identification', getPersonByIdentification)
personRouter.get('/:personId', getPersonById)
personRouter.post('/', createPerson)
personRouter.put('/:personId', updatePerson)
personRouter.delete('/:personId', deletePerson)

export default personRouter
