import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'node:path'
import { v4 as uuid } from 'uuid'

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, path.join(__dirname, '../images'))
  },
  filename: (request, file, cb) => {
    const ext = file.originalname.split('.')[1]
    cb(null, `${uuid()}.${ext}`)
  }
})

const fileFilter = (request: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export default multer({ storage, fileFilter })
