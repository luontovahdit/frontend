import axios from 'axios'
const baseUrl = '/api/comments'

const create = async (comment) => {
  const response = await axios.post(baseUrl, comment, { withCredentials: true })
  return response.data
}

export default { create }