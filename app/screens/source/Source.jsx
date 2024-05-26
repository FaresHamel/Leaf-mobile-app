import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DatePickerInput} from 'react-native-paper-dates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Context} from '../../hooks/Context';
const Source = ({navigation}) => {
  const {userData, setUserData, setIsLogin} = useContext(Context);
  const [firstName, setFirstName] = useState(userData.name);
  const [lastName, setLastName] = useState('');
  const [dateOdBirth, setDateOfBirth] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('Unknown');
  const [selectedGender, setSelectedGender] = useState('Unknown');
  const [selectedDate, seSelectedDate] = useState('');
  const bloodTypeList = [
    {id: 0, type: 'Unknown'},
    {id: 1, type: 'A+'},
    {id: 2, type: 'A-'},
    {id: 3, type: 'B+'},
    {id: 4, type: 'B-'},
    {id: 5, type: 'O+'},
    {id: 6, type: 'O+'},
    {id: 7, type: 'AB+'},
    {id: 8, type: 'AB-'},
  ];
  const genderList = [
    {id: 0, type: 'Unknown'},
    {id: 1, type: 'Male'},
    {id: 2, type: 'Female'},
  ];

  const handleTextChangeDate = text => {
    setDateOfBirth(text);
  };
  const handleChangeTextFirstName = text => {
    setFirstName(text);
  };
  const handleChangeTextLastName = text => {
    setLastName(text);
  };

  //send data to the server
  const updateProfile = async newInformation => {
    try {
      const response = await fetch(
        `http://192.168.43.54:5000/profileUpdate?userId=${userData.iduser}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify JSON data format
          },
          body: JSON.stringify(newInformation), // Convert data to JSON string
        },
      );
      const data = await response.json(); // Parse server response if needed
      if (data) {
        fetchUserInformation();
      }
    } catch (error) {
      console.error('Error sending data:', error); // Handle errors gracefully
    }
  };
  //prepeare th data to send to the server add time and date
  const handleSubmitNewInformation = () => {
    const newUserInformation = {
      lastname: lastName,
      dateOfBirth: dateOdBirth,
      bloodType: selectedBloodType,
      gender: selectedGender,
    };
    updateProfile(newUserInformation);
  };

  const fetchUserInformation = async () => {
    fetch(`http://192.168.43.54:5000/getUserInfo?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        const dateArray = responseJson.birthDate.split('T');
        seSelectedDate(dateArray[0])
        setLastName(responseJson.lastname)
        setSelectedBloodType(responseJson.bloodType)
        setSelectedGender(responseJson.gender)
        console.log(responseJson)
        const re = storeData(responseJson);

        // if (re) {
        //   navigation.navigate('Home');
        // }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const storeData = async useInfo => {
    try {
      const jsonValue = JSON.stringify(useInfo);
      await AsyncStorage.setItem('userInfo', jsonValue);
      const dannn = await AsyncStorage.getItem('userInfo');
      const userInf = await JSON.parse(dannn);
      setUserData(userInf);
      return true;
    } catch (e) {
      return false;
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      setUserData({});
      return true;
    } catch (e) {}
  };

  const logOut = () => {
    const logout = removeValue();
    if (logout) {
      setIsLogin(false);
    }
  };

  //date functions
  useEffect(() => {
    fetchUserInformation()
  }, [])
  

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{flex: 1, backgroundColor: 'white', padding: 20}}
        contentContainerStyle={{backgroundColor: 'white', height: '100%'}}>
        <View>
          <View style={{marginBottom: 20}}>
            <Text style={{color: '#000', fontWeight: '700', marginBottom: 10}}>
              First Name
            </Text>
            <View
              style={{
                paddingLeft: 10,
                width: '80%',
                backgroundColor: 'white',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#C1C0C8',
              }}>
              <TextInput
                onChangeText={handleChangeTextFirstName}
                placeholder="Fisrt name"
                value={firstName}
              />
            </View>
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={{color: '#000', fontWeight: '700', marginBottom: 10}}>
              Last Name
            </Text>
            <View
              style={{
                paddingLeft: 10,
                width: '80%',
                backgroundColor: 'white',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#C1C0C8',
              }}>
              <TextInput
                onChangeText={handleChangeTextLastName}
                placeholder="Last name"
                value={lastName}
              />
            </View>
          </View>
          <View style={{width: '95%', marginBottom: 20}}>
            <View style={{flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}} >
            <Text style={{color: '#000', fontWeight: '700',marginRight:20}}>
              Date of Birth :
              </Text>
               {selectedDate ? <View style={{alignItems:"center"}} ><Text style={{color: '#000', fontWeight: '400',}} >{selectedDate}</Text></View>:<Text style={{color: '#000', fontWeight: '400',}} >No birth date</Text>}
            </View>
            <Text style={{color: '#000', fontWeight: '700',marginTop:20}}>
             Change the  Date of Birth 
            </Text>
            <View style={{width: '100%', height: 60, borderRadius: 10}}>
              <DatePickerInput
                locale="en"
                label="Date"
                value={dateOdBirth}
                onChange={d => handleTextChangeDate(d)}
                inputMode="start"
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  borderTopEndRadius: 10,
                  borderTopLeftRadius: 10,
                }}
              />
            </View>
          </View>

          <View>
            <Text style={{color: '#000', fontWeight: '700'}}>Gender</Text>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                flexWrap: 'wrap',
                // marginTop: 10,
              }}>
              {genderList.map(item => (
                <TouchableOpacity
                  style={styles.tab(selectedGender, item.type)}
                  onPress={() => setSelectedGender(item.type)}>
                  <Text style={styles.tabText(selectedGender, item.type)}>
                    {item.type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{color: '#000', fontWeight: '700'}}>
              Blood Type (ABO & Rh)
            </Text>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                flexWrap: 'wrap',
                // marginTop: 10,
              }}>
              {bloodTypeList.map(item => (
                <TouchableOpacity
                  style={styles.tab(selectedBloodType, item.type)}
                  onPress={() => setSelectedBloodType(item.type)}>
                  <Text style={styles.tabText(selectedBloodType, item.type)}>
                    {item.type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => handleSubmitNewInformation()}
              style={{
                backgroundColor: '#198E52',
                width: 100,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                position: 'absolute',
                bottom: -80,
                right: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '700', fontSize: 15}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                logOut();
              }}
              style={{
                backgroundColor: '#fff',
                width: 100,
                paddingHorizontal: 20,
                paddingVertical: 10,
                // borderRadius: 10,
                position: 'absolute',
                bottom: -80,
                left: 10,
                alignItems: 'center',
                borderBottomColor: '#C1C0C8',
                borderBottomWidth: 1,
              }}>
              <Text style={{color: '#000', fontWeight: '600', fontSize: 15}}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tab: (selectedFoodTypeItem, item) => ({
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: selectedFoodTypeItem === item ? '#198E52' : '#C1C0C8',
    color: selectedFoodTypeItem === item ? '#fff' : '#000',
  }),
  tabText: (selectedFoodTypeItem, item) => ({
    color: selectedFoodTypeItem === item ? '#fff' : '#fff',
  }),
});
export default Source;
