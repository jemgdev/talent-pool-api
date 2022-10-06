import { Router } from 'express'
import uploadImages from '../middlewares/upload.images'
import { getAllImages, getImage, getImageFromPerson, uploadImage, updateImage, deleteImage } from '../controllers/image.controller'
const imageRouter = Router()

imageRouter
  .get('/', getAllImages)
  .get('/:imageId', getImage)
  .get('/persons/:personId', getImageFromPerson)
  .post('/:personId', uploadImages.single('image'), uploadImage)
  .put('/:imageId', updateImage)
  .delete('/:imageId', deleteImage)

export default imageRouter
