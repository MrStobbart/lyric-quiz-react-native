import React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import FlatListView from './FlatListView.js';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';


class TopTracks extends React.Component {

  static navigationOptions = {
    title: "Your top 50 tracks"
  };

  render() {
    if (this.props.topTracks.length === 0) {
      console.log('Top tracks array empty')
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    
    const topTracks = this.props.topTracks.map(track => {
      const artist = getArtistNames(track.artists);
      const name = `${track.name} (${artist})`
      return {
        id: track.id,
        name: name
      }
    });

    return (
      <Container>
        <Content>
          <FlatListView
            data={topTracks}
          />
        </Content>
      </Container>
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