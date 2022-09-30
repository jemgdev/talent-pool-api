import { Router } from 'express'
import { getAllPersons, getPersonById } from '../controllers/person.controller.js'
const personRouter = Router()

personRouter.get('/', getAllPersons)
personRouter.get('/:personId', getPersonById)

export default personRouter
