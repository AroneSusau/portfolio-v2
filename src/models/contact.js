import { isInvalid } from '../util/helper'

export class Contact {
  constructor(email, subject, message) {
    this.email = email
    this.subject = subject
    this.message = message
  }

  validate() {
    if (isInvalid(this.email)) {
      return 'email is invalid'
    }

    if (isInvalid(this.subject)) {
      return 'subject is invalid'
    }

    if (isInvalid(this.message)) {
      return 'message is invalid'
    }

    return undefined
  }
}
