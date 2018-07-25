import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import QuizStart from './QuizStart.js';
import QuizQuestion from './QuizQuestion.js';
import QuizResults from './QuizResults.js';

export default createStackNavigator(
  {
    QuizStart: QuizStart,
    QuizQuestion: QuizQuestion,
    QuizResults: QuizResults
  },
  {
    initialRouteName: 'QuizStart'
  }
);
