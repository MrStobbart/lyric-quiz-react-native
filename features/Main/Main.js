import React from 'react';
import { ScrollView, Text } from 'react-native';
import Button from '../shared/Button'
import { connect } from 'react-redux';
import { fetchTopArtists, fetchTopTracks, fetchAccount } from './MainReducer';
import { createQuestions } from '../Quiz/QuizReducer';


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
    if (nextProps.topTracks.data.length !== 0 && !nextProps.quizLoading && nextProps.quizPlayed) {
      this.props.createQuestions()
    }
  }
  
  fetchDataIfNecessary = (props) => {
    
    // Only fetch data when older then a day
    const dayInMiliseconds = 86400000
    const dataToOld = props.topArtists.timestamp + dayInMiliseconds < Date.now()

    const dataFromWrongAccount = props.topArtists.accountId !== props.account.id || props.topTracks.accountId !== props.account.id 

    const noData = props.topTracks.data.length === 0 || props.topArtists.data.length === 0

    if (props.account.id !== "") {
      if (dataToOld || dataFromWrongAccount || noData) {
        props.fetchTopArtists();
        props.fetchTopTracks();
      }
    }
  }

  render() {
    if (this.props.account.id === "") {
      return (
        <ScrollView>
          <Text>Loading...</Text>
        </ScrollView>
      )
    } 

    return (
      <ScrollView>
        <Button
          title="Start playing" 
          onPress={() => this.props.navigation.navigate('QuizStart')}
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
      </ScrollView>
    )
  }
}


export default connect(mapStateToProps, mapDispatchTopProps)(Main)

function mapStateToProps(state) {
  return {
    topArtists: state.main.topArtists,
    account: state.main.account,
    topTracks: state.main.topTracks,
    quizLoading: state.quiz.loading,
    quizPlayed: state.quiz.quizPlayed,
    questions: state.quiz.questions
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
    },
    createQuestions: () => {
      dispatch(createQuestions())
    }
  }
}