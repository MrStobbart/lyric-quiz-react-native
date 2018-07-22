import reducer, {
  shuffle,
  createQuestions,
  searchTrackOnGenius,
  scrapeLyrics,
} from './QuizReducer';


  
test('QuizReducer.createQuiz: should return a promise', async () => {
  const quizPromise = createQuestions();
  
  
})


test('QuizReducer.getLyrics: Should throw an error when no lyrics where found', () => {
  
})

test('QuizReducer.shuffle: Shuffles an array', () => { 
  const array = [1, 2, 3, 4, 5]
  const shuffledArray = shuffle(array.slice())
  expect(array).not.toBe(shuffledArray)
})

test('QuizReducer.searchTrackOnGenius: Returns genius response promise with data', async () => {

  const geniusResponsePromise = searchTrackOnGenius('Headhunterz Rescue Me');
  await expect(geniusResponsePromise).resolves.toHaveProperty('meta.status', 200)
  await expect(geniusResponsePromise).resolves.toHaveProperty(['response', 'hits', 0, 'result', 'lyrics_state'], 'complete')

})

test('QuizReducer.searchTrackOnGenius: Returns no lyrics when no were found', async () => {

  const geniusResponsePromise = searchTrackOnGenius('Headhunterz ASdfhaskdlu');
  await expect(geniusResponsePromise).resolves.toHaveProperty('meta.status', 400)
  await expect(geniusResponsePromise).resolves.toHaveProperty('meta.message', `Song Headhunterz ASdfhaskdlu not found`)

})

test('QuizReducer.scrapeLyrics: Scrapes lyrics from the given genius url', async () => {
  const url = 'https://genius.com/Headhunterz-and-sound-rush-rescue-me-lyrics'
  const lyrics = await scrapeLyrics(url)
  expect(lyrics).toMatch('Close my eyes and see')
})
