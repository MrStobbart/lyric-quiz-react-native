import React from 'react';
import { Text, FlatList, View } from 'react-native';


export default function FlatListView(props) {
  return (
    <FlatList
      data={props.data}
      renderItem={({ item, index }) => <Item key={item.id} index={index}>{item.name}</Item>}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <ItemSeperator />}
    />
  )
}


function Item(props) {
  return (
    <View
      style={{
        margin: 18,
        flex: 1,
        flexDirection: 'row'
      }}
    >
      <Text
        style={{
          flex: 1,
          width: 60,
        }}
      >
        {props.index + 1}
      </Text>
      <Text
        style={{
          textAlign: 'left',
          flex: 10
        }}
      >
        {props.children}
      </Text>
    </View>
  )
}

function ItemSeperator(props) {
  return (
    <View
      style={{
        backgroundColor: 'grey',
        opacity: 0.5,
        height: 1
      }}
    />
  )
}

// TODO styling


