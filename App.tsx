/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';



  function App() {
    const [data, setData] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
   
  
    const fetchData = async() =>{
      try{
        const response = await fetch('https://testnets-api.opensea.io/api/v1/assets');
        const myData = await response.json();
        setData(myData.assets)
      }
      catch(error){
        console.error(error);
      }
    };
  
    const renderItem = ({ item }) => {
      return(
        <TouchableOpacity onPress={ () => setSelectedItem(item)} style={styles.item}>
          <View>
            <Image 
              style = {styles.image}
              source={{uri:  `${item.image_url}`}}/>
            <Text style = {styles.textName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )
    };
    if(selectedItem != null)
    {
      return(
        <View style={[styles.container, styles.click]}>
          <Image style={styles.image} source={{uri:  `${selectedItem.image_url}`}}/>
          <Text style={styles.textName}>{selectedItem.name}</Text>
          <Text style={styles.text}>{selectedItem.description}</Text>
          <TouchableOpacity style={styles.button}
            onPress = {() => setSelectedItem(null)}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else{
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}
            onPress ={fetchData}>
            <Text style={styles.text}>Load Data</Text>
         
          </TouchableOpacity>
          
          <FlatList
            data={data}
            keyExtractor = {(item) => item.id.toString()}
            renderItem={renderItem}
          />
        </View>
      );
  
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CCFFCC',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 20
  
    },
    button:{
      width:150,
      height:40,
      borderWidth: 2,
      borderRadius: 10,
      marginVertical: 30,
      backgroundColor: '#99FF33',
      justifyContent: 'center',
      flexDirection: 'column',
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
    click:{
      marginTop: 30
    },
    item:{
      margin:20
    },
    textName:{
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15
    },
    linearGradient: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      height: 200,
      width: 350,
    },
  });
 

export default App;