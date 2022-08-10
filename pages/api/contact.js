const sgMail = require('@sendgrid/mail')

const sgAPIKey = process.env.SENDGRID_API_KEY
const sgTemplateId = process.env.SENDGRID_TEMPLATE_ID
const sgReceiver = process.env.SENDGRID_RECEIVER

sgMail.setApiKey(sgAPIKey)

const ErrCodeMethodNotAllowedError = 'MethodNotAllowedError'
const ErrCodeBadRequestError = 'BadRequestError'
const ErrCodeInternalServiceError = 'InternalServiceError'
const NewInternalServiceError = () => {
  return {
    code: ErrCodeInternalServiceError,
    message: 'The service was unable to execute your request.',
  }
}

const isInvalid = (input) => input === '' || input === undefined

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({
      code: ErrCodeMethodNotAllowedError,
      message: 'Method not allowed',
    })
    return
  }

  const { email, subject, message } = req.body

  if (isInvalid(email)) {
    res.status(400).json({
      code: ErrCodeBadRequestError,
      message: 'Email is invalid',
    })
    return
  }

  if (isInvalid(subject)) {
    res.status(400).json({
      code: ErrCodeBadRequestError,
      message: 'Subject is invalid',
    })
    return
  }

  if (isInvalid(message)) {
    res.status(400).json({
      code: ErrCodeBadRequestError,
      message: 'Message is invalid',
    })
    return
  }

  const msg = {
    to: sgReceiver,
    from: email,
    templateId: sgTemplateId,
    dynamicTemplateData: {
      sender: email,
      subject,
      message,
    },
  }

  await sgMail
    .send(msg)
    .then((_) => {
      res.status(204).end()
      return
    })
    .catch((err) => {
      console.dir(err)
      res.status(500).json(NewInternalServiceError())
      return
    })
}
