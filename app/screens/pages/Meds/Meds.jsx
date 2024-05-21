import React, {useState, useContext,useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Modal,
  TextInput
} from 'react-native';
import addImage from '../../../assets/add02.png';
import back from '../../../assets/back.png';
import { Context } from '../../../hooks/Context';
import calender from "../../../assets/calender.png";
import { format } from 'date-fns'; 

const Meds = () => {
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [newMeds, setNewMeds] = useState('');
  const {medsList,setMedsList,userData} = useContext(Context); 
  const formattedDate = format(currentDate, 'EEEE,dd MMM'); // Format the date  
  const timee = format(currentDate, 'p')
 
  // change input Text
  const handleTextChange = (text) => {
    setNewMeds(text);
  };

  const fetchMedicaments = async () => {
    fetch(`http://192.168.43.54:5000/getMeds?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length > 0) {
          let arr = responseJson;
          setMedsList(arr)
        } else {
          setClickStart(false)
        }
      })
      .catch(error => {
        console.log(error)
      });
    };
  //send data to the server
  const sendData = async (newMedicaments) => {
  try {
    const response = await fetch(`http://192.168.43.54:5000/addMeds?userId=${userData.iduser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Specify JSON data format
      },
      body: JSON.stringify(newMedicaments),  // Convert data to JSON string
    });
     const data = await response.json();  // Parse server response if needed
     console.log('Data sent successfully:', data); // Handle successful response
     fetchMedicaments(); 
  } catch (error) {
    console.error('Error sending data:', error);  // Handle errors gracefully
  }
  };  
  //prepeare th data to send to the server add time and date
  const handleNewMeds = () => {
    if (newMeds) {
      const newMedicaments = {
        title: newMeds,
        date: formattedDate,
        time:timee
      }
      sendData(newMedicaments);
      setModalVisible(false);
    }
    setNewMeds('');
  }
  
  useEffect(() => {
    fetchMedicaments()
  }, [])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View>
        {medsList.length > 0 ? 
          medsList.map((item, index)  => (
            <View key={index}
              style={{
                backgroundColor:"transparent",
                width: "100%",
                height: 65,
                padding: 10,
                justifyContent: "space-between",
                borderTopWidth: 1,
                borderTopColor: '#d9dad7'
               }} >
              <Text style={{color:"#000",marginBottom:7,fontWeight:"600",fontSize:16}}>{item.title}</Text>
              <View style={{flexDirection:"row" ,alignItems:"center"}} >
                <Image source={calender} style={{width:15,height:15,marginRight:10,tintColor:"#000"}} />
                <Text style={{color:"#000",marginRight:5}} >{item.date}</Text>
                <Text style={{color:"#000"}} >{item.time}</Text>
              </View>
            </View>
            ))
        :<></>}
        <Pressable
          onPress={() => setModalVisible(true)}
          style={{
            flexDirection: 'row',
            width: '100%',
            borderWidth: 1,
            borderColor: '#d9dad7',
            paddingHorizontal: 10,
            paddingVertical: 15,
            marginTop: 20,
          }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
              borderRadius: 5,
              marginRight: 20,
            }}>
            <Image source={addImage} style={{width: 13, height: 13}} />
          </View>
          <View>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
              New Medication
            </Text>
          </View>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            zIndex: 100,
            backgroundColor: 'transparent',
            paddingTop: 100,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 300,
              width: '95%',
              height: 200,
            }}>
            <View
              style={{
                backgroundColor: '#18A6C5',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingHorizontal: 10,
                borderBottomColor: '#daeaf6',
                borderBottomWidth: 1,
                height: 50,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              <Pressable
                style={{backgroundColor: 'transparent', alignSelf: 'center'}}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={back}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: 'transparent',
                    alignSelf: 'center',
                    marginRight: 10,
                    tintColor: 'white',
                  }}
                />
              </Pressable>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 17,
                  color: '#fff',
                  fontWeight: '600',
                }}>
                New Meds
              </Text>
            </View>
            <View style={{width:"100%",alignItems:"flex-start",justifyContent:"space-around",height:"70%",paddingLeft:20}} >
              <Text style={{color:"#000"}} >Name</Text>
              <View style={{borderRadius:5,width:"95%",borderWidth:1,borderColor:"#18A6C5",paddingLeft:10,height:40}}>
                <TextInput onChangeText={handleTextChange}  placeholder='enter your text here' style={{color:"#000",fontWeight:"500",fontSize:14}} />
              </View>
              <Pressable onPress={() => {
                handleNewMeds()
                 }}
                 style={{ backgroundColor: "#18A6C5", alignItems: "center", justifyContent: "center", width: 100, height: 40, borderRadius: 5 }} >
                <Text style={{fontSize:16,fontWeight:"600",color:"#fff"}} >Add</Text>
              </Pressable>
           </View>
          </View>
        </View>
      </Modal>
      </ScrollView>
      <StatusBar backgroundColor="#18A6C5" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Meds;
