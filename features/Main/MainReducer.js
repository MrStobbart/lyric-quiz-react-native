import axios from 'axios';
import appConfig from '../../appConfig.js';

export const FETCH_TOP_TRACKS_REQUEST = 'lyricquiz/auth/FETCH_TOP_TRACKS_REQUEST';
export const FETCH_TOP_TRACKS_FAILURE = 'lyricquiz/auth/FETCH_TOP_TRACKS_FAILURE';
export const FETCH_TOP_TRACKS_SUCCESS = 'lyricquiz/auth/FETCH_TOP_TRACKS_SUCCESS';

export const FETCH_TOP_ARTISTS_REQUEST = 'lyricquiz/auth/FETCH_TOP_ARTISTS_REQUEST';
export const FETCH_TOP_ARTISTS_FAILURE = 'lyricquiz/auth/FETCH_TOP_ARTISTS_FAILURE';
export const FETCH_TOP_ARTISTS_SUCCESS = 'lyricquiz/auth/FETCH_TOP_ARTISTS_SUCCESS';

export const FETCH_ACCOUNT_REQUEST = 'lyricquiz/auth/FETCH_ACCOUNT_REQUEST';
export const FETCH_ACCOUNT_FAILURE = 'lyricquiz/auth/FETCH_ACCOUNT_FAILURE';
export const FETCH_ACCOUNT_SUCCESS = 'lyricquiz/auth/FETCH_ACCOUNT_SUCCESS';


const initialState = {
  loading: false,
  topArtists: {
    data: {},
    timestamp: 0,
    accountId: ""
  },
  topTracks: {
    data: {},
    timestamp: 0,
    accountId: ""
  },
  account: {
    name: "",
    id: "nöö"
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
          data: action.payload,
          timestamp: Date.now(),
          accountId: state.account.id
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
          data: action.payload,
          timestamp: Date.now(),
          accountId: state.account.id
        }
      }
    case FETCH_ACCOUNT_REQUEST:
      return { ... state, loading: true }
    case FETCH_ACCOUNT_FAILURE:
      return { ... state, loading: false }
    case FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        account: {
          name: action.payload.display_name,
          id: action.payload.id
        }
      }
    default: return state;
  }
  
}

// dispatch and getState functions are supplied by the redux thunks middleware
export function fetchTopArtists() {

  return async (dispatch, getState) => {

    dispatch(fetchTopArtistsRequest());

    const token = getState().auth.spotifyAccessToken;
    const url = `${appConfig.spotifyBaseUrl}/me/top/artists`

    try {

      // Create promises of data
      const payloadShort = axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { 'limit': 50, 'time_range': 'short_term'}
      })
      const payloadMedium = axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { 'limit': 50, 'time_range': 'medium_term'}
      })
      const payloadLong = axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { 'limit': 50, 'time_range': 'long_term'}
      })

      // Await promises
      const dataShort = await payloadShort
      const dataMedium = await payloadMedium
      const dataLong = await payloadLong

      const data = {
        '4 Weeks': dataShort.data.items,
        '6 Months': dataMedium.data.items,
        'All time': dataLong.data.items
      }

      dispatch(fetchTopArtistsSuccess(data))
    } catch (error) {
      console.error(error)
      dispatch(fetchTopArtistsFailure(error))
    }
  }
}

function fetchTopArtistsRequest() {
  return { type: FETCH_TOP_ARTISTS_REQUEST };
}
function fetchTopArtistsFailure(error) {
  console.log('Fetch top artists failure', error)
  return { type: FETCH_TOP_ARTISTS_FAILURE, error }
}
function fetchTopArtistsSuccess(data) {
  return { type: FETCH_TOP_ARTISTS_SUCCESS, payload: data }
}

export function fetchTopTracks() {
  return async (dispatch, getState) => {

    dispatch(fetchTopTracksRequest());

    const token = getState().auth.spotifyAccessToken;
    const url = `${appConfig.spotifyBaseUrl}/me/top/tracks`
    
    try {
       // Create promises of data
      const payloadShort = axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { 'limit': 50, 'time_range': 'short_term'}
      })
      const payloadMedium = axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { 'limit': 50, 'time_range': 'medium_term'}
      })
      const payloadLong = axios.get(url, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { 'limit': 50, 'time_range': 'long_term'}
      })

      // Await promises
      const dataShort = await payloadShort
      const dataMedium = await payloadMedium
      const dataLong = await payloadLong

      const data = {
        '4 Weeks': dataShort.data.items,
        '6 Months': dataMedium.data.items,
        'All time': dataLong.data.items
      }

      Object.keys(data).map((key, index) => {
        data[key] = data[key].map(track => {
          const artist = getArtistNames(track.artists);
          const name = `${track.name} (${artist})`
          return {
            id: track.id,
            name: name
          }
        });
      });

      dispatch(fetchTopTracksSuccess(data))
    } catch (error) {
      dispatch(fetchTopTracksFailure(error))
    }
  }
}

function getArtistNames(artists) {

  let artistString = ''
  for (let i = 0; i < artists.length; i++) {
    const artist = artists[i].name;
    if (i > 1 && artists.length >= 4) return `${artistString} and others`
    if (i === 0) {
      artistString = artist;
    } else if (i === 1 && artists.length >= 3) {
      artistString = `${artistString}, ${artist}`
    } else if (artists.length >= 2) {
      artistString = `${artistString} & ${artist}`
    }
  }
  return artistString
}

function fetchTopTracksRequest() {
  return { type: FETCH_TOP_TRACKS_REQUEST };
}
function fetchTopTracksFailure(error) {
  console.log('Fetch top tracks failure', error)
  return { type: FETCH_TOP_TRACKS_FAILURE, error }
}
function fetchTopTracksSuccess(data) {
  return { type: FETCH_TOP_TRACKS_SUCCESS, payload: data }
}

export function fetchAccount() {
  return (dispatch, getState) => {

    dispatch(fetchAccountRequest())

    const token = getState().auth.spotifyAccessToken;
    const url = `${appConfig.spotifyBaseUrl}/me`
    
    return axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(payload => {
        dispatch(fetchAccountSuccess(payload))
      })
      .catch(error => {
        console.error(error)
        dispatch(fetchAccountFailure(error))
      })
  }
}


function fetchAccountRequest() {
  return { type: FETCH_ACCOUNT_REQUEST }
}

function fetchAccountSuccess(payload) {
  return { type: FETCH_ACCOUNT_SUCCESS, payload: payload.data }  
}

function fetchAccountFailure(error) {
  console.log('Fetch account failure', error)
  return { type: FETCH_ACCOUNT_FAILURE, error }  
}

