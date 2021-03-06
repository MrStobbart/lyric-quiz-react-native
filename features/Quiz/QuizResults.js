import React from 'react'
import { ScrollView, Text } from 'react-native'
import Button from '../shared/Button'
import { connect } from 'react-redux'
import { setQuizPlayed } from './QuizReducer';
import { textViewDefault } from '../shared/Styles'



class QuizResults extends React.Component{

  static navigationOptions = {
    title: "Your results",
    headerBackTitle: null,
    headerLeft: null
  };

  constructor(props) {
    super(props);
    this.props.setQuizPlayed()
  }
  

  render() {
    const numberOfCorrectAnswers = this.props.questions
      .reduce(((accumulator, question) => question.correct ? accumulator + 1 : accumulator), 0)
    return (
      <ScrollView>
        <Text style={textViewDefault}> 
          You answered {numberOfCorrectAnswers} out of {this.props.questions.length} questions correctly
        </Text>
        <Button
          title="Back to menu"
          onPress={() => this.props.navigation.navigate('MainNavStack')}
        />
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizResults)

function mapStateToProps(state) {
  return {
    questions: state.quiz.questions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setQuizPlayed: () => {
      dispatch(setQuizPlayed())
    }
  }
}