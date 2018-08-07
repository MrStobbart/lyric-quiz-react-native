import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import FlatListView from './FlatListView.js';


class TopArtists extends React.Component {


  render() {

    if (this.props.topArtists.length === 0) {
      console.log('Top artists array empty')
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

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

