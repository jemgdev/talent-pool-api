const notFound = (request, response, next) => {
  response.status(404).json({
    message: 'Resource not found'
  })
}

export default notFound
