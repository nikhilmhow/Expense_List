import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState,useEffect } from "react";

import { SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity,StatusBar,ToastAndroid,Alert } from "react-native";
import Mod from "./Modal";
import Budjet from "./budjet";
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {

  const [Ddata,Setddata]=useState([])//isko set karo d data main
  const [Total,SetTotal]=useState(0)
  const [budget,setBudget]=useState(0)
  const [month,setmonth]=useState("Waiting")
  // const [Color,setColor]=useState("green")
  
  useEffect(() => {

    storagesave()
    totalSet()
    cal()
    updatepriBudget()   
 
    // ToastAndroid.showWithGravity("useeffect run", ToastAndroid.SHORT,ToastAndroid.CENTER)

  }, [Ddata])

  
  const createAlert = (func,ale,msg) =>
  Alert.alert(ale, msg, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => func()},
  ]);

  const totalSet=()=>{
    let value = 0
    for (let i = 0; i < Ddata.length; i++) {
      value += Number(Ddata[i].price)
    }
  SetTotal(value)
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
      setBudget(recive)
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
    // 
  }
  }
async function cal(){
try {
  if(Ddata.length >= 1){
    console.log("undefined haidfdfdfdfdfdfdfdfdfdfdf")
  setmonth(Ddata[0].month)}else{
    Date.prototype.getMonthName = function() {
      var monthNames = [ "January", "February", "March", "April", "May", "June", 
                         "July", "August", "September", "October", "November", "December" ];
      return monthNames[this.getMonth()];
  }
    setmonth(new Date().getMonthName())
  }
 
} catch (error) {
  console.log(error)
}
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
        <View style={{padding:2}}><Text onPress={()=>createAlert(() => deleteItemById(item.id),"Delete Item","Sure want to remove item")} style={styles.item}>{item.item}</Text></View>
        <View style={{marginHorizontal:2}}><Text style={styles.item}>{item.price}</Text></View></View>}
        keyExtractor={(item) => item.id}/>
      <View style={{alignItems:"center",flexDirection:"row",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.23)",borderRadius:10,marginVertical:5}}>
      <View style={{marginHorizontal:5,}}><Text style={{fontSize:25}}>Total</Text></View><View><Text style={{fontSize:28,color:"green"}}>{Total}</Text></View></View>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
      <TouchableOpacity  onPress={()=>createAlert(async()=>{AsyncStorage.removeItem('@storage_Key'), Setddata("")},"Remove All Item","Delete Permanently")}><View style={{flexDirection:"row",backgroundColor:"orange",borderRadius:5}}>
      <MaterialIcons name="delete-outline" size={35} color="white"/><Text style={{paddingRight:5, paddingVertical:5,textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:18,color:"white"}}>Clear All</Text></View></TouchableOpacity>
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
    fontSize: 18,
    borderWidth:1,
    backgroundColor:"#f5f5f5",
    borderRadius:20,
    fontWeight:"bold",
    color:"blue"
  }
});