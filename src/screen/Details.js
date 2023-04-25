import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SQLite from 'react-native-sqlite-storage'
const db = SQLite.openDatabase(
  {
    name: 'MainDb',
    location:'default',
  },
  ()=>{},
  error => { console.log(error) } 
);
export default function Details() {
  return (
    <View>
      <Text>Details</Text>
    </View>
  )
}

const styles = StyleSheet.create({})