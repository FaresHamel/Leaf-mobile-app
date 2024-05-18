import React, {useState, useContext,useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import activity from "../../../assets/activities.png";
import timer from '../../../assets/clock.png';
import calender from "../../../assets/calender.png";
import pen from "../../../assets/pen.png";
import back from '../../../assets//back.png';
import { Context } from '../../../hooks/Context';
import { format } from 'date-fns'; 

const Activity = ({navigation}) => {
 
  const [modalActivityTypeVisible, setModalActivityTypelVisible] = useState(false);
  const [modalDurationVisible, setModalDurationVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activityType,setActivityType] = useState('Walking')
  const [duration,setDuration] = useState("30")
  const formattedDate = format(currentDate, 'EEEE,dd MMM'); // Format the date  
  const timee = format(currentDate, 'pp')
  const {dataDisplayMatrix,updateDataItem,userData} = useContext(Context);
  const handleTextActivityType = (textActivity) => {setActivityType(textActivity);}
  const handleTextActivityDuration = (taxtDuration) => {setDuration(taxtDuration)}
  const handleButtonAddedNewActivity = () => {setModalActivityTypelVisible(false);}
  const handleButtonAddedNewDuration = () => {setModalDurationVisible(false);}

  const fetchActivity = async () => {
     fetch(`http://192.168.43.54:5000/getActivity?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          // console.log(responseJson);
          changeVlueActivity(responseJson);
        }
      })
      .catch(error => {
        console.log(error)
      });
    };
  const sendData = async (newAc) => {
      try {
        const response = await fetch(`http://192.168.43.54:5000/addAcitivity?userId=${userData.iduser}`, {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',  // Specify JSON data format
          },
          body: JSON.stringify(newAc),  // Convert data to JSON string
        });
        const data = await response.json();  // Parse server response if needed
      //console.log('Data sent successfully:', data); // Handle successful response
        fetchActivity();
      } catch (error) {
        console.error('Error sending data:', error);  // Handle errors gracefully
      }
    };  
  

  const changeVlueActivity = (responseJson) => {
    const itemIndex = dataDisplayMatrix.find((childItem) => childItem.title === "Activity");
    if (itemIndex) {
     // Modification logic
     itemIndex.value = responseJson.title;
     itemIndex.isChecked = true;
    // setDataDisplayMatrix(itemIndex, dataDisplayMatrix[itemIndex].isChecked=true);
     itemIndex.date = responseJson.date;
     itemIndex.time = responseJson.time;
     // Update the context
    updateDataItem(itemIndex, itemIndex.index); // Pass the modified object and its index
  }
    navigation.navigate("Home")
  }
  
  const handleAddActivity = () => {
    const newAct = {
      title: activityType,
      date : formattedDate,
      time: timee,
      duration:duration,
    }
   //console.log(newAct);
    sendData(newAct);
  }

  return (
    <SafeAreaView  style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{ flex: 1, backgroundColor: 'white',padding:20}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={{backgroundColor:"white"}} onPress={()=>setModalActivityTypelVisible(true)}  >
          <Text style={{fontSize:16,fontWeight:"600"}} >Type :</Text>
          <View style={{flexDirection:"row",backgroundColor:"#f3e9d2",width:"100%",marginTop:10,height:55,alignItems:"center",borderRadius:8,paddingLeft:10,paddingRight:10,justifyContent:"space-between"}} >
            <View style={{flexDirection:"row",alignItems:"center"}} >
               <Image source={activity}
              style={{ width: 30, height: 30, tintColor: '#be6a15' }} />
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#000",textTransform:"capitalize"}}>{activityType}</Text>
            </View>
            <View style={{flexDirection:"row",alignItems:"center"}} >
               <Image source={pen}
              style={{ width: 13, height: 13, tintColor: '#be6a15',marginRight:5}} />
            <Text style={{fontSize:13,fontWeight:"500",color:"#000"}} >edit</Text>
            </View>
          </View>
        </TouchableOpacity>
         <TouchableOpacity style={{marginTop:20}} onPress={()=>setModalDurationVisible(true)} >
          <Text style={{fontSize:16,fontWeight:"600"}} >Duration:</Text>
          <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"#f3e9d2",width:"50%",marginTop:10,height:40,alignItems:"center",borderRadius:5,paddingLeft:10,paddingRight:10}} >
            <View style={{flexDirection:"row",alignItems:"center"}} >
               <Image source={timer}
              style={{ width: 15, height: 15, tintColor: '#be6a15',marginRight:10 }} />
              <Text style={{ fontSize: 16, fontWeight: "500", color: "#000" }}>{duration}</Text>
           </View>
            <View style={{flexDirection:"row",alignItems:"center"}} >
               <Image source={pen}
              style={{ width: 13, height: 13, tintColor: '#be6a15',marginRight:5}} />
            <Text style={{fontSize:13,fontWeight:"500",color:"#000"}} >edit</Text>
            </View>
          </View> 
         </TouchableOpacity>
        <View style={{ justifyContent: 'space-around', marginTop: 20 }}>
        <View style={{marginBottom: 10}}>
          <Text style={{color: '#000',fontSize:16,fontWeight:"bold"}}>Date / Time</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            backgroundColor: '#fff',
            justifyContent: 'flex-start',
            height: 40,
          }}>
          <View
            style={{
              backgroundColor: '#f5f5f5',
              width: '40%',
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginRight: 20,
            }}>
            <Image source={calender} style={{width: 15, height: 15}} />
            <Text style={{color: '#000'}}>{formattedDate}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#f5f5f5',
              width: '45%',
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingRight:10
            }}>
            <Image
              source={timer}
              style={{width: 15, height: 15, tintColor: '#000'}}
            />
             <Text style={{ color: '#000',textTransform:"lowercase"}}>{timee}</Text>
          </View>
        </View>
          <TouchableOpacity
            onPress={() => {handleAddActivity();}}
            style={{ backgroundColor: "#be6a15", width: 120, height: 40, borderRadius: 5, alignItems: "center", justifyContent: "center", alignSelf: "center", marginTop: 30 }}>
          <Text style={{color: '#fff',fontSize:14,fontWeight:"600"}}>ADD</Text>
        </TouchableOpacity>
        </View>
        
        {/* /Models here */}
        {/* Modal of adding new activity type */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalActivityTypeVisible}
        onRequestClose={() => {
          setModalActivityTypelVisible(!modalActivityTypeVisible);
          }}
        >
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
                backgroundColor: '#be6a15',
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
              <TouchableOpacity
                style={{backgroundColor: 'transparent', alignSelf: 'center'}}
                onPress={() => setModalActivityTypelVisible(!modalActivityTypeVisible)}>
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
              </TouchableOpacity>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 17,
                  color: '#fff',
                  fontWeight: '600',
                }}>
                New Activity
              </Text>
            </View>
            <View style={{width:"100%",alignItems:"flex-start",justifyContent:"space-around",height:"70%",paddingLeft:20}} >
              <Text style={{color:"#000"}} >Name</Text>
              <View style={{borderRadius:5,width:"95%",borderWidth:1,borderColor:"#be6a15",paddingLeft:10,height:40}}>
                <TextInput onChangeText={handleTextActivityType}  placeholder='enter your activity type like walking , runn , swimming here' style={{color:"#000",fontWeight:"500",fontSize:14}} />
              </View>
             <TouchableOpacity
                onPress={() => {
                handleButtonAddedNewActivity()
                 }}
                 style={{ backgroundColor: "#be6a15", alignItems: "center", justifyContent: "center", width: 100, height: 40, borderRadius: 5 }} >
                <Text style={{fontSize:16,fontWeight:"600",color:"#fff"}} >Add</Text>
              </TouchableOpacity>
           </View>
          </View>
        </View>
        </Modal>
        {/* Modal of adding new duration */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDurationVisible}
        onRequestClose={() => {
          setModalDurationVisible(!modalDurationVisible);
          }}
        >
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
                backgroundColor: '#be6a15',
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
              <TouchableOpacity
                style={{backgroundColor: 'transparent', alignSelf: 'center'}}
                onPress={() => setModalDurationVisible(!modalDurationVisible)}>
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
              </TouchableOpacity>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 17,
                  color: '#fff',
                  fontWeight: '600',
                }}>
                New Activity
              </Text>
            </View>
            <View style={{width:"100%",alignItems:"flex-start",justifyContent:"space-around",height:"70%",paddingLeft:20}} >
              <Text style={{color:"#000"}} >Name</Text>
              <View style={{borderRadius:5,width:"95%",borderWidth:1,borderColor:"#be6a15",paddingLeft:10,height:40}}>
                <TextInput onChangeText={handleTextActivityDuration}  placeholder='enter your activity duration 30 min ,2 hours ...' style={{color:"#000",fontWeight:"500",fontSize:14}} />
              </View>
             <TouchableOpacity
                onPress={() => {
                handleButtonAddedNewDuration()
                 }}
                 style={{ backgroundColor: "#be6a15", alignItems: "center", justifyContent: "center", width: 100, height: 40, borderRadius: 5 }} >
                <Text style={{fontSize:16,fontWeight:"600",color:"#fff"}} >Add</Text>
              </TouchableOpacity>
           </View>
          </View>
        </View>
      </Modal>
      </ScrollView>
      <StatusBar backgroundColor="#be6a15" barStyle="light-content" />
   </SafeAreaView>
  )
}

export default Activity
