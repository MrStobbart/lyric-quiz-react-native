import React from 'react'
import { View, Text, Button } from 'react-native';
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

    // TODO implement something like correct or wrong 
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
    // TODO have a loop with the answers here
    return (
      <View>
        <Text>This is a quiz page</Text>
        <Text>{quizQuestion.lyrics}</Text>
        {
          quizQuestion.choices.map((choice, index) => {
            return (
              <Button
                title={choice}
                onPress={() => this.selectAnswer(index)}
                key={index}
              />
            )
          })
        }
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
