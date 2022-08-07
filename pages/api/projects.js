import { NextApiRequest, NextApiResponse } from 'next'

function unixTimestamp() {
  return Math.floor(Date.now() / 1000)
}

const projects = [
  {
    title: 'example a',
    description: 'example b',
    icon: 'example c',
    link: 'example d',
  },
]

/**
 * Endpoint handler
 * @param {NextApiRequest} req
 * @param {NextApiResponse} res
 */
export default function handler(req, res) {
  res.status(200).json({
    timestamp: unixTimestamp(),
    data: projects,
  })
}
