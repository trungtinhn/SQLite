/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack'; 
import Login from './src/screen/Login';
import Details from './src/screen/Details';
import Register from './src/screen/Register';
import Classes from './src/screen/Classes';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 
    <Stack.Navigator> 
      <Stack.Screen
      name="Register"
      component={Register}
      ></Stack.Screen>
      <Stack.Screen 
      name="Login" 
      component={Login}/>
      <Stack.Screen 
      name="Classes" 
      component={Classes}/> 
      <Stack.Screen 
      name="Details" 
      component={Details}/> 
  </Stack.Navigator> 
 </NavigationContainer>
  )
}

const styles = StyleSheet.create({})