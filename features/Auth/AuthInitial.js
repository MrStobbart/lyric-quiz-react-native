import React from 'react';
import { View, Button, Text } from 'react-native';


export default class AuthInitial extends React.Component{

  buttonClicked() {
    console.log('Button clicked')
  }

  render() {
    return (
      <View>
        <Text>This is the initial View</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('AuthSpotify')}
        />
      </View>
    )
  }
}