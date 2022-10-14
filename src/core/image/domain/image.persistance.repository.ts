import Image from './image.model'

export default interface ImagePersistanceRepository {
  getAllImages: () => Promise<Image[] | null>
  getImageById: (imageId: string) => Promise<Image | null>
  getImagesByPersonId: (personId: string) => Promise<Image[] | null>
  saveImageByPersonId: (personId: string, imageId: string, url: string, title: string, description: string) => Promise<Image | null> 
  updateImageById: (imageId: string, title: string, description: string) => Promise<Image | null> 
  deleteImageById: (imageId: string) => Promise<Image | null> 
}
