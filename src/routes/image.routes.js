import { Router } from 'express'
import { getAllImages } from '../controllers/image.controller.js'
const imageRouter = Router()

imageRouter.get('/', getAllImages)

export default imageRouter
