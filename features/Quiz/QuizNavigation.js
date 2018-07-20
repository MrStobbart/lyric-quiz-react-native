import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import QuizStart from './QuizStart.js';
import QuizQuestion from './QuizQuestion.js';
import QuizRestults from './QuizResults.js';

export default createStackNavigator(
  {
    QuizStart: QuizStart,
    QuizQuestion: QuizQuestion,
    QuizRestults: QuizRestults
  },
  {
    initialRouteName: 'QuizStart'
  }
);
