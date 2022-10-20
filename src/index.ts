import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import handleErrors from './middlewares/handle.errors'
import notFound from './middlewares/not.found'
import personRouter from './routes/person.routes'
import imageRouter from './routes/image.routes'
import path from 'node:path'

import swaggerUI from 'swagger-ui-express'
import { apiDocumentation } from './docs/apidoc'

const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'images')))

app.get('/', (request: Request, response: Response) => {
  response.status(201).json({
    message: 'Talent Pool API v.1'
  }).end()
})

app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiDocumentation))
app.use('/api/v1/persons', personRouter)
app.use('/api/v1/images', imageRouter)

app.use(handleErrors)
app.use(notFound)


const server = app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${app.get('PORT')}`)
})

export default {
  server,
  app
}

