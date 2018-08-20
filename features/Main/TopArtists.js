import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import SectionListView from './SectionListView.js';


class TopArtists extends React.Component {

  static navigationOptions = {
    title: "Your top 50 artists"
  };

  render() {

    if (this.props.topArtists.length === 0) {
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
            data={this.props.topArtists}
          />
        </Content>
      </Container>
    )
  }
}

export default connect(mapStateToProps)(TopArtists)


function mapStateToProps(state) {
  return {
    topArtists: state.main.topArtists.data,
  }
}

