import { Contact } from '../../src/models/contact'
import {
  NewBadRequestError,
  NewInternalServiceError,
  NewMethodNotAllowedError,
} from '../../src/models/errors'
import { Methods } from '../../src/models/methods'
import { Status } from '../../src/models/statuses'
import * as sg from '../../src/providers/sendgrid/client'

const sgClient = new sg.Client()

export default async function handler(req, res) {
  if (req.method !== Methods.POST) {
    res
      .status(Status.METHOD_NOT_ALLOWED)
      .json(NewMethodNotAllowedError(req.method))
    return
  }

  const { email, subject, message } = req.body
  const contactEmail = new Contact(email, subject, message)
  const validationResult = contactEmail.validate()

  if (validationResult !== undefined) {
    res.status(Status.BAD_REQUEST).json(NewBadRequestError(validationResult))
    return
  }

  await sgClient
    .sendContactEmail(email, subject, message)
    .then((_) => {
      res.status(Status.NO_CONTENT).end()
      return
    })
    .catch((err) => {
      res.status(Status.INTERNAL_SERVICE_ERROR).json(NewInternalServiceError())
      return
    })
}
