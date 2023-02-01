import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState,useEffect } from "react";

import { SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity,StatusBar,ToastAndroid,Alert } from "react-native";
import Mod from "./Modal";
import Budjet from "./budjet";
import { MaterialIcons } from '@expo/vector-icons';
import Cal from "./Cal"
import Checkbox from 'expo-checkbox';
import Delete from "./Delete";
//delete log genration

Date.prototype.getMonthName = function() {
  var monthNames = [ "January", "February", "March", "April", "May", "June", 
                     "July", "August", "September", "October", "November", "December" ];
  return monthNames[this.getMonth()];
}

export default function App() {
  const [keys,keyset]=useState(`${new Date().getMonthName()}${new Date().getFullYear()}`)
  const [month,setmonth]=useState(new Date().getMonthName())
  const [Ddata,Setddata]=useState([])//isko set karo d data main
  const [DlData,Setdldata]=useState([])
  const [Total,SetTotal]=useState(0)
  const [budget,setBudget]=useState(0)
  const [premon,setpremon]=useState("")


  useEffect(() => {
    //this function must be run on initial Loading special Ddata update
     storagesave()
     totalSet()
     cal()
     updatepriBudget()
     console.log(keys, "ye")
     
  }, [Ddata])

  //
  useEffect(()=>totalSet(),//total update on Keyfun 
   [keyfun])

   useEffect(() => {
    center()
    lastdelete()
   },[]);
const keyfun= async(val1,val2)=>{

  if(val1==undefined){
    console.log("not recive key")
  }else{   keyset(`${val1}${val2}`)
  const preconvert1=JSON.parse(await AsyncStorage.getItem(`${val1}${val2}`))
  Setddata(preconvert1)
  totalSet()
  setpremon(val1)}
}

const  checkItemById = async (id,itm,prc,mnth,vel) => {

  const dataa={"item":itm,"price":prc,"id":id,"month":mnth,"value":!vel}

  const filteredData = Ddata.filter(item => item.id !== id);
 // Setddata({ Ddata: filteredData });
 Setddata(filteredData)
 if(Ddata.length > 1){

 storagesave()
}else{

 await AsyncStorage.setItem(keys,"[]")
 }

  Setddata([...filteredData,dataa])

  
  storagesave()
 

}

async function Deletedata(keyss,database){
  let convert =JSON.stringify(Ddata)
  Setdldata(Ddata)

    if(convert==="[]" ||convert===""){
        // await AsyncStorage.setItem('@storage_Key',"[]")
      //await AsyncStorage.removeItem('@storage_Key')
   
    }else{await AsyncStorage.setItem("@Deletelog",convert)

  }

}

async function lastdelete(){
  Setdldata(JSON.parse( await AsyncStorage.getItem("@Deletelog")))
  console.log(await AsyncStorage.getItem("@Deletelog"))
}

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
    try {
    let value = 0
    const lnt=Ddata.length===null ? 0:Ddata.length
    console.log(typeof(Ddata.length),Ddata.length, "ye set karna hai")
    for (let i = 0; i < lnt; i++) {
      value += Number(Ddata[i].price)
    }

  SetTotal(value)
  } catch (error) {
    ToastAndroid.show('Request Was Unsuccessfully!', ToastAndroid.SHORT);
  }
    
  }


  async function updatepriBudget(){
    try {
      const val = await AsyncStorage.getItem('@storagebudget')
    if(val){
      setBudget(JSON.parse(val))
    }
    } catch (error) {
   
    }
  
  }

  const cen =async (recive)=>{
    if(recive){ 
      }
      setBudget(recive)
      await AsyncStorage.setItem('@storagebudget',JSON.stringify(recive))
      
}

  const  deleteItemById = async (id) => {

    
   const filteredData = Ddata.filter(item => item.id !== id);
  // Setddata({ Ddata: filteredData });
  Setddata(filteredData)
  if(Ddata.length > 1){
    console.log("ye part chala storage wala",Ddata.length )
  storagesave()
}else{
 
  await AsyncStorage.setItem(keys,"[]")
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

   
    if(convert==="[]" ||convert===""){
   
      // await AsyncStorage.setItem('@storage_Key',"[]")
      //await AsyncStorage.removeItem('@storage_Key')
   
    }else{await AsyncStorage.setItem(keys,convert)
    
  }

  }


async function cal(){
try {
  setmonth(Ddata[0].month)
} catch (error) {
  console.log(error)
}


}

  const center =async (recive)=>{ 
    console.log("ye recive yaa add",recive)
    if(recive){ 
      if(typeof(Ddata)==null || Ddata==undefined){
        Setddata([recive])// data null ho ja raha hai
    console.log(typeof(recive),"ye type aya")
      
    storagesave()
      }else{
        Setddata([...Ddata,recive])// data null ho ja raha hai
        console.log(typeof(recive),"ye type aya")
          
        storagesave()
      }
    
  
  }else{ 
    console.log("key ayi",keys)
    const preconvert=JSON.parse(await AsyncStorage.getItem(keys))

      Setddata(preconvert)
  }
   
  }
  

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar
        animated={true}
        backgroundColor="#61dafb"
      />
    <View style={{width:"80%",height:"10%",alignSelf:"center",flexDirection:"row",justifyContent:"center",marginLeft:"10%"}}>
    <Mod center={center}/><View style={{justifyContent:"center"}}><Delete val={DlData}/></View>
    </View>
    <FlatList 
        data={Ddata}
        renderItem={({ item }) => <View  style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"yellow",marginVertical:3, borderRadius:15}}>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}><Checkbox style={{justifyContent:"center",alignItems:"center",marginHorizontal:8}} value={item.value} onValueChange={(items)=>checkItemById(item.id,item.item,item.price,item.month,item.value)} /><View style={{padding:2}}><Text onPress={()=>createAlert(() => deleteItemById(item.id),"Delete Item","Sure want to remove item")} style={styles.item}>{item.item}</Text></View></View>
        <View style={{marginHorizontal:2}}><Text style={styles.item}>{item.price}</Text></View></View>}
        keyExtractor={(item) => item.id}/>
      <View style={{alignItems:"center",flexDirection:"row",justifyContent:"center",backgroundColor:"rgba(0, 0, 0, 0.23)",borderRadius:10,marginVertical:5}}>
      <View style={{marginHorizontal:5,alignItems:"flex-end"}}><Text style={{fontSize:23,color:"green"}}>Total</Text></View><View><Text style={{fontSize:25,color:"green"}}>{Total}</Text></View><View style={{backgroundColor:"black",padding:2,borderRadius:5,margin:2,justifyContent:"center",alignItems:"flex-end",alignSelf:"flex-end"}}><Text style={{fontSize:25,color:"yellow"}}>{premon}</Text></View></View>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>

      <TouchableOpacity  onPress={()=>createAlert(async()=>{Deletedata(),AsyncStorage.removeItem(), Setddata("")},"Remove All Item","Delete Permanently")}><View style={{flexDirection:"row",backgroundColor:"orange",borderRadius:5}}>
      <MaterialIcons name="delete-outline" size={35} color="white"/><Text style={{paddingRight:5, paddingVertical:5,textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:18,color:"white"}}>Clear All</Text></View></TouchableOpacity>

      <Cal val={month} keyfun={keyfun}/> 
      {/* <TouchableOpacity ><View style={{paddingHorizontal:5,backgroundColor:"grey",borderRadius:5}}><Text style={{ paddingHorizontal:5,paddingVertical:5,textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:18,color:"white"}}>{month}</Text></View></TouchableOpacity> */}

      {/* <TouchableOpacity ><View style={{paddingHorizontal:5,backgroundColor:"grey",borderRadius:5}}><Text style={{ paddingHorizontal:5,paddingVertical:5,textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:18,color:"white"}}>{month}</Text></View></TouchableOpacity> */}


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