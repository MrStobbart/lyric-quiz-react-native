import React from 'react';
import { View, Button, Text, NetInfo } from 'react-native';


export default class AuthInitial extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      hasInternetConnection: false
    }
  }

  componentDidMount() {

    NetInfo.addEventListener(
      'connectionChange',
      this.handleInternetConnectionChange
    );

    NetInfo.getConnectionInfo()
      .then(connectionInfo => this.handleInternetConnectionChange(connectionInfo))  
  }

  handleInternetConnectionChange = (connectionInfo) => {
    console.log('Connection change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    if (connectionInfo.type !== 'none') {
      console.log('it is not none')
      this.setState({hasInternetConnection: true})
    }
  }

  // TODO style this propery
  render() {
    if (this.state.hasInternetConnection) {
      return (
        <View>
          <Text>This is the initial View</Text>
          <Button
            title="Login"
            onPress={() => this.props.navigation.navigate('AuthSpotify')}
          />
        </View>
      )  
    } else {
      return (
        <View>
          <Text>This app needs an active internet connection</Text>
        </View>
      )
    }
    
  }
}