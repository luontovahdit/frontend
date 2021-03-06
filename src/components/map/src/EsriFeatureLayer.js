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
//import { FeatureLayerService } from  'esri-leaflet'
//import { FeatureManager } from  'esri-leaflet'
//import GeoJSON from './GeoJSON'
//import { geoJson } from 'leaflet'
//import * as fs from 'fs';

type LeafletElement = featureLayer
type Props = { url: string, color: string } & EsriFeatureLayerProps

class EsriFeatureLayer extends MapLayer<LeafletElement, Props> {

  createLeafletElement(props: Props): LeafletElement {
    //console.log('createLeafletElement')
    const { url, color, ...params } = props
    //console.log('params from options:')
    //console.log(this.getOptions(params))
    //console.log('endof params from options')
    let featureLayerParams = {
      "url" : url,
      style: function () {
        return { color: color, weight: 1 };
      },
      "useCors" : true
    }

    var esriLayer = new featureLayer(featureLayerParams)

    /* Testing a signle request to a gtk mapserver
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
    esriLayer.on('loading', function(ev){
      console.log('loading feature layer!',ev)
      return
    })
    esriLayer.on('load', function(ev){
      console.log('loaded all queried feature layers event:',ev)
      return
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
      return Util.template(popupTemplate, e.feature.properties)

    });

    return esriLayer
  }

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
