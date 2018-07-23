import axios from 'axios';
import appConfig from '../../appConfig.js';
import cheerio from 'cheerio-without-node-native'
import pickRandom from 'pick-random'

export const CREATE_QUIZ_REQUEST = 'lyricquiz/quiz/CREATE_QUIZ_REQUEST'
export const CREATE_QUIZ_FAILURE = 'lyricquiz/quiz/CREATE_QUIZ_FAILURE'
export const CREATE_QUIZ_SUCCESS = 'lyricquiz/quiz/CREATE_QUIZ_SUCCESS'



const initialState = {
  lyrics: [],
  loading: false,
  questions: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_REQUEST:
      return { ...state, loading: true }
    case CREATE_QUIZ_FAILURE:
      return { ...state, loading: false }
    case CREATE_QUIZ_SUCCESS:
      return { ...state, questions: action.payload }
    default:
      return state;
  }
}

// TODO create a proper quiz object

export function createQuestions() {
  return async (dispatch, getState) => {
    dispatch(createQuizRequest());

    const state = getState();
    const tracks = state.main.topTracks.data;

    console.log('Tracks in createQuestions', tracks)
    const numberOfTracksToSelect = 5;
    const shuffledTracks = shuffle(tracks);
    const selectedTracks = shuffledTracks.slice(0, numberOfTracksToSelect)

    const getLyricsPromises = selectedTracks.map((track, index) => {
      return getLyricsRecursion(tracks, index)
        .catch(error => {
          console.log(error)
          console.log('error.index', error.index, error.message)
          const nextIndexToTry = error.index + numberOfTracksToSelect
          if (nextIndexToTry >= tracks.length) {
            console.log('no tracks left')
            return null
          }
          console.log('index', index, 'nextIndexToTry',nextIndexToTry)
          return getLyricsRecursion(tracks, nextIndexToTry)
        })
    })
    console.log('start promise all')
    try {
      // Promise all won't throw an exception when each promise in the array catches their own exception
      const lyricsArr = await Promise.all(getLyricsPromises)
      // console.log('lyrics arr', lyricsArr)
      const questions = lyricsArr.map((lyrics, index) => {
        const choices = pickRandom(tracks, { count: 3 })
        let choiceNames = []
        choiceNames = choices.map(choice => choice.name)
        choiceNames.push(lyrics.trackName)
        const shuffledChoiceNames = shuffle(choiceNames)
        return {
          trackName: lyrics.trackName,
          lyrics: lyrics.lyrics,
          choices: shuffledChoiceNames,
          questionCounter: index
        }
      }) 
      console.log('question 1', questions[0])
      dispatch(createQuizSuccess(questions))
    } catch (error) {
      console.log(error)
      dispatch(createQuizFailure(error))
    }

  }
}

/**
 * Search for track on genius and get lyrics when track is found
 * @param {*} tracks Array of all tracks to select
 * @param {Number} index Index of the track where lyrics should be searched
 */
export async function getLyricsRecursion(tracks, index) {
  
  console.log('tracks ', tracks)
  console.log('index ', index)
  console.log('artist', tracks[index] )
  const artist = tracks[index].artists[0].name
  // console.log('search on genius', trackAndArtist)
  const geniusTrackData = await searchTrackOnGenius(tracks[index].name, artist)
  
  // console.log('genius track data', geniusTrackData)
  if (geniusTrackData.meta.status !== 200) {
    return Promise.reject({
      message: 'Lyric not found',
      index: index
    })
  }
  
  const lyricsUrl = geniusTrackData.response.hits[0].result.url
  const lyrics = await scrapeLyrics(lyricsUrl)
  return {
    trackName: tracks[index].name,
    lyrics: lyrics,
    index: index
  }
}


/**
 * Searches the genius api for the given track and will return meta.status: 400 when no track was found
 * @param {String} trackAndArtistName Search parameter for the genius api 
 */
export async function searchTrackOnGenius(track, artist) {

  const trackAndArtist = `${track} ${artist}`
  console.log('start searching', trackAndArtist)
  const url = `${appConfig.geniusBaseUrl}/search?q=${trackAndArtist}`
  const token = appConfig.geniusAccessToken

  try {
    const payload = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    const noTrackFound = payload.data.response.hits.length === 0
    if (noTrackFound) {
      return {
        meta: { status: 400, message: `Song ${trackAndArtist} not found` }
      }
    }

    console.log('payload from ', trackAndArtist, payload.data)

    
    const fullFoundTitle = payload.data.response.hits[0].result.full_title.toLowerCase()
    const foundTitleMatches = fullFoundTitle.includes(track.toLowerCase()) 
    const foundArtistMatches = fullFoundTitle.includes(artist.toLowerCase())
    if (foundTitleMatches && foundArtistMatches) {
      return payload.data
    } else {
      return {
        status: 400, 
        message: `Wrong track found for ${trackAndArtist}`
      }
    }
    
  } catch (error) {
    console.log(error)
    console.log('genius call error request', error.request)
    console.log('genius call error', error.response.data.meta.message)
    console.log('genius call response headers',error.response.headers)
    console.log('status', error.response.status)
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

function createQuizFailure(error) {
  console.log('create quiz failure', error)
  return { type: CREATE_QUIZ_FAILURE, error }
}

function createQuizSuccess(lyrics) {
  console.log('create quiz success', lyrics)
  return {type: CREATE_QUIZ_SUCCESS, payload: lyrics}
}


