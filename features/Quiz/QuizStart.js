import React from 'react';
import { ScrollView, Text } from 'react-native';
import Button from '../shared/Button'
import { connect } from 'react-redux';
import { createQuestions } from './QuizReducer.js';

class QuizStart extends React.Component{

  static navigationOptions = {
    title: "What is this about?"
  };

  constructor(props) {
    super(props)

    
  }

  componentDidMount() {
    this.loadQuizIfNecessary(this.props)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.loadQuizIfNecessary(nextProps)
  }

  startPlaying = () => {
    this.loadQuizIfNecessary(this.props)
    this.props.navigation.navigate(
      'QuizNavStack', {
        questionCounter: 0
      }
    )
  }

  loadQuizIfNecessary = (props) => {
    if (props.topTracks.data.length !== 0 && !props.quizLoading && props.quizPlayed) {
      props.createQuestions()
    }
  }

  
  render() {

    const text = `This quiz will have five questions.

    Each question includes two consecutive lines of lyrics.

    These lyrics where extracted from one of the four presented tracks.
    
    Select the right track and continue :)`

    return (
      <ScrollView>
        <Text style={{
          textAlign: 'center',
          margin: 40
        }}>{text}</Text>
        <Button
          title="Start playing"
          onPress={
            () => this.startPlaying()
          }
        />
      </ScrollView>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizStart)

function mapStateToProps(state) {
  return {
    lyrics: state.quiz.lyrics,
    topTracks: state.main.topTracks,
    quizLoading: state.quiz.loading,
    quizPlayed: state.quiz.quizPlayed
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuestions: () => {
      dispatch(createQuestions())
    }
  }
}