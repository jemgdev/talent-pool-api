import { Router } from 'express'
import { getAllPersons, getPersonById, createPerson, updatePerson, deletePerson } from '../controllers/person.controller.js'
const personRouter = Router()

personRouter.get('/', getAllPersons)
personRouter.get('/:personId', getPersonById)
personRouter.post('/', createPerson)
personRouter.patch('/:personId', updatePerson)
personRouter.delete('/:personId', deletePerson)

export default personRouter
