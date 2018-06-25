import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import axios from 'axios';
import AuthNavStack from './features/Auth/AuthNavigation'
import TopArtits from './features/topArtists/topArtists.js';
import { store } from './store.js';





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
