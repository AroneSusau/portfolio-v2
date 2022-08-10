const ErrCodeInternalServiceError = 'InternalServiceError'
const NewInternalServiceError = () => {
  return {
    code: ErrCodeInternalServiceError,
    message: 'The service was unable to execute your request.',
  }
}

const ToProjectsResponse = ({ name, description, html_url, topics }) => {
  return {
    name,
    description,
    url: html_url,
    topics,
  }
}

export default async function handler(req, res) {
  const githubAPI = 'https://api.github.com/users/AroneSusau/repos'
  const githubUser = 'AroneSusau'

  // Safe restricted readonly key
  const githubPublicKey = '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'

  await getProjectsHandler(req, res, githubAPI, githubUser, githubPublicKey)
}

export async function getProjectsHandler(
  req,
  res,
  githubAPI,
  githubUser,
  githubPublicKey
) {
  const data = await fetch(githubAPI, {
    headers: {
      Authorization: `Basic ${btoa(`${githubUser}:${githubPublicKey}`)}`,
    },
  })
    .then((res) => {
      if (res.status > 299) {
        throw new Error(`${res.status}: ${res.statusText}`)
      }

      return res.json()
    })
    .then((res) => res.map((item) => ToProjectsResponse(item)))
    .catch((err) => {
      console.dir(err)
      return NewInternalServiceError()
    })

  if (data.code === ErrCodeInternalServiceError) {
    res.status(500).json(data)
    return
  }

  res.status(200).json(data)
}
