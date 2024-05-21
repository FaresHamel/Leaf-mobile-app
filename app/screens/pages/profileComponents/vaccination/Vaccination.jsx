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
} from 'react-native';
import add from '../../../../assets/add.png';
import timer from '../../../../assets/clock.png';
import calender from '../../../../assets/calender.png';
import {format} from 'date-fns';
import {Context} from '../../../../hooks/Context';
const Vaccination = () => {
  const [vaccination, setVaccination] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = format(currentDate, 'EEEE,dd MMM'); // Format the date
  const timee = format(currentDate, 'pp');
  const [vaccinationList, setVaccinationList] = useState([]);
  const {userData} = useContext(Context);
  const fetchVaccinationList = async () => {
    fetch(`http://192.168.43.54:5000/getVaccination?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          let arr = responseJson;
          setVaccinationList(arr);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const sendData = async newVaccination => {
    try {
      const response = await fetch(
        `http://192.168.43.54:5000/addVaccination?userId=${userData.iduser}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify JSON data format
          },
          body: JSON.stringify(newVaccination), // Convert data to JSON string
        },
      );
      const data = await response.json(); // Parse server response if needed
     // console.log('Data sent successfully:', data); // Handle successful response
      fetchVaccinationList();
    } catch (error) {
      console.error('Error sending data:', error); // Handle errors gracefully
    }
  };
  const changeTextInputVaccination = text => {
    setCondition(text);
  };
  const handleAddNewCondition = () => {
    if (vaccination) {
      const newVaccination = {
        title: vaccination,
        date: formattedDate,
        time: timee,
      };
      setVaccination('');
      sendData(newVaccination);
    }
  };

  useEffect(() => {
    fetchVaccinationList();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{flex: 1, backgroundColor: 'white', padding: 20}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
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
            onChangeText={changeTextInputVaccination}
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#364f6b',
              textTransform: 'capitalize',
            }}
            value={vaccination}
            placeholder="Enter your vaccination title here covid19..."
          />
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            marginTop: 20,
            backgroundColor: 'white',
          }}>
          <View style={{marginBottom: 10}}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
              Date / Time
            </Text>
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
                paddingRight: 10,
              }}>
              <Image
                source={timer}
                style={{width: 15, height: 15, tintColor: '#000'}}
              />
              <Text style={{color: '#000', textTransform: 'lowercase'}}>
                {timee}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleAddNewCondition();
            }}
            style={{
              backgroundColor: '#F7C566',
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
          {vaccinationList.length>0 &&
            vaccinationList.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                borderRadius: 7,
                borderColor: '#d9dad7',
                paddingHorizontal: 5,
                borderWidth: 1,
                borderStyle: 'solid',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text>{item.title}</Text>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    // width: '20%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginRight: 5,
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
      <StatusBar backgroundColor="#F7C566" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Vaccination;

