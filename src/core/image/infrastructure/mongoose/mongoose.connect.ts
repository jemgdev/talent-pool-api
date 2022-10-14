import mongoose from 'mongoose'

let mongoConnectionString = ''

if (process.env.NODE_ENV === 'test') {
  mongoConnectionString = process.env.MONGODB_URL_TEST ?? ''
} else if (process.env.NODE_ENV === 'dev') {
  mongoConnectionString = process.env.MONGODB_URL ?? ''
}

mongoose.connect(mongoConnectionString)
  .then(() => console.log(`MongoDB ${process.env.NODE_ENV} connected successfully`))
  .catch(error => console.log(error.message))
