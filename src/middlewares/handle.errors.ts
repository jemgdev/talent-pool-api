import { Response } from 'express'

const ERROR_HANDLERS = {
  Error: (response: Response, error: any) => response.status(400).json({ message: error.message }).end(),
  TypeError: (response: Response, error: any) => response.status(400).json({ message: error.message }).end(),
  P2002: (response: Response) => response.status(400).json({ message: 'The id number is already registered' }).end(),
  defaultError: (response: Response, error: any) => response.status(500).json({ message: error.message }).end()
}

const handleErrors = (error: any, response: Response) => {
  console.error(error.name)
  console.error(error)
  const handler = ERROR_HANDLERS[error.code || error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)
}

export default handleErrors
