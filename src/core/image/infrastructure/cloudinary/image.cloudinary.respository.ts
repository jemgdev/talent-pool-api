import UploaderRepository from '../../domain/uploader.repository'
import cloudinary from '../../../../sdks/cloudinary.sdk'
import fs from 'node:fs/promises'

export default class ImageCloudinaryRepository implements UploaderRepository {
  async uploadImage (path: string, fileName: string, isUnlinkeable?: boolean): Promise<string> {
    try {
      const { secure_url: secureUrl } = await cloudinary.uploader.upload(path)
      if (isUnlinkeable) {
        await fs.unlink(path)
      }
      return secureUrl
    } catch (error) {
      if (isUnlinkeable) {
        await fs.unlink(path)
      }
      return ''
    }
  }
}