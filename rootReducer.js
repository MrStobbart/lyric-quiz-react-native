
import { combineReducers } from 'redux';

// Reducers
import topArtistReducer from './features/topArtists/topArtistsReducer';
import AuthReducer from './features/Auth/AuthReducer';

/*
  Reducer uses the ducks-modular-redux pattern (https://github.com/erikras/ducks-modular-redux):
  A module...

    MUST export default a function called reducer()
    MUST export its action creators as functions
    MUST have action types in the form 'npm-module-or-app/reducer/ACTION_TYPE'
    MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library
*/

export default combineReducers({
  top: topArtistReducer,
  auth: AuthReducer
})

