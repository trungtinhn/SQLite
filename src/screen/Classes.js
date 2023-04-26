import { StyleSheet, Text, View, TouchableOpacity , SafeAreaView, FlatList} from 'react-native'
import React, {useEffect, useState } from 'react';
import SQLite from 'react-native-sqlite-storage'
import classes from '../components/classes';
const db = SQLite.openDatabase(
  {
    name: 'MainDb',
    location:'default',
  },
  ()=>{},
  error => { console.log(error) } 
);
const ClassData = [
  {
    id: 'class01',
    name: 'class01',
    number: '5'
  },
  {
    id: 'class02',
    name: 'class02',
    number: '5'
  },
  {
    id: 'class03',
    name: 'class03',
    number: '5'
  },
  {
    id: 'class04',
    name: 'class04',
    number: '5'
  },
  {
    id: 'class05',
    name: 'class05',
    number: '5'
  },
]
export default function Classes({navigation}) {
  const [update, setupdate] = useState(0)
  const data = new Array();
  useEffect(() =>{
       
    setData()
    getData()
   
  }, [ClassData])
  const setData = async () =>{
    await db.transaction(async (tx)=> {
      await tx.executeSql(
        `INSERT INTO Class (IDClass, NameClass, Student) values` + 
        ClassData.map( i =>`(${i.id}, '${i.name}', '${i.number}')`
        ).join(','),
        (tx, results) => {
          console.log('Results', results.rowsAffected)
        }
      )
    })
  }
  const getData = () => {
    db.transaction((tx) =>{
      tx.executeSql(
          "SELECT IDClass, NameClass, Student FROM Class",
          [],
          (tx, res) =>{
            const len = res.rows.length
           
            
            if (len > 0)
            {
              
              for (var i = 0; i < len; i++)
              {
                var Class = {
                  Id: res.rows.item(i).IDClass,
                  Name: res.rows.item(i).NameClass,
                  Students: res.rows.item(i).Student,
                }

                data.push(Class)
                
                
              }
              
            }
          } 
      )
  })
  }
  return (
    <SafeAreaView>
    <View style = {{alignItems: 'center'}}>
      <TouchableOpacity onPress = {()=>{}}>
      <Text style = {{fontWeight: 'bold', fontSize: 30}}>Classes</Text>
      </TouchableOpacity>
    </View>
    <View style = {{width: '100%', height: 600, alignItems: 'center'}}>
          <FlatList
              data={data}
              renderItem={({item}) => (
                <View>
                <TouchableOpacity 
                    onPress={() => 
                      {
      
                        const IdClass = item.Id
                        const NameClass = item.Name
                        const StudentClass = item.Students
                        navigation.navigate('Details', {IdClass, NameClass, StudentClass})
      
                      }}
                    style = {styles.product}>
                    <View style = {{marginTop: 5, marginLeft: 4}}>
                    <Text>ID: {item.Id}</Text>
                    </View>
                    <View style = {{marginLeft: 4, marginTop:5}}>
                      <Text>Name: {item.Name}</Text>
                    </View>
                    <View style = {{marginLeft: 4, marginTop:5}}>
                      <Text>Students: {item.Students}</Text>
                    </View>
                </TouchableOpacity>
                </View>
              )
            }
    />
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  product:{
    borderRadius: 5,
    borderWidth: 1,
    width: 250,
    height: 80,
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 10
  }
})