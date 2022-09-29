import Person from './person/domain/person.model.js'
import express from 'express'
import morgan from 'morgan'
const app = express()

app.set('PORT', process.env.PORT || 3000)

app.use(express.urlencoded({ extended: 'false' }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (request, response) => {
  const person = new Person({ name: 'josue', lastname: 'medina', age: 12 })

  response.json({
    message: person.getPerson()
  })
})

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${app.get('PORT')}`)
})
