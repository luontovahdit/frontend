// @flow

import React, { Component, Fragment } from 'react'
import { Map } from './Map'
import TileLayer  from './TileLayer'
import Marker  from './Marker'
import Popup from './Popup'

type Position = [number, number]

type Props = {|
  content: string,
  position: Position,
|}

type MarkerData = {| ...Props, key: string |}

const HotspotPopupMarker = ({ content, position }: Props) => (
  <Marker position={position}>
    <Popup>{content}</Popup>
  </Marker>
)

const HotspotMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers.map(({ key, ...props }) => (
    <HotspotPopupMarker key={key} {...props} />
  ))
  return <Fragment>{items}</Fragment>
}

type State = {
  markers: Array<MarkerData>,
}

export default class MapHotspots extends Component<{}, State> {
  state = {
    markers: [
      { key: 'marker1', position: [68.7112, 25.6089], content: 'Lisätty karttakohde 1  Tähän valokuvaa yms. ' },
      { key: 'marker2', position: [68.7912, 25.6489], content: 'Lisätty karttakohde 2. Tähän valokuvaa yms. ' },
      { key: 'marker3', position: [68.8512, 25.6889], content: 'Lisätty karttakohde 3. Tähän valokuvaa yms. ' },
    ],
  }

  render() {
    return (
        <HotspotMarkersList markers={this.state.markers} />
    )
  }
}
