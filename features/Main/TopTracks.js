import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import FlatListView from './FlatListView.js';


class TopTracks extends React.Component {

  render() {
    // TODO do name stuff for tracks
    const topTracks = this.props.topTracks.map(track => {
      const artist = getArtistNames(track.artists);
      const name = `${track.name} (${artist})`
      return {
        id: track.id,
        name: name
      }
    });

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

export function getArtistNames(artists){

  let artistString = ''
  for (let i = 0; i < artists.length; i++) {
    const artist = artists[i].name;
    if (i > 1 && artists.length >= 4) return `${artistString} and others`
    if (i === 0) {
      artistString = artist;
    } else if (i === 1 && artists.length >= 3) {
      artistString = `${artistString}, ${artist}`
    } else if (artists.length >= 2) {
      artistString = `${artistString} & ${artist}`
    }
  }
  return artistString
}