import axios from 'axios'
const baseUrl = '/api/hotspots'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getHotspotsByCoordinates = async (lng, lat) => {
  const response = await axios.get(`${baseUrl}/@${lng},${lat}`)
  return response.data
}

const getHotspot = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (hotspot) => {
  const response = await axios.post(baseUrl, hotspot, { withCredentials: true })
  return response.data
}

export default { getAll, getHotspotsByCoordinates, getHotspot, create }