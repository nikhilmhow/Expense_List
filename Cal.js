import { Alert, Modal, StyleSheet, Text, Pressable, View,TextInput } from "react-native";
import React,{useState} from 'react'
import { Entypo } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker'

const Cal = ({val}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
  const [value1, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
   
    
  return (
    <View style={{padding:4,borderRadius:8,borderRadius:5,backgroundColor:"grey",borderRadius:5}}>
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
        
        <Text style={styles.paragraph}>
        Select Record Month
      </Text>
      <DropDownPicker
      open={open}
      value={value1}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(rec) => console.log(rec)}
    />

        
        </View>
      </Modal>
      <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={{ paddingVertical:1, paddingHorizontal:5,textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:18,color:"white"}}><Entypo name="calendar" size={18} color="white"/> {val}</Text>
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

export default Cal;