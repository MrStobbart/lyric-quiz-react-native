import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'



class QuizResults extends React.Component{

  render() {
    return (
      <View>
        <Text>
          The result of the quiz will be here
        </Text>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizResults)

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}