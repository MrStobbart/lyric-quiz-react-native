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
    this.props.createQuestions();
  }

  
  render() {
    return (
      <View>
        <Text style={{textAlign: 'center'}}>Explanation what this is about</Text>
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
    createQuestions: () => {
      dispatch(createQuestions())
    }
  }
}