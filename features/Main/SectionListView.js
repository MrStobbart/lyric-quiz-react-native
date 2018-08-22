import React from 'react';
import { Text, FlatList, View, SectionList } from 'react-native';
import { Tab, Tabs } from 'native-base';


export default function SectionListView(props) {
  return (
    <View>
      <Tabs>
        {Object.keys(props.data).map((key, index) => { 
          return (
            <Tab
              heading={key}
              key={index}
            >
              <FlatList
                renderItem={({ item, index }) => <Item key={item.id} index={index}>{item.name}</Item>}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <ItemSeperator />}
                data={props.data[key]}
              />
            </Tab>
          )
        })}
      </Tabs>
    </View>
    
  )
}

function SectionHeader(props) {
  return (
    <View>
      <View
        style={{
          backgroundColor: 'black',
          opacity: 0.5,
          height: 3
        }}
      />
      <Text
        style={{
          fontSize: 20,
          margin: 27,
          textAlign: 'center'
        }}
      >
        {props.children}
      </Text>
      <View
        style={{
          backgroundColor: 'black',
          opacity: 0.5,
          height: 3
        }}
      />
    </View>
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



