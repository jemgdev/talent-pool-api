import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { v4 as uuid } from 'uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, path.join(__dirname, '../images'))
  },
  filename: (request, file, cb) => {
    const ext = file.originalname.split('.')[1]
    console.log(ext)
    cb(null, `${uuid()}.${ext}`)
  }
})

const fileFilter = (request, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export default multer({ storage, fileFilter })
