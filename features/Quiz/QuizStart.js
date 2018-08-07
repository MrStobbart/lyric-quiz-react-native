import React from 'react';
import { View, Text } from 'react-native';
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
    console.log('Create quiz quiz start?', props.topTracks.data.length !== 0, !props.quizLoading, props.quizPlayed)
    if (props.topTracks.data.length !== 0 && !props.quizLoading && props.quizPlayed) {
      props.createQuestions()
    }
  }

  
  render() {
    return (
      <View>
        <Text style={{textAlign: 'center'}}>Explanation what this is about</Text>
        <Button
          title="Start playing"
          onPress={
            () => this.startPlaying()
          }
        />
      </View>
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