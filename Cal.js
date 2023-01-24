import { Alert, Modal, StyleSheet, Text, Pressable, View,TextInput } from "react-native";
import React,{useState} from 'react'
import { Entypo } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker'
// delete log genration

const Cal = ({val,keyfun}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [mont,setmonth]=useState(val)
  const [value1, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'January', value: 'January'},
    {label: 'Febuary', value: 'Febuary'},
    {label: 'March', value: 'March'},
    {label: 'April', value: 'April'},
    {label: 'May', value: 'May'},
    {label: 'June', value: 'June'},
    {label: 'July', value: 'July'},
    {label: 'August', value: 'August'},
    {label: 'September', value: 'September'},
    {label: 'October', value: 'October'},
    {label: 'November', value: 'November'},
    {label: 'December', value: 'December/'},
  ]);
  const [open1, setOpen1] = useState(false);
  const [value11, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: '2022', value: '2022'},
{label: '2023', value: '2023'}
  ]);

  const[adddata,setData]=useState("");
  const[bdata,setbData]=useState("");
   
    
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
        
        <Text style={{textAlign:"center"}}>
        Select Year & Month
      </Text>
      <View style={{flexDirection:"row",paddingHorizontal:10,width:"80%",alignItems:"center",justifyContent:"center",margin:5}}>
      <DropDownPicker style={{marginLeft:30}}
      open={open}
      value={value1}
      items={items}
      containerStyle={{width: 150}}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(rec) => setData(rec)}
    />
 
  <DropDownPicker style={{marginLeft:35}}
      open={open1}
      value={value11}
      items={items1}
      containerStyle={{width: 150}}
      setOpen={setOpen1}
      setValue={setValue1}
      setItems={setItems1}
      onChangeValue={(rec1) => setbData(rec1) 
      }
    />
    </View>
    <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {keyfun(adddata,bdata), setModalVisible(!modalVisible),setmonth(`${bdata}`)}}
            >
              <Text style={styles.textStyle}>Open</Text>
            </Pressable>
        
        </View>
      </Modal>
      <Pressable
        // style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={{ paddingVertical:1, paddingHorizontal:5,textAlign:"center",fontWeight:"bold",fontStyle:"italic",fontSize:18,color:"white"}}><Entypo name="calendar" size={18} color="white"/> 
        {mont}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
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





