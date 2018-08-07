import React from 'react'
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import Button from '../shared/Button'
import { setQuestionAnswer } from './QuizReducer';
import { Spinner } from 'native-base';


class QuizQuestion extends React.Component {

  static navigationOptions = {
    title: "Question"
  };

  constructor(props) {
    super(props)
    this.state = {
      question: {},
      answerSelected: false,
      selectAnswerError: false,
      questionCounter: 0
    }
  }

  componentDidMount() {
    this.init(this.props)
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    // console.log('nextProps', nextProps)
    if (this.props !== nextProps) {
      this.init(nextProps)
    }
  }

  init = (props) => {
    const questionCounter = props.navigation.getParam('questionCounter')
    if (this.state.questionCounter !== questionCounter) {
      props.navigation.setParams({
        title: `Question ${questionCounter}`
      })
    }
    console.log('questionCounter', questionCounter)
    const question = props.questions[questionCounter]
    this.setState({
      question: question,
      questionCounter: questionCounter
    })
  }

  updateQuestion = () => {

  }

  selectAnswer = (choosenTrackName) => {

    // TODO implement something like correct or wrong 
    console.log('selected answer:', choosenTrackName)

    this.setState({ answerSelected: true, selectAnswerError: false })
    const index = this.state.questionCounter
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
      const newQuestionCounter = this.state.questionCounter + 1
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
    console.log('QuizQuestion props', this.props)
    console.log('QuizQuestion state', this.state)
    if (this.props.loading || this.props.questions.length === 0) {
      return <Spinner color = "#5B5F97" / >
    } 
    return (
      <View>
        <Text style={{textAlign: 'center'}}>{this.state.question.lyrics}</Text>
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
