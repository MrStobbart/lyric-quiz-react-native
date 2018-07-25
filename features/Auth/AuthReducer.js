export const SET_SPOTIFY_ACCESS_TOKEN = 'lyricquiz/auth/SET_SPOTIFY_ACCESS_TOKEN';

const initialState = {
  spotifyAccessToken: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPOTIFY_ACCESS_TOKEN:
      return { ...state, spotifyAccessToken: action.token }
    default:
      return state;
  }
}


export function setSpotifyAccessToken(token) {
  return {
    type: SET_SPOTIFY_ACCESS_TOKEN,
    token
  }
}
