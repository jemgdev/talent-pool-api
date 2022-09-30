import express from 'express'
import morgan from 'morgan'
import personRouter from './routes/person.routes.js'
const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.urlencoded({ extended: 'false' }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (request, response) => {
  response.status(201).json({
    message: 'Hello'
  }).end()
})

app.use('/api/persons', personRouter)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${app.get('PORT')}`)
})
