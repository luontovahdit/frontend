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
        hotspots={this.props.hotspots}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Peruskartta" >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.kartat.kapsi.fi/peruskartta/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap" checked >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay
          name="<span class='layers-control-label lightsteelblue'>kaivospiirihakemukset</span>">
            <EsriFeatureLayer name="kaivospiirihakemukset"
              color="lightsteelblue"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/0"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay
            name="<span class='layers-control-label steelblue'>kaivospiirit</span>">
            <EsriFeatureLayer
              color="steelblue"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/1"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay
            name="<span class='layers-control-label aqua'>kaivospiirit karenssissa</span>">
            <EsriFeatureLayer name="kaivospiirit_karenssissa"
              color="aqua"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/2"
            >
            </EsriFeatureLayer>
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="<span class='layers-control-label darkcyan'>kaivoslupahakemukset</span>">
            <EsriFeatureLayer name="kaivoslupahakemukset"
              color="darkcyan"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/3"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="<span class='layers-control-label lightslategray'>kaivosalueet voimassa</span>">
            <EsriFeatureLayer name="kaivosalueet_voimassa"
              color="lightslategray"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/4"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="<span class='layers-control-label mediumpurple'>valtaushakemukset</span>">
            <EsriFeatureLayer name="valtaushakemukset"
              color="mediumpurple"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/5"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay
            name="<span class='layers-control-label mediumorchid'>valtaukset</span>">
            <EsriFeatureLayer name="valtaukset"
              color="mediumorchid"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/6"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="<span class='layers-control-label deeppink'>valtaukset karenssissa</span>" >
            <EsriFeatureLayer name="valtaukset_karenssissa"
              color="deeppink"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/7"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="<span class='layers-control-label lightpink'>malminetsintalupahakemukset</span>" >
            <EsriFeatureLayer name="malminetsintalupahakemukset"
              color="lightpink"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/8"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="<span class='layers-control-label violet'>malminetsintaalueet</span>" >
            <EsriFeatureLayer name="malminetsintaalueet"
              color="violet"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/9"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="<span class='layers-control-label sienna'>malminetsintaluvat karenssissa</span>" >
            <EsriFeatureLayer name="malminetsintaluvat_karenssissa"
              color="sienna"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/10"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="<span class='layers-control-label lightsalmon'>varausilmoitushakemukset</span>" >
            <EsriFeatureLayer name="varausilmoitushakemukset"
              color="lightsalmon"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/11"
            ></EsriFeatureLayer>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="<span class='layers-control-label tomato'>varausilmoitukset karenssissa</span>" >
            <EsriFeatureLayer name="varausilmoitukset_karenssissa"
            color="tomato"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/12"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="<span class='layers-control-label firebrick'>varausilmoitukset</span>" >
            <EsriFeatureLayer name="varausilmoitukset"
              color="firebrick"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/13"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="<span class='layers-control-label orange'>kullanhuuhdontaluvat</span>" >
            <EsriFeatureLayer name="kullanhuuhdontaluvat"
              color="orange"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/14"
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="<span class='layers-control-label yellow'>kullanhuuhdontalupahakemukset</span>" >
            <EsriFeatureLayer name="kullanhuuhdontalupahakemukset"
            color="yellow"
              url="https://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/15"
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
