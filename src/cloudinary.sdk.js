import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  secure: true,
  sign_url: process.env.CLOUDINARY_URL
})

export default cloudinary
