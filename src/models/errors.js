export const ErrCodeMethodNotAllowedError = 'MethodNotAllowedError'
export const ErrCodeBadRequestError = 'BadRequestError'
export const ErrCodeInternalServiceError = 'InternalServiceError'

export const NewInternalServiceError = () => {
  return {
    code: ErrCodeInternalServiceError,
    message: 'The service was unable to execute your request.',
  }
}

export const NewMethodNotAllowedError = (method) => {
  return {
    code: ErrCodeMethodNotAllowedError,
    message: `Method ${method} is not`,
  }
}

export const NewBadRequestError = (reason) => {
  return {
    code: ErrCodeBadRequestError,
    message: reason,
  }
}
