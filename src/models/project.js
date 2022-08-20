import { isEmpty } from '../util/helper'
import { ValidationResult } from './validationResult'

export class Project {
  constructor({ name, description, html_url, topics }) {
    this.name = name
    this.description = description
    this.url = html_url
    this.topics = topics
  }

  validate() {
    if (isEmpty(this.name)) {
      return new ValidationResult('Name cannot be empty')
    }

    if (isEmpty(this.description)) {
      return new ValidationResult('Description cannot be empty')
    }

    if (isEmpty(this.url)) {
      return new ValidationResult('URL cannot be empty')
    }

    if (isEmpty(this.topics)) {
      return new ValidationResult('topics cannot be empty')
    }

    return new ValidationResult('success', true)
  }
}
