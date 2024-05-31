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

import { Context } from '../../../hooks/Context';
import calender from "../../../assets/calender.png";
import { format } from 'date-fns'; 

const MedsList = () => {
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
    const [newMeds, setNewMeds] = useState('');
    const [List, setList] = useState([]);
  const {userData} = useContext(Context); 
  const formattedDate = format(currentDate, 'EEEE,dd MMM'); // Format the date  
  const timee = format(currentDate, 'p')
 

 
  
    useEffect(() => {
       const fetchMedicaments = async () => {
    fetch(`http://192.168.43.54:5000/getMeds?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length > 0) {
          let arr = responseJson;
          setList(arr)
        } else {
          setClickStart(false)
        }
      })
      .catch(error => {
        console.log(error)
      });
    };
    fetchMedicaments()
  }, [])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white',padding:10}}>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View>
        {List.length > 0 ? 
          List.map((item, index)  => (
            <View style={{backgroundColor:"#FAFAFA",width:"100%",padding:20,marginTop:10,shadowColor: '#000',
                    marginBottom: 10,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 2}}>
              <Text style={{marginTop:10}}><Text style={{fontWeight:"600",color:"#2D2D2D"}} >Title : </Text>{item.title}</Text>
        
              <Text style={{marginTop:10}} ><Text style={{fontWeight:"600",color:"#2D2D2D"}} >Day : </Text>{item.date}</Text>
              <Text style={{marginTop:10}} ><Text style={{fontWeight:"600",color:"#2D2D2D"}} >At time : </Text>{item.time}</Text>
             </View>
        
            ))
        :<></>}
        
      </View>
      </ScrollView>
      <StatusBar backgroundColor="#18A6C5" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default MedsList;
