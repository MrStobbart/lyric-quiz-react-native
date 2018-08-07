import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


export default function (props) {
  const buttonColor = props.color ? props.color : '#C4C4D9'
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: buttonColor,
        alignContent: 'center',
        justifyContent: 'center',
        height: 35,
        borderRadius: 3,
        elevation: 2, // Android
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, // IOS
        minWidth: 100,
        alignSelf: 'center',
      }}
    >
      <Text
        style={{
          textAlignVertical: 'center',
          color: 'black',
          textAlign: 'center',
          fontSize: 14,
          height: '100%',
          marginLeft: 8,
          marginRight: 8
        }}
      >
        {props.title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  )
}