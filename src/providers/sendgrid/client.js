import { isEmpty } from '../../util/helper'

const sgMail = require('@sendgrid/mail')

const sgAPIKey = process.env.SENDGRID_API_KEY
const sgTemplateId = process.env.SENDGRID_TEMPLATE_ID
const sgReceiver = process.env.SENDGRID_RECEIVER
const sgSender = process.env.SENDGRID_SENDER

sgMail.setApiKey(sgAPIKey)

export class Client {
  constructor() {
    if (isEmpty(sgAPIKey)) {
      throw new Error('Sendgrid API Key not defined')
    }

    if (isEmpty(sgTemplateId)) {
      throw new Error('Sendgrid Template ID not defined')
    }

    if (isEmpty(sgReceiver)) {
      throw new Error('Sendgrid Receiver not defined')
    }

    if (isEmpty(sgSender)) {
      throw new Error('Sendgrid Sender not defined')
    }
  }

  async sendContactEmail(email, subject, message) {
    return await this.sendTemplate({
      sender: email,
      subject,
      message,
    })
  }

  async sendTemplate(templateData) {
    const msg = {
      to: sgReceiver,
      from: sgSender,
      templateId: sgTemplateId,
      dynamicTemplateData: templateData,
    }

    return await sgMail
      .send(msg)
      .then((_) => {})
      .catch((err) => console.dir(err))
  }
}
