import React, { Component } from 'react'
//import { Embed } from 'semantic-ui-react'
import EsriGtkMap from './EsriGtkMap'
import './esri-gtk-map.css'

class MapContainer extends Component {
  render() {
    return (
    <div id ="MapContainer">
      <EsriGtkMap />
    </div>
    )
  }
}

export default MapContainer
