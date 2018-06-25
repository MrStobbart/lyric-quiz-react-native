import React from 'react';
import { View, Button, Text } from 'react-native';


export default class AuthInitial extends React.Component{


  // TODO style this propery
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