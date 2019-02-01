import React from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
//import Map from './components/Map'
import Map from './components/map/MapContainer'
import MenuBar from './components/MenuBar'
import HotspotForm from './components/HotspotForm'
import Hotspot from './components/Hotspot'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { initialiseHotspots } from './reducers/hotspotReducer'
import { setHotspotsOnMap } from './reducers/mapReducer'
require('leaflet/dist/leaflet.css');

class App extends React.Component {

  async componentDidMount() {
    await this.props.initialiseHotspots()
    if (this.props.hotspots) {
      console.log(this.props.hotspots)
      this.props.setHotspotsOnMap(this.props.hotspots)
    }
    //TODO: finish or clear
    //await this.props.initialiseGTKLayers()
    //await this.prosp.initialiseBaseMapLayers()
    /*if (this.props.selectedBasemapLayer) {
      console.log('selectedBasemapLayer: '.this.props.selectedBasemapLayer)
      this.props.setGTKLayersOnMap(this.props.gtklayers)
    }*/

  }
  render() {
     return (
      <div>
        <div>
          <MenuBar />
        </div>
        <div>
          <Map />
        </div>
        <HotspotForm />
        <Hotspot />
        <LoginForm />
        <RegisterForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hotspots: state.hotspot.hotspots
  }
}

const mapDispatchToProps = {
  initialiseHotspots,
  setHotspotsOnMap
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
