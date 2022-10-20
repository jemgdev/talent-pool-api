import Image from './image.model'

export default interface ImagePersistanceRepository {
  getAllImages: () => Promise<Image[] | null>
  getImageById: (imageId: string) => Promise<Image | null>
  getImagesByPersonId: (personId: string) => Promise<Image[] | null>
  saveImageByPersonId: ({ personId , imageId , url , title , description }: { personId: string, imageId: string, url: string, title: string, description: string }) => Promise<Image | null> 
  updateImageById: ({ imageId , title , description  }: { imageId: string, title: string, description: string }) => Promise<Image | null> 
  deleteImageById: (imageId: string) => Promise<Image | null> 
  deleteImagesByPersonId: (personId: string) => Promise<void | null>
}
