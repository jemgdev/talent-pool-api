/**
 * @class ImageRepository
 */

export default class ImageRepository {
  constructor () {
    if (this.constructor === ImageRepository) {
      throw new Error("Abstract classes can't be instantiated.")
    }
  }

  getAllImages () {
    throw new Error("Method 'getAllImages()' must be implemented.")
  }

  getImageById (imageId) {
    throw new Error("Method 'getImageById()' must be implemented.")
  }

  getImagesByPersonId ({ personId }) {
    throw new Error("Method 'getImageByPersonId()' must be implemented.")
  }

  saveImageByPersonId (personId, { url, title, description }) {
    throw new Error("Method 'uploadImage()' must be implemented.")
  }

  updateImageById (imageId, { url, title, description }) {
    throw new Error("Method 'updateImageById()' must be implemented.")
  }

  deleteImageById (imageId) {
    throw new Error("Method 'deleteImageById()' must be implemented.")
  }
}
