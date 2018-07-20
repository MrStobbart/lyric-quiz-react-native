import React from 'react';
import { View, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { createQuiz } from './QuizReducer.js';

class QuizStart extends React.Component{

  constructor(props) {
    super(props)
    this.props.createQuiz();
  }

  render() {
    return (
      <View>
        <Text>Explanation what this is about</Text>
        <Button
          title="Start playing"
          onPress={
            () => this.props.navigation.navigate(
              'QuizQuestion',
              { questionCounter: 0 }
            )
          }
        />
      </View>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizStart)

function mapStateToProps(state) {
  return {
    lyrics: state.quiz.lyrics
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createQuiz: () => {
      dispatch(createQuiz())
    }
  }
}