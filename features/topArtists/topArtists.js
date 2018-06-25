import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchTopArtists, fetchTopTracks } from './topArtistsReducer';

class TopArtists extends React.Component {

  constructor(props) {
    super(props)
    this.props.fetchTopArtists();
  }

  render() {
    // TODO these props are not updated when they should be
    console.log(this.props)
    return (
      <View>
        <Text>Top Artists here</Text>
        <FlatList
          data={this.props.topArtists}
          renderItem={({ item }) => <Text key={item.id}>{item.name}</Text>}
        />
      </View>   
    )
  }
}

/**
 * TopArtists Container
 */
export default connect(mapStateToProps, mapDispatchTopProps)(TopArtists)

function mapStateToProps(state) {
  
  console.log('map state to props', state.top.topArtists);
  return {
    topArtists: state.top.topArtists
  }
}

function mapDispatchTopProps(dispatch) {
  return {
    fetchTopArtists: () => { dispatch(fetchTopArtists()) },
    fetchTopTracks: () => { dispatch(fetchTopTracks()) }
  }
}

