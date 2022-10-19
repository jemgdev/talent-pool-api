import { Request, Response } from 'express'

const notFound = (request: Request, response: Response) => {
  response.status(404).json({ 
    statusCode: 404,  
    message: 'Resource not found', 
    data: {} 
  }).end()
}

export default notFound
