import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import FlatListView from './FlatListView.js';


class TopTracks extends React.Component {

  getArtistNames = (artists) => {
    
    // TODO test this
    let artistString = ''
    for (let i = 0; i < artists.length; i++) {
      const artist = artists[i];
      if (i > 1 && artists.length > 4) return `${artistString} and others`
      if (i === 0) {
        artistString = artist.name;
      }else if (i === artists.length - 1) {
        artistString = `${artistString} & ${artist.name}` 
      }
    }
    return artistString
  }

  render() {

    // TODO do name stuff for tracks
    const topTracks = this.props.topTracks.map(track => {
      const artist = this.getArtistNames(track.artists);
      const name = `${track.name} (${artist})`
      return {
        id: track.id,
        name: name
      }
    });

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
    topTracks: state.main.topTracks.data
  }
}