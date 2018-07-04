import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import FlatListView from './FlatListView.js';


class TopArtists extends React.Component {


  render() {

    return (
      <View>
        <FlatListView
          data={this.props.topArtists}
        />
      </View>   
    )
  }
}

export default connect(mapStateToProps)(TopArtists)


function mapStateToProps(state) {
  return {
    topArtists: state.main.topArtists.data,
  }
}

