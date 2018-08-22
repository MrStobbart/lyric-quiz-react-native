import React from 'react'
import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import Button from '../shared/Button'
import { setQuestionAnswer } from './QuizReducer';
import { textViewDefault } from '../shared/Styles'


class QuizQuestion extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const questionCounter = navigation.getParam('questionCounter')
    return {
      title: `Question ${questionCounter ? questionCounter + 1 : 1}`,
    }
  }

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
      this.setState({
        selectAnswerError: '',
        answerSelected: false,
        clickedButtonColor: undefined,
        clickedButtonIndex: undefined
      })
    }
    const question = props.questions[questionCounter]
    this.setState({
      question: question,
      questionCounter: questionCounter,
    })
  }

  selectAnswer = (choosenTrackName, index) => {

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
    } else {
      this.props.setQuestionAnswer(questionIndex, false)
      this.setState({
        clickedButtonColor: "#fff1f0",
        clickedButtonIndex: index
      })
    }
  }

  navigateToNextQuestion = () => {

    if (this.state.answerSelected) {
      const newQuestionCounter = this.state.questionCounter + 1
      if (newQuestionCounter < this.props.questions.length) {
        this.props.navigation.navigate('QuizQuestion', {
          questionCounter: newQuestionCounter,
        })
      } else {
        this.props.navigation.navigate('QuizResults')
      }
    } else {
      this.setState({selectAnswerError: 'Please select an answer'})
    }
  }

  render() {
    if (this.props.loading || this.state.question.choices === undefined) {
      return (
        <ScrollView>
          <Text style={textViewDefault}>Loading quiz... This can take up to 10 seconds.</Text>
          <ActivityIndicator size="large" color="#5B5F97" />
        </ScrollView>
      )
    } 
    return (
      <ScrollView>
        <Text style={textViewDefault}>{this.state.question.lyrics}</Text>
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
        <Text style={textViewDefault}>{this.state.selectAnswerError}</Text>
      </ScrollView>
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
