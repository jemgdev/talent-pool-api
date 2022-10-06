import UploaderRepository from '../../domain/uploader.repository'
import cloudinary from '../../../../sdk/cloudinary.sdk'
import fs from 'node:fs/promises'

export default class ImageCloudinaryRepository implements UploaderRepository {
  async uploadImage (path: string) {
    try {
      const { secure_url: secureUrl } = await cloudinary.uploader.upload(path)
      await fs.unlink(path)
      return secureUrl
    } catch (error) {
      console.log(error)
      await fs.unlink(path)
      return ''
    }
  }
}