import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,TextInput } from "react-native";
import {Card} from 'react-native-shadow-cards';


const Mod = ({center,saveFile}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [item,setItem]=useState("")
    const [price,setPrice]=useState("")

    
    
   const saveItem =async()=>{
    Date.prototype.getMonthName = function() {
      var monthNames = [ "January", "February", "March", "April", "May", "June", 
                         "July", "August", "September", "October", "November", "December" ];
      return monthNames[this.getMonth()];
  }
         
    const genrater=()=> {return "id" + Math.random().toString(16).slice(2)}
    // console.log(genrater())
    let data={"item":item,"price":price,"id":String(genrater()),"month":new Date().getMonthName(),"value":false}
    try {
     if(data.item===""||data.price===""){
      Alert.alert("please provide both Values")
     }else{
      center(data)
     }
      } catch (e) {
        console.log(e)
      }
      setItem("")
      setPrice("")
   }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add Item</Text>
            <View style={{padding:5}}><TextInput value={item} onChangeText={(val)=>setItem(val)} placeholder="Enter Name Of Item"/></View>
            <View style={{padding:5}}><TextInput value={price} keyboardType="number-pad" onChangeText={(val)=>setPrice(val)} placeholder="Enter Amount"/></View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}

            >
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            <Pressable
              style={[{margin:2},styles.button, styles.buttonClose]}
              onPress={()=>saveItem()}
            >
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)} 
      >
        <Text style={styles.textStyle}>Add Expenss</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 1
  },
  buttonOpen: {
    backgroundColor: "rgba(61, 123, 199, 0.58)",
    borderColor:"#fff",
    borderWidth:2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    // color: "white",
    // fontWeight: "bold",
    // textAlign: "center",
    // fontSize:20,
    // color:"blue"
    textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:19,color:"white"
  },
  modalText: {

    marginBottom: 15,
    textAlign: "center"
  }
});

export default Mod;
