import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import addImage from '../../../../assets/add02.png';
import {Context} from '../../../../hooks/Context';
import calender from '../../../../assets/calender.png';
import axios from 'axios';
const AddCareProvider = ({navigation}) => {
  const [careProviderList, setCareProviderList] = useState([]);
  const {userData} = useContext(Context);
  const fetchCareProvider = async () => {
    fetch('http://192.168.43.54:5000/getMedecin')
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length > 0) {
          let arr = responseJson;
          //  console.log(arr);
          if (arr.length > 0) {
            setCareProviderList(arr);
          } else {
            setCareProviderList([]);
          }
        } else {
          // setClickStart(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const addNewCareProvider = async id => {
    const newCare = careProviderList.find(item => item.idmedecin === id);
    console.log(newCare) 
    try {
       const response = await axios.post(`http://192.168.43.54:5000/addCareProvider?userId=${userData.iduser}`, newCare);
         if (response.data.result == 1) {
        Alert.alert('Success', 'Added new Care Provider successfully');
        // navigation.navigate("CareProvider");
        navigation.popToTop('CareProvider')
      } else {
        Alert.alert('Error', 'Failed to Add Care Provider because is exist before');
         }
    
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred connection');
    }
  };

  const showAlertBeforeShareProfile = id => {
    Alert.alert(
      'Share Profile',
      'Are you sure that you want to add this care provider ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel share'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => addNewCareProvider(id)},
      ],
      {cancelable: false},
    );
  };

  useEffect(() => {
    fetchCareProvider();
    console.log(careProviderList)
  });

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={47}
        behavior="padding"
        style={{flex: 1}}
        enabled>
        <ScrollView
          style={{flex: 1, backgroundColor: 'white'}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            {careProviderList.length > 0 ? (
              careProviderList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: 230,
                    padding: 10,
                    justifyContent: 'space-around',
                    borderWidth: 1,
                    borderColor: '#d9dad7',
                    shadowColor: '#000',
                    marginBottom: 10,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 3,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 5,
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        marginRight: 10,
                        fontSize: 10,
                      }}>
                      Name :
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '400',
                        fontSize: 10,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 5,
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        marginRight: 10,
                        fontSize: 10,
                      }}>
                      Phone number :
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(`tel:${item.phoneNumber}`)
                      }>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: '400',
                          fontSize: 10,
                        }}>
                        {item.phoneNumber}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 5,
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        marginRight: 10,
                        fontSize: 10,
                      }}>
                      Email :
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '400',
                        fontSize: 10,
                      }}>
                      {item.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 5,
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        marginRight: 10,
                        fontSize: 10,
                      }}>
                      Location:
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '400',
                        fontSize: 10,
                      }}>
                      {item.location}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 5,
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        marginRight: 10,
                        fontSize: 10,
                      }}>
                      Specialty:
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '400',
                        fontSize: 10,
                      }}>
                      {item.speciality}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        showAlertBeforeShareProfile(item.idmedecin)
                      }
                      style={{
                        paddingBottom: 5,
                        borderBottomColor: '#007F73',
                        borderBottomWidth: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: '#007F73',
                          fontWeight: '700',
                          fontSize: 10,
                          textDecoration: true,
                        }}>
                        Add to Care Provider
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <></>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar backgroundColor="#007F73" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default AddCareProvider;

// const AddCareProvider = ({navigation}) => {
//   const [name, setName] = useState('');
//   const [specialty, setSpecialty] = useState('');
//   const [phone, setPhone] = useState('');
//   const [location, setLocation] = useState('');
//   const [email, setEmail] = useState('');
//   const [date, setDate] = useState('');
//   const {userData} = useContext(Context);

//   // change input Text
//   const handleTextChangeName = text => {
//     setName(text);
//   };

//   const handleTextChangeEmail = text => {
//     setEmail(text);
//   };
//   const handleTextChangePhone = text => {
//     setPhone(text);
//   };
//   const handleTextChangeLocation = text => {
//     setLocation(text);
//   };
//   const handleTextChangeDate = text => {
//     setDate(text);
//   };
//   const handleTextChangeSpecilty = text => {
//     setSpecialty(text);
//   };

//   //send data to the server
//   const sendData = async newCarePro => {
//     try {
//       const response = await fetch(
//         `http://192.168.43.54:5000/addCareProvider?userId=${userData.iduser}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json', // Specify JSON data format
//           },
//           body: JSON.stringify(newCarePro), // Convert data to JSON string
//         },
//       );
//       const data = await response.json(); // Parse server response if needed
//       if (data) {
//         navigation.navigate('CareProvider');
//       }
//     } catch (error) {
//       console.error('Error sending data:', error); // Handle errors gracefully
//     }
//   };
//prepeare th data to send to the server add time and date
// const handleNewCareProvider = () => {
//   if (name && location && email && specialty && phone && date) {
//     const newCareProvider = {
//       name: name,
//       specialty: specialty,
//       email: email,
//       location: location,
//       phone: phone,
//       date: date,
//     };
//     sendData(newCareProvider);
//   }
//   setName('');
//   setDate('');
//   setEmail('');
//   setLocation('');
//   setPhone('');
//   setSpecialty('');
// };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
//       <ScrollView
//         style={{flex: 1}}
//         contentContainerStyle={{alignItems: 'center', backgroundColor: 'white'}}
//         showsHorizontalScrollIndicator={false}>
//         <View
//           style={{
//             backgroundColor: 'white',
//             borderRadius: 10,
//             alignItems: 'center',
//             width: '95%',
//             height: 650,
//             paddingTop: 10,
//             paddingBottom: 10,
//           }}>
//           <Text
//             style={{
//               alignSelf: 'center',
//               fontSize: 17,
//               color: '#000',
//               fontWeight: '600',
//             }}>
//             New Care Provider
//           </Text>
//           <View
//             style={{
//               width: '100%',
//               alignItems: 'flex-start',
//               backgroundColor: 'white',
//               justifyContent: 'space-around',
//               height: '95%',
//               paddingLeft: 20,
//               borderRadius: 10,
//             }}>
//             <View style={{width: '95%'}}>
//               <Text
//                 style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
//                 Name
//               </Text>
//               <View
//                 style={{
//                   borderRadius: 5,
//                   width: '95%',
//                   borderWidth: 1,
//                   borderColor: '#007F73',
//                   paddingLeft: 10,
//                   height: 40,
//                 }}>
//                 <TextInput
//                   onChangeText={handleTextChangeName}
//                   value={name}
//                   placeholder="enter your text here"
//                   style={{color: '#000', fontWeight: '500', fontSize: 14}}
//                 />
//               </View>
//             </View>
//             <View style={{width: '95%'}}>
//               <Text
//                 style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
//                 Specialty
//               </Text>
//               <View
//                 style={{
//                   borderRadius: 5,
//                   width: '95%',
//                   borderWidth: 1,
//                   borderColor: '#007F73',
//                   paddingLeft: 10,
//                   height: 40,
//                 }}>
//                 <TextInput
//                   value={specialty}
//                   onChangeText={handleTextChangeSpecilty}
//                   placeholder="enter your text here"
//                   style={{color: '#000', fontWeight: '500', fontSize: 14}}
//                 />
//               </View>
//             </View>
//             <View style={{width: '95%'}}>
//               <Text
//                 style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
//                 Phone Number
//               </Text>
//               <View
//                 style={{
//                   borderRadius: 5,
//                   width: '95%',
//                   borderWidth: 1,
//                   borderColor: '#007F73',
//                   paddingLeft: 10,
//                   height: 40,
//                 }}>
//                 <TextInput
//                   value={phone}
//                   onChangeText={handleTextChangePhone}
//                   maxFontSizeMultiplier={10}
//                   keyboardType="name-phone-pad"
//                   placeholder="enter your text here"
//                   style={{color: '#000', fontWeight: '500', fontSize: 14}}
//                 />
//               </View>
//             </View>
//             <View style={{width: '95%'}}>
//               <Text
//                 style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
//                 Email Address
//               </Text>
//               <View
//                 style={{
//                   borderRadius: 5,
//                   width: '95%',
//                   borderWidth: 1,
//                   borderColor: '#007F73',
//                   paddingLeft: 10,
//                   height: 40,
//                 }}>
//                 <TextInput
//                   value={email}
//                   onChangeText={handleTextChangeEmail}
//                   keyboardType="email-address"
//                   placeholder="enter your text here"
//                   style={{color: '#000', fontWeight: '500', fontSize: 14}}
//                 />
//               </View>
//             </View>
//             <View style={{width: '95%'}}>
//               <Text
//                 style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
//                 Location
//               </Text>
//               <View
//                 style={{
//                   borderRadius: 5,
//                   width: '95%',
//                   borderWidth: 1,
//                   borderColor: '#007F73',
//                   paddingLeft: 10,
//                   height: 40,
//                 }}>
//                 <TextInput
//                   value={location}
//                   onChangeText={handleTextChangeLocation}
//                   placeholder="enter your text here"
//                   style={{color: '#000', fontWeight: '500', fontSize: 14}}
//                 />
//               </View>
//             </View>
//             <View style={{width: '95%'}}>
//               <Text
//                 style={{color: '#000', marginBottom: 10, fontWeight: '700'}}>
//                 First Date
//               </Text>
//               <View style={{width: '100%', height: 60, borderRadius: 10}}>
//                 <DatePickerInput
//                   locale="en"
//                   label="Date"
//                   value={date}
//                   onChange={d => handleTextChangeDate(d)}
//                   inputMode="start"
//                   style={{
//                     backgroundColor: 'white',
//                     borderRadius: 10,
//                     borderTopEndRadius: 10,
//                     borderTopLeftRadius: 10,
//                   }}
//                 />
//               </View>
//             </View>
//             <TouchableOpacity
//               onPress={() => {
//                 handleNewCareProvider();
//               }}
//               style={{
//                 backgroundColor: '#007F73',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: 100,
//                 height: 40,
//                 borderRadius: 5,
//               }}>
//               <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
//                 Add
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AddCareProvider;
