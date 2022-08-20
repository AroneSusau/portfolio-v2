import { isEmpty } from '../util/helper'
import { ValidationResult } from './validationResult'

export class Contact {
  constructor(email, subject, message) {
    this.email = email
    this.subject = subject
    this.message = message
  }

  validate() {
    if (isEmpty(this.email)) {
      return new ValidationResult('email is invalid')
    }

    if (isEmpty(this.subject)) {
      return new ValidationResult('subject is invalid')
    }

    if (isEmpty(this.message)) {
      return new ValidationResult('message is invalid')
    }

    return new ValidationResult('success', true)
  }
}
