import axios from 'axios';
import appConfig from '../../appConfig.js';
import cheerio from 'cheerio-without-node-native'

export const CREATE_QUIZ_REQUEST = 'lyricquiz/quiz/CREATE_QUIZ_REQUEST'
export const CREATE_QUIZ_FAILURE = 'lyricquiz/quiz/CREATE_QUIZ_FAILURE'
export const CREATE_QUIZ_SUCCESS = 'lyricquiz/quiz/CREATE_QUIZ_SUCCESS'



const initialState = {
  lyrics: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_REQUEST:
      return { ...state, loading: true }
    case CREATE_QUIZ_FAILURE:
      return { ...state, loading: false }
    case CREATE_QUIZ_SUCCESS:
      return { ...state, lyrics: action.payload }
    default:
      return state;
  }
}


//TODO There is still something to do here, but debugging is not workign properly on the emulated device so that I will wait for my own phone
// TODO create a proper quiz object

export function createQuiz() {
  return async (dispatch, getState) => {
    dispatch(createQuizRequest());

    const state = getState();
    const tracks = state.main.topTracks.data;

    const numberOfTracksToSelect = 5;
    const shuffledTracks = shuffle(tracks);
    const selectedTracks = shuffledTracks.slice(0, numberOfTracksToSelect)

    const getLyricsPromises = selectedTracks.map((track, index) => {
      return getLyricsRecursion(tracks, index)
        .catch(error => {
          console.log('error in map')
          const nextIndexToTry = error.index + numberOfTracksToSelect
          if (nextIndexToTry >= tracks.length) {
            console.log('no tracks left')
            return null
          }
          return getLyricsRecursion(tracks, nextIndexToTry)
        })
    })
    console.log('start promise all')
    // Promise all will be fine when each promise in the arr catches their own exception
    try {
      const lyrics = await Promise.all(getLyricsPromises)
      console.log('lyrics', lyrics)
      dispatch(createQuizSuccess(lyrics))
    } catch (error) {
      console.log('Error in createQuiz Promise.all')
      dispatch(createQuizFailure())
    }

  }
}

export async function getLyricsRecursion(tracks, index) {
  const geniusTrackData = await searchTrackOnGenius(tracks[index].name)
  
  if (geniusTrackData.meta.status !== 200) {
    return Promise.reject({
      message: 'Lyric not found',
      index: index
    })
  }
  
  const lyricsUrl = geniusTrackData.response.hits[0].result.url
  return scrapeLyrics(lyricsUrl)
}


/**
 * Searches the genius api for the given track and will return meta.status: 400 when no track was found
 * @param {String} trackAndArtistName Search parameter for the genius api 
 */
export async function searchTrackOnGenius(trackAndArtistName) {
  
  const url = `${appConfig.geniusBaseUrl}/search?q=${trackAndArtistName}`
  const token = appConfig.geniusAccessToken

  try {
    const payload = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    const noTrackFound = payload.data.response.hits.length === 0
    if (noTrackFound) {
      return {
        meta: { status: 400, message: `Song ${trackAndArtistName} not found` }
      }
    } else {
      return payload.data
    }
  } catch (error) {
    console.log(error)
  }

}

/**
 * Scrapes the given url for the lyrics and returns a promise of them
 * @param {String} geniusLyricsUrl Lyrics url from the genius api
 */
export async function scrapeLyrics(geniusLyricsUrl) {
  
  const payload = await axios.get(geniusLyricsUrl)
  const $ = cheerio.load(payload.data)
  return $('.lyrics').text().trim()
  
}
/**
 * Fisher–Yates / Knuth shuffle
 * See: https://github.com/Daplie/knuth-shuffle/blob/master/index.js
 * @param {Array} array Array to shuffle
 */
export function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createQuizRequest() {
  console.log('create quiz request')
  return { type: CREATE_QUIZ_REQUEST }
}

function createQuizFailure() {
  console.log('create quir failure', error)
  return { type: CREATE_QUIZ_FAILURE, error }
}

function createQuizSuccess(lyrics) {
  console.log('create quiz success', lyrics)
  return {type: CREATE_QUIZ_SUCCESS, payload: lyrics}
}



function createQuestion() {
  return (dispatch, getState) => {

  }
}

function fetchLyricsRequest() {
  
}

function fetchLyricsFailure() {
  
}

function fetchLyricsSuccess() {
  
}

