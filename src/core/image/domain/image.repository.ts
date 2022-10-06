import IImage from './image.interface'

export default interface ImageRepository {
  getAllImages: () => Promise<IImage[] | null>
  getImageById: (imageId: string) => Promise<IImage | null>
  getImagesByPersonId: (personId: string) => Promise<IImage[] | null>
  saveImageByPersonId: (personId: string, imageId: string, url: string, title: string, description: string) => Promise<IImage | null> 
  updateImageById: (imageId: string, title: string, description: string) => Promise<IImage | null> 
  deleteImageById: (imageId: string) => Promise<IImage | null> 
}
