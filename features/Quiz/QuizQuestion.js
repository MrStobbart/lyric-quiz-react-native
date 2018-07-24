import React from 'react'
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux'


class QuizQuestion extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      question: {}
    }
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    // console.log('nextProps', nextProps)
    // console.log('question nextprops', nextProps.question)
    if (this.props !== nextProps) {

      // console.log('questions', nextProps.questions)
      const questionCounter = nextProps.navigation.getParam('questionCounter')
      console.log('questionCounter', questionCounter)
      const question = nextProps.questions[questionCounter]
      this.setState({question: question})
    }
  }

  selectAnswer = (choosenTrackName) => {

    // TODO implement something like correct or wrong 
    console.log('selected answer:', choosenTrackName)
    if (choosenTrackName === this.state.question.trackName) {
      console.log('Right answer!!')
    } else {
      console.log('Wrong answer!!')
    }


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
    // console.log('question render', this.state.question)
    if (this.props.loading) {
      return (
        <View>
          <Text>Loading Quiz</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text>{this.state.question.lyrics}</Text>
          {
            this.state.question.choices.map((choice, index) => {
              return (
                <Button
                  title={choice}
                  onPress={() => this.selectAnswer(choice)}
                  key={index}
                />
              )
            })
          }
        </View>
      )  
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizQuestion)

function mapStateToProps(state) {
  return {
    questions: state.quiz.questions,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}
