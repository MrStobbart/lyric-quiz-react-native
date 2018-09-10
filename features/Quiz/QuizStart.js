import React from 'react';
import { ScrollView, Text, Picker } from 'react-native';
import Button from '../shared/Button'
import { connect } from 'react-redux';
import { createQuestions } from './QuizReducer.js';
import { textViewDefault } from '../shared/Styles'
import { View } from 'native-base';

class QuizStart extends React.Component{

  static navigationOptions = {
    title: "What is this about?"
  };

  // This should not be a string
  state = {
    selectedTimeRange: '4 weeks'
  }

  // componentDidMount() {
  //   this.loadQuizIfNecessary(this.props)
  // }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   this.loadQuizIfNecessary(nextProps)
  // }

  startPlaying = () => {
    this.props.createQuestions(this.state.selectedTimeRange)
    // this.loadQuizIfNecessary(this.props)
    this.props.navigation.navigate(
      'QuizNavStack', {
        questionCounter: 0
      }
    )
  }

  // loadQuizIfNecessary = (props) => {
  //   if (props.topTracks.data.length !== 0 && !props.quizLoading && props.quizPlayed) {
  //     props.createQuestions()
  //   }
  // }

  
  render() {

    const text = `This quiz will have five questions.

    Each question includes two consecutive lines of lyrics.

    These lyrics where extracted from one of the four presented tracks.
    
    Select the time range of your top tracks that should be used
    for the quiz below.`

    return (
      <ScrollView
        style={{
          flex: 1,
          flexDirection: 'column',
          
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={textViewDefault}>{text}</Text>
        <Picker
        style={{
            margin: 40,
            width: 150,
            height: 50,
          }}
          itemStyle={{
            backgroundColor: '#787bad'
          }}
          selectedValue={this.state.selectedTimeRange}
          onValueChange={(itemValue, itemIndex) => this.setState({ selectedTimeRange: itemValue })}>
          {Object.keys(this.props.topTracks.data).map((key, index) => 
            <Picker.Item
              label={key}
              value={key}
              key={index}
            />
          )}
        </Picker>
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
    createQuestions: (selectedTimeRange) => {
      dispatch(createQuestions(selectedTimeRange))
    }
  }
}