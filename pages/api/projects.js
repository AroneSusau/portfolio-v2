import { NewInternalServiceError } from '../../src/models/errors'
import { Methods } from '../../src/models/methods'
import { Status } from '../../src/models/statuses'

const githubPublicKey = process.env.GITHUB_API_KEY
const githubUser = process.env.GITHUB_USER
const githubAPI = process.env.GITHUB_REPO_ENDPOINT

const ToProjectsResponse = ({ name, description, html_url, topics }) => {
  return {
    name,
    description,
    url: html_url,
    topics,
  }
}

const errResponse = ({ status, statusText }) => {
  throw new Error(`${status}: ${statusText}`)
}

const headers = {
  Authorization: `Basic ${btoa(`${githubUser}:${githubPublicKey}`)}`,
}

export default async function handler(req, res) {
  if (req.method !== Methods.GET) {
    res
      .status(Status.METHOD_NOT_ALLOWED)
      .json(NewMethodNotAllowedError(req.method))
    return
  }

  await fetch(githubAPI, { headers })
    .then((res) => (res.status != Status.OK ? errResponse(res) : res.json()))
    .then((res) => res.map((item) => ToProjectsResponse(item)))
    .then((data) => res.status(Status.OK).json(data))
    .catch((err) => {
      console.dir(err)
      res.status(Status.INTERNAL_SERVICE_ERROR).json(NewInternalServiceError())
    })
}
