import React from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'



class QuizResults extends React.Component{

  render() {
    console.log(this.props.questions)
    const numberOfCorrectAnswers = this.props.questions
      .reduce(((accumulator, question) => question.correct ? accumulator + 1 : accumulator), 0)
    console.log('numberOfCorrectAnswers', numberOfCorrectAnswers)
    return (
      <View>
        <Text>
          You answered {numberOfCorrectAnswers} out of {this.props.questions.length} questions correctly
        </Text>
        <Button
          title="Back to menu"
          onPress={() => this.props.navigation.navigate('MainNavStack')}
        />
      </View>
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
    
  }
}