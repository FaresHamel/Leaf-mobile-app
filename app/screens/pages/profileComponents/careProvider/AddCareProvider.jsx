import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Modal,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {DatePickerInput} from 'react-native-paper-dates';
import {Context} from '../../../../hooks/Context';
import addImage from '../../../../assets/add02.png';
const AddCareProvider = ({navigation}) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const {userData} = useContext(Context);

  // change input Text
  const handleTextChangeName = text => {
    setName(text);
  };

  const handleTextChangeEmail = text => {
    setEmail(text);
  };
  const handleTextChangePhone = text => {
    setPhone(text);
  };
  const handleTextChangeLocation = text => {
    setLocation(text);
  };
  const handleTextChangeDate = text => {
    setDate(text);
  };
  const handleTextChangeSpecilty = text => {
    setSpecialty(text);
  };

  //send data to the server
  const sendData = async newCarePro => {
    try {
      const response = await fetch(
        `http://192.168.43.54:5000/addCareProvider?userId=${userData.iduser}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify JSON data format
          },
          body: JSON.stringify(newCarePro), // Convert data to JSON string
        },
      );
      const data = await response.json(); // Parse server response if needed
      if (data) {
        navigation.navigate('CareProvider');
      }
    } catch (error) {
      console.error('Error sending data:', error); // Handle errors gracefully
    }
  };
  //prepeare th data to send to the server add time and date
  const handleNewCareProvider = () => {
    if (name && location && email && specialty && phone && date) {
      const newCareProvider = {
        name: name,
        specialty: specialty,
        email: email,
        location: location,
        phone: phone,
        date: date,
      };
      sendData(newCareProvider);
    }
    setName('');
    setDate('');
    setEmail('');
    setLocation('');
    setPhone('');
    setSpecialty('');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center', backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
            width: '95%',
            height: 650,
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 17,
              color: '#000',
              fontWeight: '600',
            }}>
            New Care Provider
          </Text>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-start',
              backgroundColor: 'white',
              justifyContent: 'space-around',
              height: '95%',
              paddingLeft: 20,
              borderRadius: 10,
            }}>
            <View style={{width: '95%'}}>
              <Text
                style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
                Name
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  width: '95%',
                  borderWidth: 1,
                  borderColor: '#007F73',
                  paddingLeft: 10,
                  height: 40,
                }}>
                <TextInput
                  onChangeText={handleTextChangeName}
                  value={name}
                  placeholder="enter your text here"
                  style={{color: '#000', fontWeight: '500', fontSize: 14}}
                />
              </View>
            </View>
            <View style={{width: '95%'}}>
              <Text
                style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
                Specialty
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  width: '95%',
                  borderWidth: 1,
                  borderColor: '#007F73',
                  paddingLeft: 10,
                  height: 40,
                }}>
                <TextInput
                  value={specialty}
                  onChangeText={handleTextChangeSpecilty}
                  placeholder="enter your text here"
                  style={{color: '#000', fontWeight: '500', fontSize: 14}}
                />
              </View>
            </View>
            <View style={{width: '95%'}}>
              <Text
                style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
                Phone Number
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  width: '95%',
                  borderWidth: 1,
                  borderColor: '#007F73',
                  paddingLeft: 10,
                  height: 40,
                }}>
                <TextInput
                  value={phone}
                  onChangeText={handleTextChangePhone}
                  maxFontSizeMultiplier={10}
                  keyboardType="name-phone-pad"
                  placeholder="enter your text here"
                  style={{color: '#000', fontWeight: '500', fontSize: 14}}
                />
              </View>
            </View>
            <View style={{width: '95%'}}>
              <Text
                style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
                Email Address
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  width: '95%',
                  borderWidth: 1,
                  borderColor: '#007F73',
                  paddingLeft: 10,
                  height: 40,
                }}>
                <TextInput
                  value={email}
                  onChangeText={handleTextChangeEmail}
                  keyboardType="email-address"
                  placeholder="enter your text here"
                  style={{color: '#000', fontWeight: '500', fontSize: 14}}
                />
              </View>
            </View>
            <View style={{width: '95%'}}>
              <Text
                style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
                Location
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  width: '95%',
                  borderWidth: 1,
                  borderColor: '#007F73',
                  paddingLeft: 10,
                  height: 40,
                }}>
                <TextInput
                  value={location}
                  onChangeText={handleTextChangeLocation}
                  placeholder="enter your text here"
                  style={{color: '#000', fontWeight: '500', fontSize: 14}}
                />
              </View>
            </View>
            <View style={{width: '95%'}}>
              <Text
                style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
                First Date
              </Text>
              <View style={{width: '100%', height: 60, borderRadius: 10}}>
                <DatePickerInput
                  locale="en"
                  label="Date"
                  value={date}
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
            <TouchableOpacity
              onPress={() => {
                handleNewCareProvider();
              }}
              style={{
                backgroundColor: '#007F73',
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                height: 40,
                borderRadius: 5,
              }}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCareProvider;
