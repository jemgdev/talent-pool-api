import { Router } from 'express'
import uploadImages from '../middlewares/upload.images'
import { getAllImages, getImage, getImagesFromPerson, uploadImage, updateImageById, deleteImageById } from '../controllers/image.controller'
const imageRouter = Router()

imageRouter
  .get('/', getAllImages)
  .get('/:imageId', getImage)
  .get('/persons/:idType/:idNumber', getImagesFromPerson)
  .post('/:idType/:idNumber', uploadImages.single('image'), uploadImage)
  .put('/:imageId', updateImageById)
  .delete('/:imageId', deleteImageById)

export default imageRouter
