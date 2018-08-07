import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import QuizStart from './QuizStart.js';
import QuizQuestion from './QuizQuestion.js';
import QuizResults from './QuizResults.js';

export default createStackNavigator(
  {
    QuizQuestion: QuizQuestion,
    QuizResults: QuizResults
  },
  {
    initialRouteName: 'QuizQuestion',
    headerBackTitleVisible: false,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#5B5F97',

      },
      headerTitleStyle: {
        color: 'white'
      },
      headerTintColor: 'white'
    }
  }
);
