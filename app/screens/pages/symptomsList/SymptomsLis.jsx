import React,{useState,useEffect,useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import calender from '../../../assets/calender.png';
import timer from '../../../assets/clock.png';
import { format } from 'date-fns'; 
import { Context } from '../../../hooks/Context';

const SymptomsList = () => {
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [Lis,setLis]= useState([]);  
  const {userData} = useContext(Context); 
  const formattedDate = format(currentDate, 'dd MMM'); // Format the date  
  const time = format(currentDate, 'p')
    useEffect(() => {
    const fetchData = async () => {
    fetch(`http://192.168.43.54:5000/symptoms?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length > 0) {
          let arr = responseJson;
          setLis(arr);
        } else {
          setClickStart(false)
        }
      })
      .catch(error => {
        console.log(error)
      });
    };
        fetchData();
    }, []);
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
     <StatusBar
        animated={true}
        backgroundColor="#198E52"
        barStyle="dark-content"
      />
    </SafeAreaView>
  );
};

export default SymptomsList;
