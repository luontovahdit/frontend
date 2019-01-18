import React from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { addHotspot } from '../reducers/mapReducer'
import { showHotspotForm, showHotspot } from '../reducers/viewReducer'
import { setCurrentHotspot } from '../reducers/hotspotReducer'

class Map extends React.Component {

  componentDidMount() {

    mapboxgl.accessToken = process.env.REACT_APP_MAPTOKEN

    // restrict map to Finland
    const bounds = [
      [19.274990495527675, 59.64523662578557], // Southwest coordinates
      [31.618656929369678, 70.13546651354179]  // Northeast coordinates
    ];

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [24.7385109, 60.11021],  // TODO: should update to use user location if available
      zoom: 8,
      maxBounds: bounds
    })

    this.map.addControl(new MapboxLanguage({  defaultLanguage: 'mul' }))

    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      language: 'fi',
      placeholder: 'Etsi...'
    }))

    this.map.on('load', () => {
      this.map.addSource('hotspots', {
        "type": "geojson",
        "data": {
        "type": "FeatureCollection",
        "features": this.props.hotspots
        }
      })

      this.map.addLayer({
        "id": "hotspot",
        "source": "hotspots",
        "type": "symbol",
        "layout": {
          "icon-image": "{icon}-15",
          "icon-allow-overlap": true
        }
      })

    })

    this.map.on('click', 'hotspot', (e) => {
      e.originalEvent.cancelBubble = true
      this.props.setCurrentHotspot(e.features[0].properties.id)
      this.props.showHotspot()
    })

    this.map.on('click', (e) => {
      if (e.originalEvent.cancelBubble){
        return
      }
      console.log(e.lngLat.lng + ' ' + e.lngLat.lat)
      if (this.props.isUserLoggedIn) {
        this.props.showHotspotForm([ e.lngLat.lng, e.lngLat.lat ])
      }

    })
  }

  componentDidUpdate() {
    const source = this.map.getSource('hotspots')
    
    if (source) {
      this.map.getSource('hotspots').setData({
        "type": "FeatureCollection",
        "features": this.props.hotspots
      })
    }
  }

  render() {
    const mapStyle = {
      position: 'absolute',
      top:0,
      bottom:0,
      width:'100%',
      height:'100%',
      textAlign: 'left',
      marginTop: '43px',
      zIndex: 10
    }
    return (
      <div id='map' style={mapStyle} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hotspots: state.map.hotspots,
    isUserLoggedIn: state.view.isUserLoggedIn
  }
}

const mapDispatchToProps = {
  addHotspot,
  showHotspotForm,
  showHotspot,
  setCurrentHotspot
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)