import axios from 'axios'
const baseUrl = '/api/comments'

const create = async (comment) => {
  const response = await axios.post(baseUrl, comment, { withCredentials: true })
  return response.data
}

const upVote = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}/vote`,
    { type: 'upVote' },
    { withCredentials: true })
  return response.data
}

const downVote = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}/vote`,
    { type: 'downVote' },
    { withCredentials: true })
  return response.data
}

export default { create, upVote, downVote }