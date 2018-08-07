import React from 'react'
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux'
import { setQuestionAnswer } from './QuizReducer';


class QuizQuestion extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      question: {},
      answerSelected: false,
      selectAnswerError: false
    }
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    // console.log('nextProps', nextProps)
    if (this.props !== nextProps) {

      // console.log('questions', nextProps.questions)
      const questionCounter = nextProps.navigation.getParam('questionCounter')
      console.log('questionCounter', questionCounter)
      const question = nextProps.questions[questionCounter]
      this.setState({ question: question })
    }
  }

  selectAnswer = (choosenTrackName) => {

    // TODO implement something like correct or wrong 
    console.log('selected answer:', choosenTrackName)

    this.setState({ answerSelected: true, selectAnswerError: false })
    const index = this.props.navigation.getParam('questionCounter')
    if (choosenTrackName === this.state.question.trackName) {
      this.props.setQuestionAnswer(index, true)
      console.log('Right answer!!')
    } else {
      this.props.setQuestionAnswer(index, false)
      console.log('Wrong answer!!')
    }
  }

  navigateToNextQuestion = () => {

    console.log('navigate to next question')
    if (this.state.answerSelected) {
      const newQuestionCounter = this.props.navigation.getParam('questionCounter') + 1
      // TODO check if this if statement is correct
      console.log('answer selected', newQuestionCounter, this.props.questions.length)
      if (newQuestionCounter < this.props.questions.length) {
        this.props.navigation.navigate('QuizQuestion', {
          questionCounter: newQuestionCounter
        })
      } else {
        console.log('results')
        this.props.navigation.navigate('QuizResults')
      }
    } else {
      this.setState({selectAnswerError: true})
    }
    // TODO param must be int
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
          <Button
            title="Next question"
            onPress={() => this.navigateToNextQuestion()}
            />
          <Text>{this.state.selectAnswerError ? 'Please select an answer' : ''}</Text>
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
    setQuestionAnswer: (index ,correct) => {
      dispatch(setQuestionAnswer(index, correct))
    }
  }
}
