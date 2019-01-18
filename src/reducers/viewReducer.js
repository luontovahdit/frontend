import { views }  from '../constants'

const initialState = {
  newCoordinates: [],
  newLng: 0,
  newLat: 0,
  hotspot: null,
  showing: views.MAP,
  previousView: views.MAP,
  isUserLoggedIn: false
}

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_HOTSPOT_FORM':
      return {
        ...state,
        newCoordinates: action.newCoordinates,
        showing: views.HOTSPOTFORM
      }
    case 'SHOW_MAP':
      return {
        ...state,
        showing: views.MAP
      }
    case 'SHOW_PREVIOUS':
      return {
        ...state,
        showing: state.previousView,
        previousView: views.MAP
      }
    case 'SHOW_HOTSPOT':
      return {
        ...state,
        showing: views.HOTSPOT
      }
    case 'HIDE_HOTSPOT':
      return {
        ...state,
        showing: views.MAP
      }
    case 'SHOW_LOGINFORM':
      return {
        ...state,
        previousView: state.showing,
        showing: views.LOGINFORM
      }
    case 'SHOW_REGISTERFORM':
      return {
        ...state,
        previousView: state.showing,
        showing: views.REGISTERFORM
      }
    case 'SET_USERLOGGEDIN':
      return {
        ...state,
        isUserLoggedIn: action.loggedIn
      }
    default:
      return state
  }
}

export const showHotspotForm = (newCoordinates) => {
  return dispatch => {
    dispatch({
      type: 'SHOW_HOTSPOT_FORM',
      newCoordinates
    })
  }
}

export const hideHotspotForm = () => {
  return dispatch => {
    dispatch({
      type: 'SHOW_MAP'
    })
  }
}

export const hideHotspot = () => {
  return dispatch => {
    dispatch({
      type: 'SHOW_MAP'
    })
  }
}

export const showHotspot = (id) => {
  return dispatch => {
      dispatch({
        type: 'SHOW_HOTSPOT'
      })
  }
}

export const showLoginForm = () => {
  return dispatch => {
      dispatch({
        type: 'SHOW_LOGINFORM'
      })
  }
}

export const hideLoginForm = () => {
  return dispatch => {
      dispatch({
        type: 'SHOW_PREVIOUS'
      })
  }
}

export const showRegisterForm = () => {
  return dispatch => {
      dispatch({
        type: 'SHOW_REGISTERFORM'
      })
  }
}

export const hideRegisterForm = () => {
  return dispatch => {
      dispatch({
        type: 'SHOW_PREVIOUS'
      })
  }
}

export const setUserLoggedIn = (loggedIn) => {
  return dispatch => {
    dispatch({
      type: 'SET_USERLOGGEDIN',
      loggedIn
    })
  }
}

export default viewReducer