const initialState = {
  hotspots:  [
    {
      "type": "Feature",
      "properties": {
        "id": "5c1e0b21ee7a321eb40f3e12",
        "icon": "star"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [24.8297076, 60.3190656]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "id": "5c1e2ecbc969793cecad491a",
        "icon": "star"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [25, 60.2]
      }
    }
  ]
}

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HOTSPOTS':
      return {
        hotspots: action.hotspots
      }
    case 'ADD_HOTSPOT':
      return {
        hotspots: state.hotspots.concat(action.hotspot)
      }
    default:
      return state
  }
}

export const setHotspotsOnMap = (hotspots) => {
  return dispatch => {
    const hotspotFeatures = hotspots.map(hs => {
      return {
        'type': 'Feature',
        'properties': {
          'id': hs.id,
          'icon': 'star'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': hs.location.coordinates
        }
      }
    })
    console.log(hotspotFeatures)
    dispatch({
      type: 'SET_HOTSPOTS',
      hotspots: hotspotFeatures
    })
  }
}

export const addHotspot = (hotspot) => {
  return dispatch => {
    let newHotspot = {
      "type": "Feature",
      "properties": {
        "id": hotspot.id,
        "icon": "star"
      },
      "geometry": {
        'type': 'Point',
        'coordinates': hotspot.location.coordinates
      }
    }
    console.log(newHotspot)
    console.log(hotspot.location)
    dispatch({
      type: 'ADD_HOTSPOT',
      hotspot: newHotspot
    })
  }
}

export default mapReducer