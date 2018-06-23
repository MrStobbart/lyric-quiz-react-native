import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthSpotify from './AuthSpotify';
import AuthInitial from './AuthInitial';

export default createStackNavigator(
  {
    AuthSpotify: AuthSpotify,
    AuthInitial: AuthInitial
  },
  {
    initialRouteName: 'AuthInitial'
  }
);
