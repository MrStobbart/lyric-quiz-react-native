import React from 'react';
import { StyleSheet, AppState, AsyncStorage, Text } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import reduxThunk from 'redux-thunk';

import AuthNavStack from './features/Auth/AuthNavigation.js'
import MainNavStack from './features/Main/MainNavigation.js'
import QuizNavStack from './features/Quiz/QuizNavigation.js'
// import { store } from './store.js';
import rootReducer from './rootReducer.js';

const middlewares = [
  reduxThunk
]
const appliedMiddlewares = applyMiddleware(...middlewares);
const store = createStore(rootReducer, appliedMiddlewares)

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isStoreLoading: false,
      store: store
    }
  }

  // replace self with this, when testing is possible
  componentWillMount = () => {
    // const self = this;

    // Event listener to persist future store changes
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
    
    this.setState({ isStoreLoading: true })
    console.log('load store')
    AsyncStorage.getItem('completeStore')
      .then((completeStore => {
        if (completeStore && completeStore.length) {
          let initialStore = JSON.parse(completeStore)
          this.setState({
            store: createStore(rootReducer, initialStore, appliedMiddlewares)
          })
          console.log('store loaded')
        } else {
          this.setState({ store: store })
          console.log('no store found')
        }
        this.setState({ isStoreLoading: false })
      }))
      .catch(error => {
        console.log('error while getting the store from the AsyncStorage', error)
        this.setState({
          isStoreLoading: false,
          store: store
        });
    })
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }

  handleAppStateChange = (currentAppState) => {
    let completeStoreJson = JSON.stringify(this.state.store.getState())
    AsyncStorage.setItem('completeStore', completeStoreJson)
  }

  render() {
    if (this.state.isStoreLoading) {
      return <Text>Loading Store ...</Text>
    } else {
      return (
        <Provider store={this.state.store}>
          <RootNavStack />
          {/* <View style={styles.container}>
          <Text>Toast</Text>
        </View>   */}
        </Provider>
      );
    }
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
    AuthNavStack: AuthNavStack,
    QuizNavStack: QuizNavStack
  },
  {
    initialRouteName: 'AuthNavStack'
  }
)





