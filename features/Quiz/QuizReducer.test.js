import reducer, {
  shuffle,
  createQuestions,
  searchTrackOnGenius,
  scrapeLyrics,
  selectLyrics,
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

  const geniusResponsePromise = searchTrackOnGenius('Rescue Me', 'Headhunterz');
  await expect(geniusResponsePromise).resolves.toHaveProperty('meta.status', 200)
  await expect(geniusResponsePromise).resolves.toHaveProperty(['response', 'hits', 0, 'result', 'lyrics_state'], 'complete')

})

test('QuizReducer.searchTrackOnGenius: Returns no lyrics when no were found', async () => {

  const geniusResponsePromise = searchTrackOnGenius('ASdfhaskdlu', 'Headhunterz');
  await expect(geniusResponsePromise).resolves.toHaveProperty('meta.status', 400)
  await expect(geniusResponsePromise).resolves.toHaveProperty('meta.message', `Song ASdfhaskdlu Headhunterz not found`)

})

test('QuizReducer.scrapeLyrics: Scrapes lyrics from the given genius url', async () => {
  const url = 'https://genius.com/Headhunterz-and-sound-rush-rescue-me-lyrics'
  const lyrics = await scrapeLyrics(url)
  expect(lyrics).toMatch('Close my eyes and see')
})

test('QuizReducer.selectLyrics: Extracts two random consecutive lines from lyrics that are not empty', () => {

  const lyrics = `You'll see colors
You'll see colors
You'll see colors

This is Hardstyle

You'll see colors
You'll see colors
You'll see colors
You'll see colors

When you find that life is neither black or white
And the rain outside turns to glory
You'll see colors (colors )

When you mark the sky and the sun comes through
Know your greatest days are ahead of you
You'll see colors (colors )

A spark of light will seize the night
And reach beyond your vivid mind
There's an end to your darkest day
You'll see colors

A race of shame if we don't evolve
Paint your dreams
Fill the sky with art
And ignite with the others
When we see colors

You'll see colors
You'll see colors
You'll see colors
You'll see colors`;
  const extractedLyrics = selectLyrics(lyrics, 2)

  // No empty lines (double new lines)
  expect(extractedLyrics).not.toMatch(/\n{2}/g)
  // Always two lines (one new line)
  expect(extractedLyrics).toMatch(/^(.+\n{1}.+)$/g)
})

