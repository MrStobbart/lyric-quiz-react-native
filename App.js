import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import reducer from './rootReducer';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import AuthNavStack from './features/Auth/AuthNavigation'
import TopArtits from './features/topArtists/topArtistsActions';


// TODO need some base url here? 
// https://medium.com/@relferreira/react-native-redux-react-navigation-ecec4014d648
const client = axios.create({
  baseURL: '',
  responseType: 'json'
})

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavStack />
        {/* <View style={styles.container}>
          <Text>Toast</Text>
        </View>   */}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const AppNavStack = createStackNavigator(
  {
    TopArtits: TopArtits
  }
)


const RootNavStack = createSwitchNavigator(
  {
    App: AppNavStack,
    Auth: AuthNavStack
  },
  {
    initialRouteName: 'Auth'
  }
)
