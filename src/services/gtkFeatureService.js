import { featureLayer } from 'esri-leaflet'

const baseUrl = 'https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/'

const getAllGTK = async () => {
  const response = tähän vois testillä hakea koko servicen
  return response.data
}
/*
const getHotspotsByCoordinates = async (lng, lat) => {
  const response = await axios.get(`${baseUrl}/@${lng},${lat}`)
  return response.data
}*/

const getGTKLayer = async (id) => {
  const response = await fetch(`${baseUrl}/${id}?f=pjson`)
  return response.data
}
const getGTKFeatureLayer = (params) => {
  //TODO process params (options) if not in right format already
  var response = new featureLayer(params)
  return response
}



export default { getAllGTK, getGTKLayer }
