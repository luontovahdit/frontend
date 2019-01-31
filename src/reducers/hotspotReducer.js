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
      let hotspot = {...state.hotspots.find(hs => hs.id === action.comment.inHotspot.id)}
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
    case 'VOTE_HOTSPOT_SUCCESS':
      return {
        ...state,
        hotspots: state.hotspots.map(hs =>
          hs.id === action.hotspot.id
          ? action.hotspot
          : hs),
        currentHotspot: action.hotspot
      }
    case 'VOTE_HOTSPOT_FAIL':
      return {
        ...state,
        error: action.error
      }
    case 'VOTE_COMMENT_SUCCESS':
      hotspot = {...state.hotspots.find(hs => hs.id === action.comment.inHotspot.id)}
      let commentIndex = hotspot.comments.findIndex((c) => c.id === action.comment.id)
      hotspot.comments[commentIndex] = action.comment
      return {
        ...state,
        hotspots: state.hotspots.map(hs =>
          hs.id === hotspot.id
          ? hotspot
          : hs),
        currentHotspot: hotspot,
        error: null
      }
    default:
      return state
  }
}

export const initialiseHotspots = () => {
  return async dispatch => {
    try {
      const hotspots = await hotspotService.getAll()
      console.log('Fetched hotspots: ',hotspots)
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

export const upVoteHotspot = (id) => {
  console.log('upvote')
  return async dispatch => {
    try {
      const votedHotspot = await hotspotService.upVote(id)
      dispatch({
        type: 'VOTE_HOTSPOT_SUCCESS',
        hotspot: votedHotspot
      })
    } catch (error) {
      dispatch({
        type: 'VOTE_HOTSPOT_FAIL',
        error
      })
    }
  }
}

export const downVoteHotspot = (id) => {
  return async dispatch => {
    try {
      const votedHotspot = await hotspotService.downVote(id)
      dispatch({
        type: 'VOTE_HOTSPOT_SUCCESS',
        hotspot: votedHotspot
      })
    } catch (error) {
      dispatch({
        type: 'VOTE_HOTSPOT_FAIL',
        error
      })
    }
  }
}

export const upVoteComment = (id) => {
  return async dispatch => {
    try {
      const votedComment = await commentService.upVote(id)
      dispatch({
        type: 'VOTE_COMMENT_SUCCESS',
        comment: votedComment
      })
    } catch (error) {
      dispatch({
        type: 'VOTE_COMMENT_FAIL',
        error
      })
    }
  }
}

export const downVoteComment = (id) => {
  return async dispatch => {
    try {
      const votedComment = await commentService.downVote(id)
      dispatch({
        type: 'VOTE_COMMENT_SUCCESS',
        comment: votedComment
      })
    } catch (error) {
      dispatch({
        type: 'VOTE_COMMENT_FAIL',
        error
      })
    }
  }
}

export default hotspotReducer