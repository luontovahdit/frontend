import axios from 'axios'

const login = async (credentials) => {
  const response = await axios.post('/login', credentials)
  return response.data
}

const logout = async () => {
  const response = await axios.post('/logout', { withCredentials: true })
  return response.data
}

const register = async (userInfo) => {
  const response = await axios.post('/register', userInfo)
  return response.data
}

export default { login, logout, register }