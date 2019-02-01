const initialState = {
  selectedGTKLayers : [],
  selectedBasemapLayer : [],
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
         ...state, hotspots: action.hotspots
      }
    case 'ADD_HOTSPOT':
      return {
       ...state, hotspots: state.hotspots.concat(action.hotspot)
      }
    case 'SELECT_BASEMAP_LAYER':
      return {
          ...state,selectedBasemapLayer: action.basemapLayer
      }
    case 'SELECT_GTK_LAYER':
      return {
         ...state, selectedGTKLayers: state.selectedGTKLayers.concat(action.GTKLayer)
      }
    case 'DESELECT_GTK_LAYER':
      return {
         ...state, selectedGTKLayers:state.selectedGTKLayers.slice(action.GTKLayer)
      }
      case 'SELECT_GTK_FEATURE':
        return {
           ...state, selectedGTKFeature: action.GTKFeature 
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
//TODO: finish if this operation is necessary
/*export const setGTKLayersOnMap = (gtklayers) => {
  return dispatch => {
    const gtkFeatures = gtklayers.map(hs => {
      //TODO: tarvisiko tähän kirjoittaa auki featureLayer() class constructorin param optionsit?
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
    console.log(gtkFeatures)
    dispatch({
      type: 'SET_HOTSPOTS',
      hotspots: gtkFeatures
    })
  }
}*/

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
