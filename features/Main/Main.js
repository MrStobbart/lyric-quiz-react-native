import React from 'react';
import { View, Button } from 'react-native';
import { connect } from 'react-redux';
import { fetchTopArtists, fetchTopTracks } from './MainReducer';


class Main extends React.Component{

  constructor(props) {
    super(props);
    this.props.fetchTopArtists();
    this.props.fetchTopTracks();
  }

  // TODO do data preparation (like track and title together)
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
        onPress={() => this.props.navigation.navigate('TopTracks')}
      />
      <Button
        title="Settings" 
        onPress={() => this.props.navigation.navigate('')}
      />
    </View>
    )
  }
}


export default connect(mapStateToProps, mapDispatchTopProps)(Main)

function mapStateToProps(state) {
  return {
    topArtists: state.main.topArtists,
    topTracks: state.main.topTracks
  }
}

function mapDispatchTopProps(dispatch) {
  return {
    fetchTopArtists: () => {
      dispatch(fetchTopArtists())
    },
    fetchTopTracks: () => {
      dispatch(fetchTopTracks())
    }
  }
}