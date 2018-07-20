import axios from 'axios';
import appConfig from '../../appConfig.js';

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

export function searchTrackOnGenius(trackAndArtistName) {
  
  // TODO implement this
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


export function getLyrics(lyricsUrl) {
  // TODO get lyrics from API 
  
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

