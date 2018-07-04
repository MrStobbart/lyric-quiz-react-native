import React from 'react';
import { Text, FlatList, View } from 'react-native';


export default function FlatListView(props) {
  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => <Text key={item.id}>{item.name}</Text>}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}


// TODO styling


