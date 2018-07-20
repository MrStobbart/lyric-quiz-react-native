import reducer, {
  shuffle,
  createQuiz
} from './QuizReducer';


  
test('QuizReducer.createQuiz: should return a promise', async () => {
  const quizPromise = createQuiz();
  
  
})


test('QuizReducer.getLyrics: Should throw an error when no lyrics where found', () => {
  
})


test('QuizReducer.shuffle: Shuffles an array', () => { 
  const array = [1, 2, 3, 4, 5]
  const shuffledArray = shuffle(array.slice())
  expect(array).not.toBe(shuffledArray)
})

