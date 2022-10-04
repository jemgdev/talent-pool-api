import { Router } from 'express'
import uploadImages from '../middlewares/upload.images.js'
import { getAllImages, getImage, getImageFromPerson, uploadImage } from '../controllers/image.controller.js'
const imageRouter = Router()

imageRouter.get('/', getAllImages)
imageRouter.get('/:imageId', getImage)
imageRouter.get('/persons/:personId', getImageFromPerson)
imageRouter.post('/:personId', uploadImages.single('image'), uploadImage)

export default imageRouter
