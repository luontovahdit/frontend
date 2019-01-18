// @flow

import { GeoJSON as LeafletGeoJSON, type LatLng, type Layer } from 'leaflet'

import { withLeaflet } from './context'
import Path from './Path'
import type { PathProps } from './types'
console.log('GeoJSON class component')
type LeafletElement = LeafletGeoJSON

type GeoJSONdata = Object | Array<any>

type Props = {
  data: GeoJSONdata,
  pointToLayer?: (point: GeoJSONdata, latlng: LatLng) => Layer,
  style?: (feature: GeoJSONdata) => Object,
  onEachFeature?: (feature: GeoJSONdata, layer: Layer) => void,
  filter?: (feature: GeoJSONdata) => boolean,
  coordsToLatLng?: (coords: GeoJSONdata) => LatLng,
} & PathProps

class GeoJSON extends Path<LeafletElement, Props> {

  createLeafletElement(props: Props): LeafletElement {
    //näitä ei näköjään ajeta! miksei?!
    console.log('GeoJSON createLeafletElement, props.data', props.data)
    console.log('GeoJSON createLeafletElement, this.getOptions(props)', this.getOptions(props))
    return new LeafletGeoJSON(props.data, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    console.log('GeoJSON updateLeafletElement fromProps', fromProps)
    console.log('GeoJSON updateLeafletElement toProps', toProps)
    if (typeof toProps.style === 'function') {
      this.setStyle(toProps.style)
    } else {
      this.setStyleIfChanged(fromProps, toProps)
    }
  }
}

export default withLeaflet(GeoJSON)
