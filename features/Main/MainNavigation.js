import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Main  from './Main.js';
import TopArtists from './TopArtists.js';
import TopTracks from './TopTracks.js';

export default createStackNavigator(
  {
    Main: Main,
    TopArtists: TopArtists,
    TopTracks: TopTracks
  },
  {
    initialRouteName: 'Main'
  }
);
