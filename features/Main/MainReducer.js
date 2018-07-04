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
  topArtists: {},
  topTracks: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_ARTISTS_REQUEST:
      return { ... state, loading: true }
    case FETCH_TOP_ARTISTS_FAILURE:
      return { ... state, loading: false }
    case FETCH_TOP_ARTISTS_SUCCESS:
      return { ... state, loading: false, topArtists: action.payload.items }
    case FETCH_TOP_TRACKS_REQUEST:
      return { ... state, loading: true }
    case FETCH_TOP_TRACKS_FAILURE:
      return { ... state, loading: false }
    case FETCH_TOP_TRACKS_SUCCESS:
      return { ... state, loading: false, topTracks: action.payload.items }
    default: return state;
  }
}

export function fetchTopArtistsRequest() {
  console.log('fetch top artists request')
  return { type: FETCH_TOP_ARTISTS_REQUEST };
}
export function fetchTopArtistsFailure(error) {
  console.log('fetch top artists failure')
  return { type: FETCH_TOP_ARTISTS_FAILURE, error }
}
export function fetchTopArtistsSuccess(payload) {
  console.log('fetch top artists success')
  return { type: FETCH_TOP_ARTISTS_SUCCESS, payload: payload.data }
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

export function fetchTopTracksRequest() {
  return { type: FETCH_TOP_TRACKS_REQUEST };
}
export function fetchTopTracksFailure(error) {
  return { type: FETCH_TOP_TRACKS_FAILURE, error }
}
export function fetchTopTracksSuccess(payload) {
  return { type: FETCH_TOP_TRACKS_SUCCESS, payload: payload.data }
}

export function fetchTopTracks() {
  return (dispatch, getState) => {

    dispatch(fetchTopTracksRequest());

    const token = getState().auth.spotifyAccessToken;
    const url = `${appConfig.spotifyBaseUrl}/me/top/tracks`
    
    return axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` },
      params: { 'limit': 10}
    }).then(payload => {
        dispatch(fetchTopTracksSuccess(payload))
      })
      .catch(error => {
        console.error(error)
        dispatch(fetchTopTracksFailure(error))
      })
  }
}