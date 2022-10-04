import express from 'express'
import morgan from 'morgan'
import handleErrors from './middlewares/handle.errors.js'
import notFound from './middlewares/not.found.js'
import personRouter from './routes/person.routes.js'
import imageRouter from './routes/image.routes.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'images')))

app.get('/', (request, response) => {
  response.status(201).json({
    message: 'Talent Pool API v.1'
  }).end()
})

app.use('/api/v1/persons', personRouter)
app.use('/api/v1/images', imageRouter)

app.use(handleErrors)
app.use(notFound)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${app.get('PORT')}`)
})
