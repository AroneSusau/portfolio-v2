import { Methods } from '../../src/models/methods'
import { Status } from '../../src/models/statuses'
import { Client } from '../../src/providers/github/client'

const githubClient = new Client()

export default async function handler(req, res) {
  if (req.method !== Methods.GET) {
    res
      .status(Status.METHOD_NOT_ALLOWED)
      .json(NewMethodNotAllowedError(req.method))
    return
  }

  await githubClient
    .getProjects()
    .then((data) => res.status(Status.OK).json(data))
    .catch((err) => res.status(Status.INTERNAL_SERVICE_ERROR).json(err))
}
