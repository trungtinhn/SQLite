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
]
export default function Classes() {
  const [update, setupdate] = useState(0)
  const data = new Array();
  const onPress = ()=>{
      setData()
      getData()
  }
  const setData = async () =>{
    await db.transaction(async (tx)=> {
      await tx.executeSql(
        // 'INSERT INTO Class (IDClass, NameClass, Student) VALUES'+
        // ClassData.map(
        //   i => '('${i.id}','${i.name}','${i.number}')',
        // ).join(',')
        `INSERT INTO Class(IDClass, NameClass, Student) values` + 
        ClassData.map( i =>`('${i.id}', '${i.name}', '${i.number}')`, 
        ).join(',')
      )
    })
  }
  const getData = () => {
    db.transaction((tx) =>{
      tx.executeSql(
          "SELECT IDClass, NameClass, Student FROM Classes",
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
      <TouchableOpacity onPress = {onPress}>
      <Text style = {{fontWeight: 'bold', fontSize: 30}}>Classes</Text>
      </TouchableOpacity>
    </View>
    <View style = {{width: '100%', height: 200, backgroundColor: '#C0C0C0'}}>
          <FlatList
              data={ClassData}
              renderItem={({item}) => 
              <classes
              onPress={() => 
                {

                  const IdClass = item.id
                  const NameClass = item.name
                  const StudentClass = item.students
                  navigation.navigate('Details', {IdClass, NameClass, StudentClass})

                }}
              id = {item.id}
              class = {item.name}
              soluong = {item.number}
              >
              </classes>
            }
    />
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})