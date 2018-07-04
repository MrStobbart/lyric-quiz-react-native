import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import FlatListView from './FlatListView.js';


class TopTracks extends React.Component {

  render() {

    // TODO do name stuff for tracks
    const topTracks = this.props.topTracks;
    console.log('props', topTracks)
    return (
      <View>
        <FlatListView
          data={topTracks}
        />
      </View>   
    )
  }
}

export default connect(mapStateToProps)(TopTracks)

function mapStateToProps(state) {
  return {
    topTracks: state.main.topTracks
  }
}