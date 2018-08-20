import React from 'react';
import { Text, FlatList, View, SectionList } from 'react-native';


export default function SectionListView(props) {
  return (
    <SectionList
      renderItem={({ item, index }) => <Item key={item.id} index={index}>{item.name}</Item>}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
      )}
      sections={[
        { title: '4 Weeks', data: props.data['4 Weeks'] },
        { title: '6 Months', data: props.data['6 Months'] },
        { title: 'All time', data: props.data['All time'] }
      ]}
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


