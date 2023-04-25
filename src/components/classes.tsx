import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const classes = (props:any) => {
    return (
      <View>
      <TouchableOpacity 
          onPress={props.onPress}
          style = {styles.product}>
          <View style = {{marginTop: 5, marginLeft: 4}}>
          <Text>ID: {props.id}</Text>
          </View>
          <View style = {{marginLeft: 4, marginTop:5}}>
            <Text>Name: {props.class}</Text>
          </View>
          <View style = {{marginLeft: 4, marginTop:5}}>
            <Text>Students: {props.soluong}</Text>
          </View>
      </TouchableOpacity>
      </View>
    )
  }
  const styles = StyleSheet.create({
    product:{
      borderRadius: 5,
      borderWidth: 5,
      width: 100,
      height: 60,
      flexDirection: 'column'
    }
  })
  export default classes