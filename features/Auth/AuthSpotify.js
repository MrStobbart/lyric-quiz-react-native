import React from 'react';
import { WebView } from 'react-native';
import { connect } from 'react-redux';
import urlParser from 'query-string-parser';
import { setSpotifyAccessToken } from './AuthReducer';
import config from '../../appConfig.js'

class AuthSpotify extends React.Component {
  
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props)

    this.state = {
      redirectUri: 'https://lyricquiz.io/callback/',
      requestIdentifier: '',
      requestUrl: ''
    }
  }

  componentWillMount() {
    this.createSpotifyRequestUrl();
  }

  /**
   * Creates the api url for spotify to login
   */
  createSpotifyRequestUrl = () => {

    const scope = 'user-top-read';
    const requestIdentifier = this.generateRandomString(16);


    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(config.spotifyClientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(this.state.redirectUri);
    url += '&state=' + encodeURIComponent(requestIdentifier);
    url += '&show_dialog=true'

    
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

  /**
   * Checks if the WebView url shows the redirect url with the access token and navigates to 'App' if so
   */
  checkToken = (webViewNavigation) => {
    console.log('webviewnavigaton url', webViewNavigation.url)  
    if (webViewNavigation.url.includes('access_token')) {

      const parsedUrl = urlParser.fromQuery(webViewNavigation.url)
      if (parsedUrl.state === this.state.requestIdentifier) {
        let token = parsedUrl['https://lyricquiz.io/callback/#access_token']
        console.log('token', token)
        this.props.setSpotifyAccessToken(token)
        
        this.props.navigation.navigate('MainNavStack')
      } else {
        console.log('Request id incorrect')
      }
    }
  }

  render() {

    return (
      <WebView
        source={{ uri: this.state.requestUrl }}
        style={{ marginTop: 23 }}
        onNavigationStateChange={this.checkToken}
      />
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthSpotify)

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSpotifyAccessToken: (token) => { dispatch(setSpotifyAccessToken(token)) }
  }
}




