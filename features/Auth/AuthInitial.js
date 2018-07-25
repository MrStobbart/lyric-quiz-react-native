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
    if (connectionInfo.type === 'none') {
      this.setState({hasInternetConnection: false})
    } else {
      this.setState({hasInternetConnection: true})
    }
  }
    
  componentWillReceiveProps(nextProps, nextContext) {
    console.log('nextProps', nextProps)
    if (this.props !== nextProps) {

      const reAuthenticate = nextProps.navigation.getParam('reAuthenticate', false)
      console.log('reAuthenticate will prop:', reAuthenticate)

    }
  }


  navigateToSpotifyLogin = () => {

    console.log('props', this.props)
    const reAuthenticate = this.props.navigation.getParam('reAuthenticate', false)
    console.log('reAuthenticate:', reAuthenticate)
    if (reAuthenticate) {
      this.props.navigation.navigate('AuthSpotify', { reAuthenticate: true })
    } else {
      this.props.navigation.navigate('AuthSpotify')
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
            onPress={() => this.navigateToSpotifyLogin()}
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
