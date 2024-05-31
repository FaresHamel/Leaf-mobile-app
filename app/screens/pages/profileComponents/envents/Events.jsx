import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  StyleSheet
} from 'react-native';
import add from '../../../../assets/add.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import timer from '../../../../assets/clock.png';
import calender from '../../../../assets/calender.png';
import {format} from 'date-fns';
import {Context} from '../../../../hooks/Context';

const Events = ({navigation}) => {
  
  const [eventsList, setEventsList] = useState([]);
  const [selectedTitle, setTitle] = useState('')
  const [selectedDate, setSelectedDate] = useState('');
  const [seletedTime,setSelectedTime] = useState('')
  const {userData} = useContext(Context);
 
  const fetchEventsList = async () => {
    fetch(`http://192.168.43.54:5000/getEvents?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          let arr = responseJson;
          setEventsList(arr);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const sendData = async newEvent => {
    try {
      const response = await fetch(
        `http://192.168.43.54:5000/addEvent?userId=${userData.iduser}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify JSON data format
          },
          body: JSON.stringify(newEvent), // Convert data to JSON string
        },
      );
      const data = await response.json(); // Parse server response if needed
     // console.log('Data sent successfully:', data); // Handle successful response
      fetchEventsList();
    } catch (error) {
      console.error('Error sending data:', error); // Handle errors gracefully
    }
  };

   const changeTextTitle = text => {
     setTitle(text);
  }
  const changeTextInpuDate = text => {
    setSelectedDate(text);
  }
   const changeTextTime = text => {
    setSelectedTime(text);
  }
  const handleAddNewEvent = () => {
     console.log('test',selectedDate,selectedTitle,seletedTime)
    if (selectedTitle && selectedDate && seletedTime) {
      const newEvent = {
        title: selectedTitle,
        date: selectedDate,
        time: seletedTime,
      };
      sendData(newEvent);
    }
  };
  useEffect(() => {
    fetchEventsList();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView
        style={{flex: 1, backgroundColor: 'white', padding: 20}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
          <View>
            <Text style={{fontSize:15,fontWeight:"700",color:"#000",marginBottom:10}} >Title</Text>
          </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '100%',
            marginTop: 10,
            height: 55,
            alignItems: 'center',
            borderRadius: 8,
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: 'space-between',
            borderColor: '#d9dad7',
            borderWidth: 1,
            borderStyle: 'solid',
          }}>
          <TextInput
            onChangeText={changeTextTitle}
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#364f6b',
              textTransform: 'capitalize',
            }}
            value={selectedTitle}
            placeholder="Enter your Event title"
          />
        </View>
          <View>
            <Text style={{fontSize:15,fontWeight:"700",color:"#000",marginTop:20}} >Enter the Date</Text>
          </View>
         <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '100%',
            marginTop: 10,
            height: 55,
            alignItems: 'center',
            borderRadius: 8,
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: 'space-between',
            borderColor: '#d9dad7',
            borderWidth: 1,
            borderStyle: 'solid',
          }}>
          <TextInput
            onChangeText={changeTextInpuDate}
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#364f6b',
              textTransform: 'capitalize',
            }}
            value={selectedDate}
            placeholder="Enter your The Date"
          />
        </View>
         <View>
            <Text style={{fontSize:15,fontWeight:"700",color:"#000",marginTop:20}} >Enter the Time </Text>
          </View>
         <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '100%',
            marginTop: 10,
            height: 55,
            alignItems: 'center',
            borderRadius: 8,
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: 'space-between',
            borderColor: '#d9dad7',
            borderWidth: 1,
            borderStyle: 'solid',
          }}>
          <TextInput
            onChangeText={changeTextTime}
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#364f6b',
              textTransform: 'capitalize',
            }}
            value={seletedTime}
            placeholder="Enter your Time"
          />
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            marginTop: 20,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            onPress={() => {
              handleAddNewEvent();
            }}
            style={{
              backgroundColor: '#CC5DE8',
              width: 120,
              height: 40,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 30,
            }}>
            <Text style={{color: '#fff', fontSize: 14, fontWeight: '600'}}>
              ADD
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white', marginTop: 20}}>
          {eventsList.length>0 &&
            eventsList.map((item, index) => (
            <View
              key={index}
              style={{
                paddingVertical: 10,
                borderRadius: 7,
                borderColor: '#d9dad7',
                paddingHorizontal: 10,
                paddingVertical:10,
                borderWidth: 1,
                borderStyle: 'solid',
                justifyContent: 'space-between',
                marginTop: 10,
                }}>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:10}} >
                  <Text style={{fontWeight:"700",fontSize:15,color:"#000"}} >Title : {item.title}</Text>
                </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    // width: '20%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginRight: 40,
                    }}>
                  <Image
                    source={calender}
                    style={{width: 15, height: 15, marginRight: 10}}
                  />
                  <Text style={{color: '#000'}}>{item.date}</Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    // width: '25%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingRight: 3,
                  }}>
                  <Image
                    source={timer}
                    style={{
                      width: 15,
                      height: 15,
                      tintColor: '#000',
                      marginRight: 10,
                    }}
                  />
                  <Text style={{color: '#000', textTransform: 'lowercase'}}>
                    {item.time}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#CC5DE8" barStyle="light-content" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tab: (selectedFoodTypeItem, item) => ({
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: selectedFoodTypeItem === item ? '#DD5746' : '#B4B4B8',
  }),
});

export default Events;

