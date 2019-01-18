import hotspotService from '../services/hotspotService'
import commentService from '../services/commentService'

const initialState = {
  hotspots:  [],
  currentHotspot: null,
  newHotspot: null,
  error: null
}

const hotspotReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HOTSPOTS_SUCCESS':
      return {
        hotspots: action.hotspots,
        error: null
      }
    case 'GET_HOTSPOTS_FAIL':
      return {
        ...state,
        error: action.error
      }
    case 'SET_CURRENT_HOTSPOT':
      return {
        ...state,
        currentHotspot: state.hotspots.find(hs => hs.id === action.id),
        error: null
      }
    case 'ADD_HOTSPOT_SUCCESS':
      return {
        ...state,
        hotspots: state.hotspots.concat(action.hotspot),
        newHotspot: action.hotspot,
        error: null
      }
    case 'ADD_HOTSPOT_FAIL':
      return {
        ...state,
        error: action.error
      }
    case 'ADD_COMMENT_SUCCESS':
      const hotspot = {...state.hotspots.find(hs => hs.id === action.comment.inHotspot.id)}
      hotspot.comments = hotspot.comments.concat(action.comment)
      return {
        ...state,
        hotspots: state.hotspots.map(hs =>
          hs.id === hotspot.id
          ? hotspot
          : hs),
        currentHotspot: hotspot,
        error: null
      }
    case 'ADD_COMMENT_FAIL':
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export const initialiseHotspots = () => {
  return async dispatch => {
    try {
      const hotspots = await hotspotService.getAll()
      console.log(hotspots)
      dispatch({
        type:'GET_HOTSPOTS_SUCCESS',
        hotspots
      })
    } catch (error) {
      dispatch({
        type: 'GET_HOTSPOTS_FAIL',
        error: 'Virhe kohteiden haussa! ' + error
      })
    }
  }
}

export const addHotspot = (hotspot) => {
  return async dispatch => {
    try {
      const newHotspot = await hotspotService.create(hotspot)
      dispatch({
        type: 'ADD_HOTSPOT_SUCCESS',
        hotspot: newHotspot
      })
    } catch (error) {
      dispatch({
        type: 'ADD_HOTSPOT_FAIL',
        error: 'Kohdetta ei voitu lisätä! ' + error
      })
    }
  }
}

export const setCurrentHotspot = (id) => {
  return dispatch => {
    dispatch({
      type: 'SET_CURRENT_HOTSPOT',
      id
    })
  }
}

export const addComment = (comment) => {
  return async dispatch => {
    try {
      const newComment = await commentService.create(comment)
      dispatch({
        type: 'ADD_COMMENT_SUCCESS',
        comment: newComment
      })
    } catch (error) {
      dispatch({
        type: 'ADD_COMMENT_FAIL',
        error: 'Kommentia ei voitu lisätä! ' + error
      })
    }
  }
}

export default hotspotReducer