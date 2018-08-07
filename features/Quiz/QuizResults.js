import React from 'react'
import { View, Text } from 'react-native'
import Button from '../shared/Button'
import { connect } from 'react-redux'
import { setQuizPlayed } from './QuizReducer';



class QuizResults extends React.Component{

  static navigationOptions = {
    title: "Your results"
  };

  constructor(props) {
    super(props);
    this.props.setQuizPlayed()
  }
  

  render() {
    console.log(this.props.questions)
    const numberOfCorrectAnswers = this.props.questions
      .reduce(((accumulator, question) => question.correct ? accumulator + 1 : accumulator), 0)
    console.log('numberOfCorrectAnswers', numberOfCorrectAnswers)
    return (
      <View>
        <Text style={{textAlign: 'center'}}> 
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
    setQuizPlayed: () => {
      dispatch(setQuizPlayed())
    }
  }
}