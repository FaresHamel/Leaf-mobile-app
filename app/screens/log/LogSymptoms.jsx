import React,{useState,useEffect,useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import calender from '../../assets/calender.png';
import timer from '../../assets/clock.png';
import { format } from 'date-fns'; 
import { Context } from '../../hooks/Context';

const LogSymptoms = ({navigation, route}) => {
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const Lis = route.params.list;  
  const {dataSamptoms,setDataSamptoms,userData} = useContext(Context); 
  const formattedDate = format(currentDate, 'dd MMM'); // Format the date  
  const time = format(currentDate, 'p')
  
  const handleChildListChange = (arr) => {
  const updatedParentList = dataSamptoms.map((parentItem) => {
    const matchingChild = arr.find((childItem) => childItem.refe === parentItem.refe);
    if (matchingChild) {
         matchingChild.isChecked = true;
         return { ...parentItem, ...matchingChild}; // Merge properties
      }
      return parentItem; // Keep the original parent item if no match
  });
    setDataSamptoms(updatedParentList);
  };

  const fetchData = async () => {
    fetch(`http://192.168.43.54:5000/symptoms?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length > 0) {
          let arr = responseJson;
          handleChildListChange(arr);
          navigation.navigate("Home")
        } else {
          setClickStart(false)
        }
      })
      .catch(error => {
        console.log(error)
      });
    };
 
  const sendData = async () => {
    for (const item of Lis) {
       item.date = formattedDate;
       item.time = time;
     }
  try {
    const response = await fetch(`http://192.168.43.54:5000/addSymptoms?userId=${userData.iduser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Specify JSON data format
      },
      body: JSON.stringify(Lis),  // Convert data to JSON string
    });
    await fetchData()
  } catch (error) {
    console.error('Error sending data:', error);  // Handle errors gracefully
  }
};
  
  
  // const handleChildListChange = () => {
  //   // const updatedParentList = dataSamptoms.map((parentItem) => {
  //   //   const matchingChild = Lis.find((childItem) => childItem.id === parentItem.id);
  //   //   if (matchingChild) {
  //   //       matchingChild.date = formattedDate;
  //   //       matchingChild.time = time;
  //   //       // Shallow comparison: Update properties if objects have the same ID
  //   //       return { ...parentItem, ...matchingChild }; // Merge properties
  //   //   }
  //   //   return parentItem; // Keep the original parent item if no match
  //   // });
  //   // setDataSamptoms(updatedParentList);
  // };
  const renderItem = ({item}) => (
    <View
      style={{
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        height: 150,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-around',
        marginBottom: 10,
      }}>
      <View
        style={{
          backgroundColor: '#C6EBC5',
          borderRadius: 20,
          padding: 10,
          width: '70%',
        }}>
        <Text
          style={{
            color: '#222831',
            backgroundColor: '#C6EBC5',
            textAlign: 'center',
          }}>
          {item.title}
        </Text>
      </View>
      <View style={{justifyContent: 'space-around'}}>
        <View style={{marginBottom: 10}}>
          <Text style={{color: '#000'}}>Date / Time</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            backgroundColor: '#f5f5f5',
            justifyContent: 'flex-start',
            height: 40,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '36%',
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginRight: 20,
            }}>
            <Image source={calender} style={{width: 15, height: 15}} />
            <Text style={{color: '#000'}}>{formattedDate} </Text>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              width: '23%',
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
             <Text style={{ color: '#000',textTransform:"lowercase"}}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
      <FlatList
        data={Lis}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
      />
      <Pressable
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          backgroundColor: '#198E52',
          borderRadius: 10,
          width: 120,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
        sendData  ()        
        }}
        >
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '400',
            fontFamily: 'JosefinSans-Regular',
          }}>
          Add
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default LogSymptoms;
