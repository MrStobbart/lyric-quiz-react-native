import axios from 'axios';
import appConfig from '../../appConfig.js';
import lyricist from 'lyricist'
import cheerio from 'cheerio'

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
          console.log('"error" in map')
          return getLyricsRecursion(tracks, error.nextTrackToTry)
        })
    })
    console.log('start promise all')
    // Promise all will be fine when each promise in the arr catches their own exception
    const lyrics = await Promise.all(getLyricsPromises)
    console.log('lyrics', lyrics)

    return lyrics
    dispatch(createQuizSuccess(lyrics))
  }
}
/**
 * Searches the genius api for the given track and will return meta.status: 400 when no track was found
 * @param {String} trackAndArtistName Search parameter for the genius api 
 */
export function searchTrackOnGenius(trackAndArtistName) {
  
  const url = `${appConfig.geniusBaseUrl}/search?q=${trackAndArtistName}`
  const token = appConfig.geniusAccessToken

  return axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` },
  }).then(payload => {
    const noTrackFound = payload.data.response.hits.length === 0
    if (noTrackFound) {
      return {
        meta: { status: 400, message: `Song ${trackAndArtistName} not found` }
      }
    } else {
      return payload.data
    }
  }).catch(err => console.log(err))
}

export function getLyricsRecursion(tracks, index) {
  let triedTracks = []
  return getLyrics(tracks, index)
    .then(lyrics => {
      console.log('lyrics return stuff in recursion')
      return lyrics
    })
    .catch(error => {
      triedTracks.push(index)
      // Doen't retry a track already tried and within the start range
      const nextTrackToTry = index < numberOfTracksToSelect ? numberOfTracksToSelect : index + 1
      console.log('"error in getLyricsRecursion"', nextTrackToTry)
      return Promise.reject({ message: 'Lyric not found', nextTrackToTry: nextTrackToTry })
    })
}

export function getLyrics(tracks, index) {

  if (index == 2) {
    console.log('index 2, rejected')
    return Promise.reject({ message: 'Lyrics not found', index: index })
  }
  console.log('index', index)
  console.log('track', tracks[index].name)
  const trackName = tracks[index].name
  return Promise.resolve('Lyrics here from: ' + trackName)

}


export async function scrapeLyrics(lyricsUrl) {
  
  const payload = await axios.get(lyricsUrl)
  const $ = cheerio.load(payload.data)
  return $('.lyrics')
    .text()
    .trim()
  
}

scrapeLyrics('https://genius.com/Headhunterz-and-sound-rush-rescue-me-lyrics')

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

// Fisher–Yates shuffle
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

