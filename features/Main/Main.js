import React from 'react';
import { View, Text } from 'react-native';
import Button from '../shared/Button'
import { connect } from 'react-redux';
import { fetchTopArtists, fetchTopTracks, fetchAccount } from './MainReducer';


class Main extends React.Component{

  static navigationOptions = {
    title: "Lyricquiz"
  };

  constructor(props) {
    super(props);

    this.props.fetchAccount()
    this.fetchDataIfNecessary(this.props)
    
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    this.fetchDataIfNecessary(nextProps)
  }
  
  fetchDataIfNecessary = (props) => {
    
    // Only fetch data when older then a day
    const dayInMiliseconds = 86400000
    const dataToOld = props.topArtists.timestamp + dayInMiliseconds < Date.now()

    const dataFromWrongAccount = props.topArtists.accountId !== props.account.id || props.topTracks.accountId !== props.account.id 

    const noData = props.topTracks.data.length === 0 || props.topArtists.data.length === 0
    console.log(`For if statement: ${dataToOld}, ${dataFromWrongAccount}, ${noData}`)

    if (props.account.id !== "") {
      if (dataToOld || dataFromWrongAccount || noData) {
        console.log('data old')
        props.fetchTopArtists();
        props.fetchTopTracks();
      }
    }
  }

  // TODO do data preparation (like track and title together)
  render() {
    console.log("Account id", this.props.account.id)
    if (this.props.account.id === "") {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } 

    return (
      <View>
        <Button
          title="Start playing" 
          onPress={() => this.props.navigation.navigate('QuizNavStack')}
        />
        <Button
          title="Your top artists" 
          onPress={() => this.props.navigation.navigate('TopArtists')}
        />
        <Button
          title="Your top songs" 
          onPress={() => this.props.navigation.navigate('TopTracks')}
        />
        <Button
          title="Logout"
          onPress={() => this.props.navigation.navigate('AuthNavStack')}
        />
      </View>
    )
  }
}


export default connect(mapStateToProps, mapDispatchTopProps)(Main)

function mapStateToProps(state) {
  return {
    topArtists: state.main.topArtists,
    topTracks: state.main.topTracks,
    account: state.main.account
  }
}

function mapDispatchTopProps(dispatch) {
  return {
    fetchTopArtists: () => {
      dispatch(fetchTopArtists())
    },
    fetchTopTracks: () => {
      dispatch(fetchTopTracks())
    },
    fetchAccount: () => {
      dispatch(fetchAccount())
    }
  }
}