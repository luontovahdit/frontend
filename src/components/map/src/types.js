// @flow

import type {
  LatLng as LeafletLatLng,
  LatLngBounds as LeafletLatLngBounds,
  Layer,
  Map,
  Point as LeafletPoint,
  Renderer,
} from 'leaflet'
import type { Node } from 'react'

//TODO:pitäis saada wrapattua, yhdistettyä tai ylipätään exportattua type
import { BasemapLayer } from 'esri-leaflet'
import { FeatureLayer } from 'esri-leaflet'


export type AddLayerHandler = (
  layer: Layer,
  name: string,
  checked?: boolean,
  elementclass :string,
) => void
export type RemoveLayerHandler = (layer: Layer) => void

export type LayerContainer = {
  addLayer: AddLayerHandler,
  removeLayer: RemoveLayerHandler,
}

export type LeafletContext = {
  map?: Map,
  pane?: ?string,
  layerContainer?: ?LayerContainer,
  popupContainer?: ?Layer,
  //TODO: tarviskohan tähän jotain esri-spesifiä? Vai tarviskohan esri oman context:n
}

export type LatLng = LeafletLatLng | Array<number> | Object

export type LatLngBounds = LeafletLatLngBounds | Array<LatLng>

export type ControlPosition =
  | 'topleft'
  | 'topright'
  | 'bottomleft'
  | 'bottomright'

export type Point = [number, number] | LeafletPoint

export type Viewport = {
  center: ?[number, number],
  zoom: ?number,
}

//TODO: vastaavuudet Leafletin API:sta. jonka jälkeen verrataan FeatureLayer:n vastaavaan (parenttiin?)
// TODO: eli onko tiettyjä layer optioneja, jotka tulee kyseeeseen vaan featureLayer:llä?
//https://leafletjs.com/reference-1.3.4.html#gridlayer
export type GridLayerOptions = {
  tileSize?: number | LeafletPoint,
  opacity?: number,
  updateWhenIdle?: boolean,
  updateWhenZooming?: boolean,
  updateInterval?: number,
  zIndex?: number,
  bounds?: LeafletLatLngBounds,
  minZoom?: number,
  maxZoom?: number,
  minNativeZoom?: number,
  maxNativeZoom?: number,
  noWrap?: boolean,
  className?: string,
  keepBuffer?: number,
} & MapLayerProps

//http://esri.github.io/esri-leaflet/api-reference/layers/feature-layer.html
export type FeatureLayerOptions = {
    url :string,
    //pointToLayer :optional function
    //style : optional function
     onEachFeature : onEachFeature,//function from esri-leaflet FeatureLayer. TODO: mitenhän sen sais osoitettua?
     where : string,
     minZoom?: number,
     maxZoom?: number,
     cacheLayers : boolean,
     fields: Array,
     from: number,
     //Popupin määrittelyä tänne?
    //TODO: mahdollisesti jotain samoja optionseja kuin gridLayer:llä
    //TODO: saako featurelayer oletetulta parentiltaan MapLayer:lta "loput"?
} & MapLayerProps

export type PathOptions = {
  stroke?: boolean,
  color?: string,
  weight?: number,
  opacity?: number,
  lineCap?: 'butt' | 'round' | 'square' | 'inherit',
  lineJoin?: 'miter' | 'round' | 'bevel' | 'inherit',
  dashArray?: string,
  dashOffset?: string,
  fill?: boolean,
  fillColor?: string,
  fillOpacity?: number,
  fillRule?: 'nonzero' | 'evenodd' | 'inherit',
  bubblingMouseEvents?: boolean,
  renderer?: Renderer,
  className?: string,
  interactive?: boolean,
  pane?: string,
  attribution?: string,
}

export type DivOverlayOptions = {
  children: Node,
  className?: string,
  offset?: LeafletPoint,
  onClose?: () => void,
  onOpen?: () => void,
}

export type LeafletProps = { leaflet: LeafletContext }

export type MapControlProps = {
  leaflet: LeafletContext,
  position?: ControlPosition,
}

export type MapComponentProps = { leaflet: LeafletContext, pane?: string }

export type DivOverlayProps = MapComponentProps & DivOverlayOptions

export type MapLayerProps = {
  attribution?: string,
  children?: Node,
} & MapComponentProps

export type GridLayerProps = MapLayerProps & GridLayerOptions
export type EsriFeatureLayerProps = MapLayerProps & FeatureLayerOptions
export type PathProps = MapLayerProps & PathOptions
