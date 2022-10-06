import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URL ?? '')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(error => console.log(error.message))
