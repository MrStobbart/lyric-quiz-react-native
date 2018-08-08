import React from 'react';
import { View, Text, NetInfo, ScrollView } from 'react-native';
import Button from '../shared/Button'



export default class AuthInitial extends React.Component{

  static navigationOptions = {
    title: "Welcome to lyricquiz!"
  };

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
    if (this.props !== nextProps) {

      const reAuthenticate = nextProps.navigation.getParam('reAuthenticate', false)
    }
  }


  navigateToSpotifyLogin = () => {

    const reAuthenticate = this.props.navigation.getParam('reAuthenticate', false)
    if (reAuthenticate) {
      this.props.navigation.navigate('AuthSpotify', { reAuthenticate: true })
    } else {
      this.props.navigation.navigate('AuthSpotify')
    }
    
    
  }
 
  render() {
    const description = `This app allows you to play a quiz where you can guess the name of track by an extract of the lyrics.

    It uses your personal favourite tracks provided by Spotify. Login below to continue.`
    if (this.state.hasInternetConnection) {
      return (
        <ScrollView>
          <Text style={{
            margin: 40,
            textAlign: 'center'
          }}>{description}</Text>
          <Button
            title="Login with Spotify"
            onPress={() => this.navigateToSpotifyLogin()}
          />
        </ScrollView>
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
