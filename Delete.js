import { Alert, Modal, StyleSheet, Text, Pressable, View,ScrollView ,FlatList} from "react-native";
import React,{useState,useEffect} from 'react'
import { FontAwesome5 } from '@expo/vector-icons';



const Delete = ({val}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [DlData,Setdldata]=useState("")

   
      useEffect(() => {
        //this function must be run on initial Loading special Ddata update
         console.log(typeof(val),"yanha recive hua")
         Setdldata(val)
       
      }, [modalVisible])

     

    
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
          <View style={styles.modalView}>
          
           <FlatList 
        data={DlData}
          renderItem={({ item }) => <View  style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"yellow",marginVertical:3, borderRadius:15}}>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <View style={{padding:2}}><Text onPress={()=>createAlert(() => deleteItemById(item.id),"Delete Item","Sure want to remove item")} style={styles.item}>{item.item}</Text></View></View>
        <View style={{marginHorizontal:2}}><Text style={styles.item}>{item.price}</Text></View></View>}
        keyExtractor={(item) => item.id}/> 
          


          
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
            
          </View>
        </View>
      </Modal>
      <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <FontAwesome5 name="grip-lines" size={20} color="blue" />
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
      backgroundColor: "grey",
    },
    buttonClose: {
      backgroundColor: "grey",
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

export default Delete