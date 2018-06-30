import React from 'react';
import { View, Button } from 'react-native';


export default class Main extends React.Component{


  render() {
    return (
    <View>
      <Button
        title="Start playing" 
        onPress={() => this.props.navigation.navigate('')}
      />
      <Button
        title="Your top artists" 
        onPress={() => this.props.navigation.navigate('TopArtists')}
      />
      <Button
        title="Your top songs" 
        onPress={() => this.props.navigation.navigate('')}
      />
      <Button
        title="Settings" 
        onPress={() => this.props.navigation.navigate('')}
      />
    </View>
    )
  }
}