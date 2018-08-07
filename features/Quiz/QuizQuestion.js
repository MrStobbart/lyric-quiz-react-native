import React from 'react'
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import Button from '../shared/Button'
import { setQuestionAnswer } from './QuizReducer';
import { Spinner } from 'native-base';


class QuizQuestion extends React.Component {

  static navigationOptions = {
    title: "Question",
    headerBackTitle: null,
    headerLeft: null
  };

  constructor(props) {
    super(props)
    this.state = {
      question: {},
      answerSelected: false,
      selectAnswerError: '',
      questionCounter: 0,
      clickedButtonIndex: undefined,
      clickedButtonColor: undefined
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
    let questionCounter = props.navigation.getParam('questionCounter')

    if (questionCounter === undefined) {
      questionCounter = 0
    }

    if (this.state.questionCounter !== questionCounter) {
      props.navigation.setParams({
        title: `Question ${questionCounter}`
      })
      this.setState({
        selectAnswerError: '',
        answerSelected: false,
        clickedButtonColor: undefined,
        clickedButtonIndex: undefined
      })
    }
    console.log('questionCounter', questionCounter)
    const question = props.questions[questionCounter]
    this.setState({
      question: question,
      questionCounter: questionCounter,
    })
  }

  selectAnswer = (choosenTrackName, index) => {

    // TODO implement something like correct or wrong 
    console.log('selected answer:', choosenTrackName)

    this.setState({ answerSelected: true, selectAnswerError: false })

    if (this.state.answerSelected) {
      this.setState({selectAnswerError: 'An answer was already selected'})
      return
    }
    const questionIndex = this.state.questionCounter
    
    if (choosenTrackName === this.state.question.trackName) {
      this.props.setQuestionAnswer(questionIndex, true)
      this.setState({
        clickedButtonColor: "#f2fae3",
        clickedButtonIndex: index
      })
      console.log('Right answer!!')
    } else {
      this.props.setQuestionAnswer(questionIndex, false)
      this.setState({
        clickedButtonColor: "#fff1f0",
        clickedButtonIndex: index
      })
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
      this.setState({selectAnswerError: 'Please select an answer'})
    }
    // TODO param must be int
  }

  render() {
    console.log('QuizQuestion props', this.props)
    console.log('QuizQuestion state', this.state)
    if (this.props.loading || this.state.question.choices === undefined) {
      return <Spinner color = "#5B5F97" / >
    } 
    return (
      <View>
        <Text style={{textAlign: 'center'}}>{this.state.question.lyrics}</Text>
        {
          this.state.question.choices.map((choice, index) => {
            let color
            if (index === this.state.clickedButtonIndex) {
              color = this.state.clickedButtonColor
            }
            return (
              <Button
                color={color}
                title={choice}
                onPress={() => this.selectAnswer(choice, index)}
                key={index}
              />
            )
          })
        }
        <Button
          color={this.state.answerSelected ? "#ebf7fd" : undefined}
          title="Next question"
          onPress={() => this.navigateToNextQuestion()}
          />
        <Text style={{textAlign: 'center'}}>{this.state.selectAnswerError}</Text>
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
