export const SET_SPOTIFY_ACCESS_TOKEN = 'lyricquiz/auth/SET_SPOTIFY_ACCESS_TOKEN'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_SPOTIFY_ACCESS_TOKEN:
      return { ...state, spotifyAccessToken: action.token}
    default: return state;
  }
}


export function setSpotifyAccessToken(token) {
  return {
    type: SET_SPOTIFY_ACCESS_TOKEN,
    token: token
  }
}