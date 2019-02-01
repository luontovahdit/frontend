// @flow

import { isEqual } from 'lodash'
import { withLeaflet } from './context'
import { EVENTS_RE } from './MapEvented'
import { Layer } from 'leaflet'
import { Util } from 'leaflet'
import { get as esriGet } from 'esri-leaflet'
import { request as esriRequest } from 'esri-leaflet'
import type { EsriFeatureLayerProps } from './types'
import type { GridLayerProps } from './types'
import { BasemapLayer } from 'esri-leaflet'
import { featureLayer } from 'esri-leaflet'
import MapLayer from './MapLayer'
import { connect } from 'react-redux'
//import { FeatureLayerService } from  'esri-leaflet'
//import GeoJSON from './GeoJSON'
//import { geoJson } from 'leaflet'

type LeafletElement = featureLayer
type Props = { url: string, color: string} & EsriFeatureLayerProps

class EsriFeatureLayer extends MapLayer<LeafletElement, Props> {

  /* Parent MapLayer has the component lifecycle functions*/

  //Runs for every gtk layer when loading the app
  createLeafletElement(props: Props): LeafletElement {

    const { url, color, ...params } = props
    let featureLayerParams = {
      "url" : url,
      style: function () {
        return { color: color, weight: 1 };
      },
      "useCors" : true,
      "cacheLayers" :true, // kun tämä on päällä, createNewLayer ajetaan
      "simplifyFactor": 2
      //"timeFilterMode" : 'client'
    }

    var esriLayer = new featureLayer(featureLayerParams)
    //tekeekö featureLayer objekti kaikki kutsut jo taustalla?
    //jos niin, tämän kutsun voisi siirtää järkevämpään paikkaan
    /* Testing a single request to a gtk mapserver
    var serviceUrl = url
    console.log("url",serviceUrl)
    esriRequest("http://gtkdata.gtk.fi/arcgis/rest/services/Tukes/TukesWMS/MapServer/12", {}, function(error, response){
      if(error){
        console.log('error', error);
      } else {
        console.log('response.name', response.name);
      }
    });*/

    esriLayer.on('click', function(ev){
      console.log('feature layer click event: ',ev)
    })
    esriLayer.on('popupopen', function(ev){
      // get the properties of click popup single feature
      console.log('popupopen!',ev.layer.feature.properties)
      return
    })
    //Runs only once when checking the layer checkbox ??
    esriLayer.on('loading', function(ev){
      //console.log('loading feature layer!',ev)
      return
    })
    //Runs only once when checking the layer checkbox ??
    esriLayer.on('load', function(ev){
      console.log('loaded all queried feature layers event:',ev)
      return
    })
    esriLayer.on('remove', function(ev){
      console.log('remove event:',ev)
      return
    })
    //rikkoutuu ennen kun tänne päästään
    esriLayer.on('addfeature', function(ev){
      console.log('removed feature back to map: ',ev)
    })

    esriLayer.metadata(function(error, metadata){
      //console.log('metadata',metadata);
    });

    esriLayer.bindPopup(function(e){
      var popupTemplate = ""
      for(let key in e.feature.properties){
        if (e.feature.properties.hasOwnProperty(key)) {
          if(key.indexOf(".")===-1){
            popupTemplate+=key+" {"+key+"} <br />"
          }
          else{
            //the json object keys need to be renamed as well.. if the problem with template is about "." in json structure
            key = key.replace(".","_")
          }
          //console.log(key + " -> " + e.feature.properties[key]);
        }
      }
      //devnote: we could change the template into semantic UI's modal
      return Util.template(popupTemplate, e.feature.properties)
    });
    return esriLayer
  }

  //Runs on app load (no interaction needed)
  //Seems like not running on layer selection
  updateLeafletElement(fromProps: Props, toProps: Props) {
    super.updateLeafletElement(fromProps, toProps)
    const { url: prevUrl, opacity: _po, zIndex: _pz, ...prevParams } = fromProps
    const { url, opacity: _o, zIndex: _z, ...params } = toProps

    if (url !== prevUrl) {
      this.leafletElement.setUrl(url)
    }
    if (!isEqual(params, prevParams)) {
      this.leafletElement.setParams(params)
    }
  }

  getOptions(params: Object): Object {
    const superOptions = super.getOptions(params)
    return Object.keys(superOptions).reduce((options, key) => {
      if (!EVENTS_RE.test(key)) {
        options[key] = superOptions[key]
      }
      return options
    }, {})
  }
}

export default withLeaflet(EsriFeatureLayer)
//export default connect(EsriFeatureLayerProps)(EsriFeatureLayer)
