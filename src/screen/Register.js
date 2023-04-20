import { StyleSheet, Text, View,TouchableOpacity,SafeAreaView,TextInput } from 'react-native'
import React, { useEffect } from 'react'
import SQLite from 'react-native-sqlite-storage'
import {NavigationContainer} from '@react-navigation/native'; 
import {createNativeStackNavigator} from '@react-navigation/native-stack'; 
import { useState } from 'react';
const db = SQLite.openDatabase(
    {
      name: 'MainDb',
      location:'default',
    },
    ()=>{},
    error => { console.log(error) } 
  );
export default function Register({navigation}) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const onPress = () =>{ 
            createTableUser() 
            createTableDetails()
            createTableClass()
            setData();
    }
    
      const createTableUser = () =>{
        db.transaction((tx)=>{
           tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            +"Users "
            +"(UserName TEXT NOT NULL, Pass TEXT NOT NULL)"
           )
        })
      }
      const createTableClass = () =>{
        db.transaction((tx)=>{
           tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            +"Class "
            +"(IDClass TEXT PRIMARY KEY, NameClass TEXT NOT NULL, Student TEXT NOT NULL)"
           )
        })
      }
      const createTableDetails = () =>{
        db.transaction((tx)=>{
           tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            +"Student "
            +"(IDStudent TEXT PRIMARY KEY,Name TEXT NOT NULL, Dob TEXT NOT NULL, IDClass )"
           )
        })
      }
      const setData = async () =>{
        await db.transaction(async (tx)=> {
          await tx.executeSql(
            'INSERT INTO Users (UserName, Pass) VALUES (?,?)',
            [user,password],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  navigation.navigate('Login')
                }
              }
            
          )
        })
      }
    return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
    <View style = {styles.container}>
      <Text style = {styles.textName}>REGISTER</Text>
      <Text style = {{marginTop: 30}}>
        <Text>User Name</Text>
      </Text>
      <TextInput style = {styles.input}
        placeholderTextColor="#003f5c"
        onChangeText = {(user) => setUser(user)}/>
      <Text style = {{marginTop: 10}}>
        <Text>PassWord</Text>
        </Text>
      <TextInput style = {styles.input}
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText = {(password) => setPassword(password)}/>
      <TouchableOpacity
        onPress={onPress}
        style={styles.loginBtn}>
        <Text style={styles.text}>CREATE</Text> 
      </TouchableOpacity>
      </View>
      
     </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      },
      button:{
        width:200,
        height:40,
        borderWidth: 2,
        borderRadius: 10,
        marginVertical: 30,
        backgroundColor: '#BBBBBB',
        justifyContent: 'center',
      }, 
      image:{
        width: 270,
        height: 270,
        marginBottom: 10,
        borderRadius: 20
      },
      text:{
        fontSize: 20,
        textAlign: 'center'
      }, 
      textName:{
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: 5,
      },
      input: {
        width: 200,
        padding: 10,
        height: 40,
        borderWidth: 1,
        marginTop: 5
      },
      loginBtn:
      {
        width:100,
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
        backgroundColor:"#BBBBBB",
      }    
})