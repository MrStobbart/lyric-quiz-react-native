import React from 'react';
import { WebView } from 'react-native';
import urlParser from 'query-string-parser';
import { setSpotifyAccessToken } from './AuthReducer';
import config from '../../appConfig.js'

export default class AuthSpotify extends React.Component {

  constructor(props) {
    super(props)

    
    this.state = {
      redirectUri: 'lyricquiz://callback',
      requestIdentifier: '',
      requestUrl: ''
    }
  }

  componentWillMount() {
    this.createSpotifyRequestUrl();
  }

  createSpotifyRequestUrl = () => {

    const scope = 'user-read-private user-read-email';
    const requestIdentifier = this.generateRandomString();

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(config.clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(this.state.redirectUri);
    url += '&state=' + encodeURIComponent(requestIdentifier);
    
    this.setState(prevState => {
      return {
        ...prevState,
        requestIdentifier: requestIdentifier,
        requestUrl: url
      }
    })
  }
  

  generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  checkToken = (navState) => {
    if (navState.url.includes('access_token')) {

      const parsedUrl = urlParser.fromQuery(navState.url)
      if (parsedUrl.state !== this.state.requestIdentifier) {
        let token = parsedUrl['lyricquiz://callback/#access_token']
        setSpotifyAccessToken(token)
        // TODO fix this props issue
        // this.props.navigation.navigate('App')
      } else {
        console.log('Request id incorrect')
      }
    }
  }



  render() {

    return (
      <WebView
        source={{ uri: this.state.requestUrl }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={this.checkToken}
      />
    );
  }
}


