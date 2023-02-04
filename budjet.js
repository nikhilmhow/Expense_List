import { Alert, Modal, StyleSheet, Text, Pressable, View,TextInput } from "react-native";
import React,{useState} from 'react'
import { AntDesign } from '@expo/vector-icons';

const Budjet = ({cen,val,col}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [budget,setBudget] = useState(0);
    
  return (
    <View style={{padding:4,borderRadius:8,backgroundColor:col,borderRadius:5}}>
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
            <Text style={styles.modalText}>Add Your BudGet</Text>
            <View style={{padding:5}}><TextInput value={budget} keyboardType="number-pad" onChangeText={(val)=>setBudget(val)} placeholder="Enter Your Budget"/></View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={()=>{cen(budget),setModalVisible(!modalVisible)}}
            >
              <Text style={styles.textStyle}>Add</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={{ paddingVertical:1,backgroundColor:"rgba(217, 189, 187, 0.53)", paddingHorizontal:5,textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:18,color:"white"}}>
        <AntDesign name="wallet" size={18} color="white" /> {val}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
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
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize:20,
      color:"blue"
    },
    modalText: {
  
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default Budjet