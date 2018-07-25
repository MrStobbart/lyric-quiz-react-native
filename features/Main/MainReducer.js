import axios from 'axios';
import appConfig from '../../appConfig.js';

export const FETCH_TOP_TRACKS_REQUEST = 'lyricquiz/auth/FETCH_TOP_TRACKS_REQUEST';
export const FETCH_TOP_TRACKS_FAILURE = 'lyricquiz/auth/FETCH_TOP_TRACKS_FAILURE';
export const FETCH_TOP_TRACKS_SUCCESS = 'lyricquiz/auth/FETCH_TOP_TRACKS_SUCCESS';

export const FETCH_TOP_ARTISTS_REQUEST = 'lyricquiz/auth/FETCH_TOP_ARTISTS_REQUEST';
export const FETCH_TOP_ARTISTS_FAILURE = 'lyricquiz/auth/FETCH_TOP_ARTISTS_FAILURE';
export const FETCH_TOP_ARTISTS_SUCCESS = 'lyricquiz/auth/FETCH_TOP_ARTISTS_SUCCESS';


const initialState = {
  loading: false,
  topArtists: {
    data: [],
    timestamp: 0
  },
  topTracks: {
    data: [],
    timestamp: 0
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_ARTISTS_REQUEST:
      return { ... state, loading: true }
    case FETCH_TOP_ARTISTS_FAILURE:
      return { ... state, loading: false }
    case FETCH_TOP_ARTISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        topArtists: {
          data: action.payload.items,
          timestamp: Date.now()
        }
      }
    case FETCH_TOP_TRACKS_REQUEST:
      return { ... state, loading: true }
    case FETCH_TOP_TRACKS_FAILURE:
      return { ... state, loading: false }
    case FETCH_TOP_TRACKS_SUCCESS:
      return {
        ...state,
        loading: false,
        topTracks: {
          data: action.payload.items,
          timestamp: Date.now()
        }
      }
    default: return state;
  }
}

// dispatch and getState functions are supplied by the redux thunks middleware
export function fetchTopArtists() {

  console.log('fetch top artists')
  return (dispatch, getState) => {

    dispatch(fetchTopArtistsRequest());

    const token = getState().auth.spotifyAccessToken;
    const url = `${appConfig.spotifyBaseUrl}/me/top/artists`
  
    return axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { 'limit': 10}
    }).then(payload => {
        dispatch(fetchTopArtistsSuccess(payload))
      })
      .catch(error => {
        console.error(error)
        dispatch(fetchTopArtistsFailure(error))
      })
  }
}

function fetchTopArtistsRequest() {
  console.log('fetch top artists request')
  return { type: FETCH_TOP_ARTISTS_REQUEST };
}
function fetchTopArtistsFailure(error) {
  console.log('fetch top artists failure', error)
  return { type: FETCH_TOP_ARTISTS_FAILURE, error }
}
function fetchTopArtistsSuccess(payload) {
  console.log('fetch top artists success')
  return { type: FETCH_TOP_ARTISTS_SUCCESS, payload: payload.data }
}

export function fetchTopTracks() {
  return (dispatch, getState) => {

    dispatch(fetchTopTracksRequest());

    const token = getState().auth.spotifyAccessToken;
    const url = `${appConfig.spotifyBaseUrl}/me/top/tracks`
    
    return axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { 'limit': 20}
    }).then(payload => {
        dispatch(fetchTopTracksSuccess(payload))
      })
      .catch(error => {
        console.error(error)
        dispatch(fetchTopTracksFailure(error))
      })
  }
}

function fetchTopTracksRequest() {
  return { type: FETCH_TOP_TRACKS_REQUEST };
}
function fetchTopTracksFailure(error) {
  console.log('fetch top tracks error', error)
  return { type: FETCH_TOP_TRACKS_FAILURE, error }
}
function fetchTopTracksSuccess(payload) {
  return { type: FETCH_TOP_TRACKS_SUCCESS, payload: payload.data }
}
