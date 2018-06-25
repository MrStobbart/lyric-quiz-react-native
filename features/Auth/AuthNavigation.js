import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthSpotify from './AuthSpotify';
import AuthInitial from './AuthInitial';

export default createStackNavigator(
  {
    AuthInitial: AuthInitial,
    AuthSpotify: AuthSpotify
  },
  {
    initialRouteName: 'AuthInitial'
  }
);
