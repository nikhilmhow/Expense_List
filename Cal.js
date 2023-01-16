import { Alert, Modal, StyleSheet, Text, Pressable, View,TextInput,TouchableOpacity } from "react-native";
import React,{useState,useCallback} from 'react'
import { AntDesign } from '@expo/vector-icons';


const Cal = ({val}) => {
    const [modalVisible, setModalVisible] = useState(false);
   

    
    
  return (
    <View style={{padding:4,borderRadius:8,backgroundColor:"grey",borderRadius:5}}>
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
        <Text>Gu</Text>
        </View>
      </Modal>
      <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={{ paddingVertical:1, paddingHorizontal:5,textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:18,color:"white"}}><AntDesign name="wallet" size={18} color="white" /> {val}</Text>
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

export default Cal