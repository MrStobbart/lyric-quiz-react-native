import React from 'react'
import { View, Text } from 'react-native';
import { connect } from 'react-redux'


class QuizQuestion extends React.Component{

  constructor(props) {
    super(props)
  }

  selectAnswer = (number) => {
    console.log('selected answer:', number)

    // TODO param must be int
    const newQuestionCounter = this.props.navigation.getParam('questionCounter') + 1
    // TODO check if this if statement is correct
    if (newQuestionCounter >= this.props.questions.length) {
      this.props.navigation.navigate('QuizQuestion', { questionCounter: newQuestionCounter })
    } else {
      this.props.navigation.navigate('QuizResults')
    }
      
  }

  render() {
    console.log('questions', this.props.questions)
    const questionCounter = this.props.navigation.getParam('questionCounter')
    console.log('questionCounter', questionCounter)
    const quizQuestion = this.props.questions[questionCounter]
    return (
      <View>
        <Text>This is a quiz page</Text>
        <Text>{quizQuestion.lyrics}</Text>
        <Button
          title={quizQuestion.option0}
          onPress={() => this.selectAnswer(0)}
        />
        <Button
          title={quizQuestion.option1}
          onPress={() => this.selectAnswer(1)}
        />
        <Button
          title={quizQuestion.option2}
          onPress={() => this.selectAnswer(2)}
        />
        <Button
          title={quizQuestion.option3}
          onPress={() => this.selectAnswer(3)}
        />
      </View>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizQuestion)

function mapStateToProps(state) {
  return {
    questions: state.quiz.questions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}
