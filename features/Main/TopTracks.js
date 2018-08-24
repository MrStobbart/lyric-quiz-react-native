import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SectionListView from './SectionListView.js';
import { Container, Content } from 'native-base';


class TopTracks extends React.Component {

  static navigationOptions = {
    title: "Your top 50 tracks"
  };

  render() {
    if (this.props.topTracks.length === 0) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <Container>
        <Content>
          <SectionListView
            data={this.props.topTracks}
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
