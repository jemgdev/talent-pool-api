import { Router } from 'express'
import uploadImages from '../middlewares/upload.images.js'
import { getAllImages, getImage, getImageFromPerson, uploadImage, updateImage, deleteImage } from '../controllers/image.controller.js'
const imageRouter = Router()

imageRouter.get('/', getAllImages)
imageRouter.get('/:imageId', getImage)
imageRouter.get('/persons/:personId', getImageFromPerson)
imageRouter.post('/:personId', uploadImages.single('image'), uploadImage)
imageRouter.put('/:imageId', updateImage)
imageRouter.delete('/:imageId', deleteImage)

export default imageRouter
