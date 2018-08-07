import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Main  from './Main.js';
import TopArtists from './TopArtists.js';
import TopTracks from './TopTracks.js';
import QuizStart from '../Quiz/QuizStart.js';

export default createStackNavigator(
  {
    Main: Main,
    TopArtists: TopArtists,
    TopTracks: TopTracks,
    QuizStart: QuizStart,
  },
  {
    initialRouteName: 'Main',
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
