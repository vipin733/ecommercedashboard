function errorMessage(errors) {
  console.log(errors);
  
  try {
    let errorMsg = ''
    if (errors.status === 500) {
      errorMsg = 'Server error'
    } else if (errors.message) {
      errorMsg = errors.message
    } else {
      const errorsData = errors.data.errors
      errorMsg = errorsData[Object.keys(errorsData)[0]][0]
    }
    return errorMsg
  } catch (error) {
    return 'Server error'
  }
}

export default errorMessage
