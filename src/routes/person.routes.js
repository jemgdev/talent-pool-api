import { Router } from 'express'
import { getAllPersons } from '../controllers/person.controller.js'
const personRouter = Router()

personRouter.get('/', getAllPersons)

export default personRouter
