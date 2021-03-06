import axios from 'axios';
import appConfig from '../../appConfig.js';
import cheerio from 'cheerio-without-node-native'
import pickRandom from 'pick-random'

export const CREATE_QUIZ_REQUEST = 'lyricquiz/quiz/CREATE_QUIZ_REQUEST'
export const CREATE_QUIZ_FAILURE = 'lyricquiz/quiz/CREATE_QUIZ_FAILURE'
export const CREATE_QUIZ_SUCCESS = 'lyricquiz/quiz/CREATE_QUIZ_SUCCESS'
export const SET_QUESTION_ANSWER = 'lyricquiz/quiz/SET_QUESTION_ANSWER'
export const SET_QUIZ_PLAYED = 'lyricquiz/quiz/SET_QUIZ_PLAYED'



const initialState = {
  lyrics: [],
  loading: false,
  quizPlayed: true,
  questions: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_REQUEST:
      return { ...state, loading: true }
    case CREATE_QUIZ_FAILURE:
      return { ...state, loading: false }
    case CREATE_QUIZ_SUCCESS:
      return { ...state,
        loading: false,
        questions: action.payload,
        quizPlayed: false
      }
    case SET_QUESTION_ANSWER:
      return {
        ...state,
        questions: state.questions.map((question, index) => {
          if (index === action.index) {
            question.correct = action.correct
          }
          return question
        })
      }
    case SET_QUIZ_PLAYED:
      return {
        ...state,
        quizPlayed: true
      }
    default:
      return state;
  }
}

export function setQuestionAnswer(index, correct) {
  return {
    type: SET_QUESTION_ANSWER,
    index: index,
    correct: correct
  }
}

export function createQuestions(selectedTimeRange) {

  return async (dispatch, getState) => {
    dispatch(createQuizRequest());

    const state = getState();

    // Make it selectable here
    const tracks = state.main.topTracks.data[selectedTimeRange];
    const tracksCopy = JSON.parse(JSON.stringify(tracks));

    const numberOfTracksToSelect = 5;
    const shuffledTracks = shuffle(tracksCopy);
    const selectedTracks = shuffledTracks.slice(0, numberOfTracksToSelect)

    const getLyricsPromises = selectedTracks.map((track, index) => getLyricsRecursion(shuffledTracks, index))
    try {
      // Promise all won't throw an exception when each promise in the array catches their own exception
      // TODO lyricsArr is completely null, somehow
      const lyricsArr = await Promise.all(getLyricsPromises)
      const lyricsArrNoNull = lyricsArr.filter(promise => promise !== null)

      const questions = lyricsArrNoNull.map((lyrics, index) => {
        let choices = pickRandom(tracks, { count: 4 })
        // Use name instead of trackName here to also show the artist
        let choiceNames = choices.map(choice => choice.trackName)

        // Remove one choice and add right choice when not already there
        if (!choiceNames.includes(lyrics.trackName)) {

          choiceNames.pop()
          choiceNames.push(lyrics.trackName)
        }
        const shuffledChoiceNames = shuffle(choiceNames)
        return {
          trackName: lyrics.trackName,
          lyrics: lyrics.lyrics,
          choices: shuffledChoiceNames
        }
      }) 

      const quiz = questions.filter(question => {
        if (question.choices.length == null) {
          return false
        }
        return true
      })

      dispatch(createQuizSuccess(quiz))
    } catch (error) {
      dispatch(createQuizFailure(error))
    }

  }
}

async function getLyricsRecursion(tracks, index) {
  try {
    return await getLyrics(tracks, index)
    
  } catch (error) {

    const nextIndexToTry = index + 5
    if (nextIndexToTry >= tracks.length) {
      return null
    }
    return await getLyricsRecursion(tracks, nextIndexToTry)
    
  }
}

/**
 * Search for track on genius and get lyrics when track is found
 * @param {*} tracks Array of all tracks to select
 * @param {Number} index Index of the track where lyrics should be searched
 */
export async function getLyrics(tracks, index) {
  
  const mainArtist = tracks[index].mainArtist
  const trackName = tracks[index].trackName
  const geniusTrackData = await searchTrackOnGenius(trackName, mainArtist)
  
  if (geniusTrackData.meta.status !== 200) {
    return Promise.reject({
      message: 'Lyric not found',
      index: index
    })
  }
  
  const lyricsUrl = geniusTrackData.response.hits[0].result.url
  const lyrics = await scrapeLyrics(lyricsUrl)
  const extractedLyricsForQuestion = selectLyrics(lyrics, 2)
  return {
    trackName: trackName,
    lyrics: extractedLyricsForQuestion,
    index: index
  }
}

/**
 * Returns a consecutive part of the lyrics with the number of lines as given
 * The part of the lyrics is randomly chosen 
 * @param {String} lyrics 
 * @param {Number} numberOfLines 
 */
export function selectLyrics(lyrics, numberOfLines) {
  const lines = lyrics.split(/\n/).map(line => line.trim());
  // Remove empty lines
  const lyricLinesToIgnore = [
    'Refrain]',
    '[Bridge]',
    'Chorus]',
    '[Verse',
    '[Drop]'
  ]
  const trimmedLines = lines.filter(line => {
    // Remove empty lines
    if (line == '') {
      return false
    }
    // Remove lyricLinesToIgnore
    if (lyricLinesToIgnore.some((lyricToIgnore) => line.includes(lyricToIgnore))) {
      return false
    }
    return true
  })

  // Select random line index that still has enough following lines for the required numberOfLines
  const selectedLineIndex = Math.floor(Math.random() * (trimmedLines.length - numberOfLines + 1))
  
  // Add following lines to selected line when necessary
  const selectedLyrics = trimmedLines.reduce((selectedLines, currentLine, currentIndex) => {
    if (currentIndex > selectedLineIndex && currentIndex < selectedLineIndex + numberOfLines) {
      return selectedLines + '\n' + currentLine
    }
    return selectedLines
  }, trimmedLines[selectedLineIndex])

  return selectedLyrics
}


/**
 * Searches the genius api for the given track and will return meta.status: 400 when no track was found
 * @param {String} trackAndArtistName Search parameter for the genius api 
 */
export async function searchTrackOnGenius(track, artist) {

  const trackAndArtist = `${track} ${artist}`
  const url = `${appConfig.geniusBaseUrl}/search?q=${trackAndArtist}`
  const token = appConfig.geniusAccessToken

  try {
    const payload = await axios.get(url, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    const noTrackFound = payload.data.response.hits.length === 0
    if (noTrackFound) {
      return {
        meta: {
          status: 400,
          message: `Song ${trackAndArtist} not found`
        }
      }
    }


    
    const fullFoundTitle = payload.data.response.hits[0].result.full_title.toLowerCase()
    const foundTitleMatches = fullFoundTitle.includes(track.toLowerCase()) 
    const foundArtistMatches = fullFoundTitle.includes(artist.toLowerCase())
    if (foundTitleMatches && foundArtistMatches) {
      return payload.data
    } else {
      return {
        meta: {
          status: 400, 
          message: `Wrong track found for ${trackAndArtist}`
        }
      }
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
  
  try {
    const payload = await axios.get(geniusLyricsUrl)
    const $ = cheerio.load(payload.data)
    const lyrics = $('.lyrics').text().trim()
    return lyrics
  } catch (error) {
    console.log(error)
  }
  
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
  return { type: CREATE_QUIZ_REQUEST }
}

function createQuizFailure(error) {
  console.log('create quiz failure', error)
  return { type: CREATE_QUIZ_FAILURE, error }
}

function createQuizSuccess(questions) {
  return {type: CREATE_QUIZ_SUCCESS, payload: questions}
}

export function setQuizPlayed() {
  return { type: SET_QUIZ_PLAYED}
}


