import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState,useEffect } from "react";

import { SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity,StatusBar } from "react-native";
import Mod from "./Modal";

export default function App() {

  const [Ddata,Setddata]=useState([])
  const [Total,SetTotal]=useState(0)

  useEffect(() => {
    storagesave()
    totalSet()
  }, [Ddata])

  const totalSet=()=>{
    let value = 0
    for (let i = 0; i < Ddata.length; i++) {
      value += Number(Ddata[i].price)
    }
  SetTotal(value)
  }

  const  deleteItemById = async (id) => {
    console.log(id)
   const filteredData = Ddata.filter(item => item.id !== id);
  // Setddata({ Ddata: filteredData });
  Setddata(filteredData)
  if(Ddata.length > 1){
    console.log("ye part chala storage wala",Ddata.length )
  storagesave()
}else{
  console.log("niche wala part chala storage wala" )
  await AsyncStorage.setItem('@storage_Key',"[]")
  }
}
  
  function findtotal(datarecive){
    let value = 0
    for (let i = 0; i < datarecive.length; i++) {
      value += Number(datarecive[i].price)
    }
  SetTotal(value)
  }
  async function storagesave(){ 
    let convert =JSON.stringify(Ddata)
    console.log(typeof(convert))
    if(convert==="[]" ||convert===""){
      console.log("ye chala",convert)
      // await AsyncStorage.setItem('@storage_Key',"[]")
      //await AsyncStorage.removeItem('@storage_Key')
   
    }else{await AsyncStorage.setItem('@storage_Key',convert)
    console.log("storage done")}
    
  }

  const center =async (recive)=>{
    if(recive){ 
    Setddata([...Ddata,recive])

    console.log(findtotal(Ddata))
    console.log("ye update aya",recive)
    storagesave()
  

  }else{ 
    const preconvert=JSON.parse(await AsyncStorage.getItem('@storage_Key'))
     console.log(findtotal(preconvert))
      Setddata(preconvert)
  }
   
  }

   useEffect(() => {
    center()
   },[]);

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar
        animated={true}
        backgroundColor="#61dafb"
      />
    <View style={{width:"80%",height:"10%",alignSelf:"center",}}>
    <Mod center={center}/>
    </View>
    <FlatList 
        data={Ddata}
        renderItem={({ item }) => <View  style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"yellow",marginVertical:3, borderRadius:15}}>
        <View style={{padding:2}}><Text onPress={() => deleteItemById(item.id)} style={styles.item}>{item.item}</Text></View>
        <View style={{marginHorizontal:2}}><Text style={styles.item}>{item.price}</Text></View></View>}
        keyExtractor={(item) => item.id}
      />

      <View style={{alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
      <View style={{marginHorizontal:5}}><Text style={{fontSize:25}}>Total</Text></View><View><Text style={{fontSize:28}}>{Total}</Text></View></View>
      <TouchableOpacity onPress={async()=>{AsyncStorage.removeItem('@storage_Key'), Setddata("")}}><View style={{padding:2}}><Text>Clear All</Text></View></TouchableOpacity>
     
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  item: {
    padding: 15,
    fontSize: 15,
    
    borderWidth:1,
    backgroundColor:"#f5f5f5",
    borderRadius:20
  }
});