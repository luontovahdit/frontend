// @flow

import React, { Component } from 'react'
import { Map, TileLayer, EsriFeatureLayer,LayersControl, Popup } from './src'
import { connect } from 'react-redux'
import { showHotspotForm, showHotspot } from '../../reducers/viewReducer'
import { setCurrentHotspot } from '../../reducers/hotspotReducer'

type State = {
  lat: number,
  lng: number,
  zoom: number,
}
const { BaseLayer, Overlay } = LayersControl

class EsriGtkMap extends Component<{}, State> {
  state = {
    lat: 68.7512,
    lng: 25.6189,
    zoom: 7,
  }

  handleMapClick = (coordinates) => {
    //console.log('esri-feature-layer example this',this)
    console.log('coordinates2: ', coordinates)
    if (this.props.isUserLoggedIn) {
      this.props.showHotspotForm(coordinates)
    }
  }

  handleHotspotClick = (e) => {
    console.log(e.layer.feature.properties.id)
    this.props.setCurrentHotspot(e.layer.feature.properties.id)
    this.props.showHotspot()
  }

  render() {
    return (
      <Map
        center={[this.state.lat, this.state.lng]}
        zoom={this.state.zoom}
        handleMapClick={this.handleMapClick}
        handleHotspotClick={this.handleHotspotClick}
        hotspots={this.props.hotspots}>

        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Peruskartta" >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.kartat.kapsi.fi/peruskartta/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap" checked >
            <TileLayer
              url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay
          name="<span class='layers-control-label lightsteelblue'>kaivospiirihakemukset</span>">
            <EsriFeatureLayer name="kaivospiirihakemukset"
              color="lightsteelblue"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/0?f=pjson"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay
            name="<span class='layers-control-label steelblue'>kaivospiirit</span>">
            <EsriFeatureLayer
              color="steelblue"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/1?f=pjson"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay
            name="<span class='layers-control-label darkblue'>kaivospiirit karenssissa</span>">
            <EsriFeatureLayer name="kaivospiirit_karenssissa"
              color="darkblue"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/2?f=pjson"
            >
            </EsriFeatureLayer>
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="<span class='layers-control-label burlywood'>kaivoslupahakemukset</span>">
            <EsriFeatureLayer name="kaivoslupahakemukset"
              color="burlywood"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/3?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="<span class='layers-control-label sandybrown'>kaivosalueet voimassa</span>">
            <EsriFeatureLayer name="kaivosalueet_voimassa"
              color="sandybrown"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/4?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="<span class='layers-control-label green'>valtaushakemukset</span>">
            <EsriFeatureLayer name="valtaushakemukset"
              color="green"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/5?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="<span class='layers-control-label forestgreen'>valtaukset</span>">
            <EsriFeatureLayer name="valtaukset"
              color="forestgreen"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/6?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="valtaukset karenssissa" >
            <EsriFeatureLayer name="valtaukset_karenssissa"
              color="darkgreen"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/7?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="malminetsintalupahakemukset" color="lightpink">
            <EsriFeatureLayer name="malminetsintalupahakemukset"
              color="chocolate"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/8?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="malminetsintaalueet" color="lightcoral" >
            <EsriFeatureLayer name="malminetsintaalueet"
              color="saddlebrown"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/9?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="malminetsintaluvat karenssissa" >
            <EsriFeatureLayer name="malminetsintaluvat_karenssissa"
              color="sienna"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/10?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="varausilmoitushakemukset" >
            <EsriFeatureLayer name="varausilmoitushakemukset"
              color="darkviolet"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/11?f=pjson"
            ></EsriFeatureLayer>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="varausilmoitukset karenssissa" >
            <EsriFeatureLayer name="varausilmoitukset_karenssissa"
            color="deeppink"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/12?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="varausilmoitukset" >
            <EsriFeatureLayer name="varausilmoitukset"
              color="firebrick"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/13?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="kullanhuuhdontaluvat" >
            <EsriFeatureLayer name="kullanhuuhdontaluvat"
              color="gold"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/14?f=pjson"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="kullanhuuhdontalupahakemukset" >
            <EsriFeatureLayer name="kullanhuuhdontalupahakemukset"
            color="darkgoldenrod"
              url="http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/15?f=pjson"
            />
          </LayersControl.Overlay>
        </LayersControl>
      </Map>

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
  showHotspotForm,
  showHotspot,
  setCurrentHotspot
}

export default connect(mapStateToProps, mapDispatchToProps)(EsriGtkMap)