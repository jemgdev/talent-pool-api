const ERROR_HANDLERS = {
  Error: (response, error) => response.status(400).json({ message: error.message }).end(),
  defaultError: response => response.status(500).end()
}

const handleErrors = (error, request, response, next) => {
  console.error(error.name)
  console.error(error)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)
}

export default handleErrors
