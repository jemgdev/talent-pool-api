import UploaderRepository from '../../domain/uploader.repository'
import cloudinary from '../../../../cloudinary.sdk'
import fs from 'node:fs/promises'

export default class ImageCloudinaryRepository implements UploaderRepository {
  async uploadImage (path: string) {
    try {
      const { secure_url: secureUrl } = await cloudinary.uploader.upload(path)
      return secureUrl
    } catch (error) {
      await fs.unlink(path)
      console.log(error)
      return ''
    }
  }
}