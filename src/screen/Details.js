import { StyleSheet, Text, View, Image , FlatList, TouchableOpacity} from 'react-native'
import React ,{useEffect, useState }from 'react'
import SQLite from 'react-native-sqlite-storage'
const db = SQLite.openDatabase(
  {
    name: 'MainDb',
    location:'default',
  },
  ()=>{},
  error => { console.log(error) } 
);
const Student = [
  {
    idstudent: 'student01',
    name: 'Trung Tinh',
    avatar: 'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
    dob: '1/1/2023',
    idclass: 'class01',
  },
  {
    idstudent: 'student02',
    name: 'Trung Tinh',
    avatar: 'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
    dob: '1/1/2023',
    idclass: 'class01',
  },
  {
    idstudent: 'student03',
    name: 'Trung Tinh',
    avatar: 'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
    dob: '1/1/2023',
    idclass: 'class02',
  },
  {
    idstudent: 'student04',
    name: 'Trung Tinh',
    avatar: 'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
    dob: '1/1/2023',
    idclass: 'class02',
  },
  {
    idstudent: 'student05',
    name: 'Trung Tinh',
    avatar: 'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
    dob: '1/1/2023',
    idclass: 'class03',
  },
  {
    idstudent: 'student06',
    name: 'Trung Tinh',
    avatar: 'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
    dob: '1/1/2023',
    idclass: 'class03',
  },
  {
    idstudent: 'student07',
    name: 'Trung Tinh',
    avatar: 'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
    dob: '1/1/2023',
    idclass: 'class04',
  },
  {
    idstudent: 'student08',
    name: 'Trung Tinh',
    avatar: 'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
    dob: '1/1/2023',
    idclass: 'class04',
  },
]
export default function Details({navigation,route}) {
  const {IdClass, NameClass, StudentClass} = route.params
  const data = new Array();
  useEffect(() =>{
       
    setData()
    getData()

   
  }, [])
  const setData = async () =>{
    await db.transaction(async (tx)=> {
      await tx.executeSql(
        'INSERT INTO Student (IDStudent, Avatar, Name, Dob, IDClass) VALUES (?,?,?,?,?)' + 
        // Student.map( i =>'(' + i.idstudent + ', ' + i.avatar + ', ' + i.name +',' + i.dob + ',' + i.idclass +')'
        // ).join(','),
        [Student[1].idstudent,Student[1].avatar,Student[1].name,Student[1].dob,Student[1].idclass]
        ,
        (tx, results) => {
          console.log('Results', results.rowsAffected)
        }
      )
    })
  }
  const getData = () => {
    db.transaction((tx) =>{
      tx.executeSql(
          "SELECT IDStudent, Avatar, Name, Dob FROM Student WHERE IDClass = ? ",
          [IdClass],
          (tx, res) =>{
            const len = res.rows.length
           
            
            if (len > 0)
            {
              
              for (var i = 0; i < len; i++)
              {
                var Class = {
                  Id: res.rows.item(i).IDStudent,
                  Name: res.rows.item(i).Name,
                  Dob: res.rows.item(i).Dob,
                  Avatar: res.rows.item(i).Avatar
                }

                data.push(Class)
                
                
              }
              
            }
          } 
      )
  })
  }
  return (
    <View style = {{ alignItems: 'center'}}>
      <TouchableOpacity onPress={() => {setData(), getData()}}>
      <Text>Details</Text>
      </TouchableOpacity>
      <View style = {styles.product}>
                    <View style = {{marginTop: 5, marginLeft: 4}}>
                    <Text>ID: {IdClass}</Text>
                    </View>
                    <View style = {{marginLeft: 4, marginTop:5}}>
                      <Text>Name: {NameClass}</Text>
                    </View>
        <View style = {{marginLeft: 4, marginTop:5}}>
            <Text>Students: {StudentClass}</Text>
        </View>
      </View>
      <View style = {{width: '100%', height: 600, alignItems: 'center'}}>
          <FlatList
              data={data}
              renderItem={({item}) => (
                <View style = {styles.details}>
                    <Image source = {{uri: item.Avatar}}
                    style = {{ marginLeft: 10, marginTop: 10, aspectRatio: 1, borderRadius: 55, width: 25}}
                    ></Image>
                    <View style = {{flexDirection: 'row'}}>
                    <View style = {{marginTop: 5, marginLeft: 4}}>
                    <Text>ID: {item.Id}</Text>
                    </View>
                    <View style = {{marginLeft: 4, marginTop:5}}>
                      <Text>Name: {item.Name}</Text>
                    </View>
                    <View style = {{marginLeft: 4, marginTop:5}}>
                      <Text>Dob: {item.Dob}</Text>
                    </View>
                    </View>
                </View>
              )
            }
    />
      </View>
    </View>
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
  },
  details:{
    borderRadius: 5,
    borderWidth: 1,
    width: 250,
    height: 80,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10
  }
})