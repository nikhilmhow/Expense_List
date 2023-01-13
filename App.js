import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState,useEffect } from "react";

import { SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity,StatusBar,ToastAndroid } from "react-native";
import Mod from "./Modal";
import Budjet from "./budjet";
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {

  const [Ddata,Setddata]=useState([])
  const [Total,SetTotal]=useState(0)
  const [budget,setBudget]=useState(0)
  const [month,setmonth]=useState("Waiting")
  const [Color,setColor]=useState("green")
  

  useEffect(() => {
    storagesave()
    totalSet()
    updatepriBudget()
    cal()
    colorchange()
    ToastAndroid.showWithGravity("useeffect run", ToastAndroid.SHORT,ToastAndroid.CENTER)

  }, [Ddata])

  const totalSet=()=>{
    let value = 0
    for (let i = 0; i < Ddata.length; i++) {
      value += Number(Ddata[i].price)
    }
  SetTotal(value)
  }
  const colorchange=()=>{
    console.log("color",Total,budget)
    if(Total>=budget){
      console.log("ye nahi chalna chaiye")
      setColor("red")
    }
  }

  async function updatepriBudget(){
    const val = await AsyncStorage.getItem('@storagebudget')
    if(val){
      setBudget(JSON.parse(val))
    }
  }

  const cen =async (recive)=>{
    if(recive){ 
      }
      console.log(recive)
      await AsyncStorage.setItem('@storagebudget',JSON.stringify(recive))
      console.warn("Success Storage")
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
    console.log("storage done")
    ToastAndroid.showWithGravity("Item Added", ToastAndroid.SHORT,ToastAndroid.CENTER)}
  }
async function cal(){
  setmonth(Ddata[0].month)
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
    <View style={{width:"80%",height:"10%",alignSelf:"center",flexDirection:"row"}}>
    <Mod center={center}/>
    
    </View>
    <FlatList 
        data={Ddata}
        renderItem={({ item }) => <View  style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"yellow",marginVertical:3, borderRadius:15}}>
        <View style={{padding:2}}><Text onPress={() => deleteItemById(item.id)} style={styles.item}>{item.item}</Text></View>
        <View style={{marginHorizontal:2}}><Text style={styles.item}>{item.price}</Text></View></View>}
        keyExtractor={(item) => item.id}/>
      <View style={{alignItems:"center",flexDirection:"row",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.23)",borderRadius:10,marginVertical:5}}>
      <View style={{marginHorizontal:5,}}><Text style={{fontSize:25}}>Total</Text></View><View><Text style={{fontSize:28,color:"green"}}>{Total}</Text></View></View>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
      <TouchableOpacity  onPress={async()=>{AsyncStorage.removeItem('@storage_Key'), Setddata("")}}><View style={{flexDirection:"row",backgroundColor:"orange",borderRadius:5}}><MaterialIcons name="delete-outline" size={35} color="white"/><Text style={{paddingRight:5, paddingVertical:5,textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:18,color:"white"}}>Clear All</Text></View></TouchableOpacity>
      <TouchableOpacity ><View style={{paddingHorizontal:5,backgroundColor:"grey",borderRadius:5}}><Text style={{ paddingHorizontal:5,paddingVertical:5,textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:18,color:"white"}}>{month}</Text></View></TouchableOpacity>
      <Budjet cen={cen} col={Total>budget?"red":"green"} val={budget}/>
      {/* <TouchableOpacity onPress={async()=>{AsyncStorage.removeItem('@storage_Key'), Setddata("")}}><View style={{padding:4,backgroundColor:Total>budget?"red":"green",borderRadius:8}}><Text>Budget {budget}</Text></View></TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,   
    flex: 1,marginTop:-5

  },
  item: {
    padding: 15,
    fontSize: 15,
    borderWidth:1,
    backgroundColor:"#f5f5f5",
    borderRadius:20
  }
});