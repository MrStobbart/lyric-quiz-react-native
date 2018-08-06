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

[Refrain]
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


test('QuizReducer.selectLyrics: Extracts n random consecutive lines from lyrics that are not empty and not withing the lyricLinesToIgnore', () => {

  const lyrics = `
[Verse 1]
I thought that I 've been hurt before
But no one 's ever left me quite this sore
Your words cut deeper than a knife
Now I need someone to breathe me back to life

  [Pre - Chorus]
Got a feeling that I 'm going under
But I know that I 'll make it out alive
If I quit calling you my lover
Move on

  [Chorus]
You watch me bleed until I can 't breathe, shaking
Falling onto my knees
And now that I 'm without your kisses
I 'll be needing stitches
Tripping over myself, aching
Begging you to come help
And now that I 'm without your kisses
I 'll be needing stitches

[Verse 2]
Just like a moth drawn to a flame
Oh, you lured me in I couldn 't sense the pain
Your bitter heart, cold to the touch
Now I 'm gonna reap what I sow
I 'm left seeing red on my own

[Pre - Chorus]
Got a feeling that I 'm going under
But I know that I 'll make it out alive
If I quit calling you my lover
Move on

  [Chorus]
You watch me bleed until I can 't breathe, shaking
Falling onto my knees
And now that I 'm without your kisses
I 'll be needing stitches
Tripping over myself, aching
Begging you to come help
And now that I 'm without your kisses
I 'll be needing stitches

[Bridge]
Needle and the thread, gotta get you out of my head
Needle and the thread, gonna wind up dead
Needle and the thread, gotta get you out of my head
Needle and the thread, gonna wind up dead
Needle and the thread, gotta get you out of my head
Needle and the thread, gonna wind up dead
Needle and the thread, gotta get you out of my head
Get you out of my head

[Chorus]
You watch me bleed until I can 't breathe, shaking
Falling onto my knees
And now that I 'm without your kisses
I 'll be needing stitches
Tripping over myself, aching
Begging you to come help
And now that I 'm without your kisses
I 'll be needing stitches

[Refrain]
Now that I 'm without your kisses
I 'll be needing stitches
Now that I 'm without your kisses
I 'll be needing stitches`;
  
  const extractedLyrics = selectLyrics(lyrics, 30)

  // No empty lines (double new lines)
  expect(extractedLyrics).not.toMatch(/\[Refrain\]/g)
})
