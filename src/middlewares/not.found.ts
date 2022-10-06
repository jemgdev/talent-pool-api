import { Response } from 'express'

const notFound = (response: Response) => {
  response.status(404).json({
    message: 'Resource not found'
  }).end()
}

export default notFound
