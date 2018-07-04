import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import AuthNavStack from './features/Auth/AuthNavigation'
import MainNavStack from './features/Main/MainNavigation.js';
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




const RootNavStack = createSwitchNavigator(
  {
    MainNavStack: MainNavStack,
    AuthNavStack: AuthNavStack
  },
  {
    initialRouteName: 'AuthNavStack'
  }
)
