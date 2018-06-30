import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Main  from './Main.js';
import TopArtists from './TopArtists';

export default createStackNavigator(
  {
    Main: Main,
    TopArtists: TopArtists
  },
  {
    initialRouteName: 'Main'
  }
);
