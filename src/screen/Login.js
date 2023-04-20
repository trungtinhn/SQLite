import { StyleSheet, Text, View,TextInput, SafeAreaView ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useState } from 'react';
import SQLite from 'react-native-sqlite-storage'
const db = SQLite.openDatabase(
    {
      name: 'MainDb',
      location:'default',
    },
    ()=>{},
    error => { console.log(error) } 
  );
export default function Login({navigation}) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const getData = () =>{
        try{
          db.transaction((tx) =>{
            tx.executeSql(
              "SELECT UserName, Pass FROM Users",
              [],
              (tx,results) =>{
                var len = results.rows.length;
                if(len>0){
                    for(var i =0; i<len;i++){
                    var userName = results.rows.item(i).UserName
                    var userPass = results.rows.item(i).Pass
                    if(userName == user && userPass == password){
                        navigation.navigate('Classes')
                    }
                    }
                }
              }
            )
          })
        } catch (error){
          console.log(error);
        }
      }
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
    <View style = {styles.container}>
      <Text style = {styles.textName}>Login</Text>
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
        onPress={getData}
      style={styles.loginBtn}>
        <Text style={styles.text}>LOGIN</Text> 
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