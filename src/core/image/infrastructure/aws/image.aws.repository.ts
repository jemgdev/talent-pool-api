import fs from 'node:fs/promises'
import fsNonPromise from 'node:fs'
import UploaderRepository from '../../domain/uploader.repository'
import storage from '../../../../sdks/aws.sdk'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export default class ImageAwsRepository implements UploaderRepository {
  async uploadImage (path: string, fileName: string) {
    try {
      await storage.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fsNonPromise.createReadStream(path)
      }))
      await fs.unlink(path)
      return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
    } catch (error) {
      await fs.unlink(path)
      return ''
    }
  }
}