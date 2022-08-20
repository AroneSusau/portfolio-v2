import { errResponse, NewInternalServiceError } from '../../models/errors'
import { Project } from '../../models/project'
import { Status } from '../../models/statuses'
import { isEmpty } from '../../util/helper'

const githubPublicKey = process.env.GITHUB_API_KEY
const githubUser = process.env.GITHUB_USER
const githubAPI = process.env.GITHUB_REPO_ENDPOINT

const headers = {
  Authorization: `Basic ${btoa(`${githubUser}:${githubPublicKey}`)}`,
}

export class Client {
  constructor() {
    if (isEmpty(githubPublicKey)) {
      throw new Error('Github API Key not defined')
    }

    if (isEmpty(githubUser)) {
      throw new Error('Github user not defined')
    }

    if (isEmpty(githubAPI)) {
      throw new Error('Github endpoint not defined')
    }
  }

  async getProjects() {
    return fetch(githubAPI, { headers })
      .then((res) => (res.status != Status.OK ? errResponse(res) : res.json()))
      .then((res) =>
        res.map((item) => {
          const project = new Project(item)
          const validationResult = project.validate()

          if (!validationResult.success) {
            errResponse({
              status: Status.INTERNAL_SERVICE_ERROR,
              statusText: validationResult.value,
            })
          }

          return project
        })
      )
      .catch((err) => {
        console.dir(err)
        return NewInternalServiceError()
      })
  }
}
