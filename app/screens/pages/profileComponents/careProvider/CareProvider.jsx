import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Modal,
  TextInput,KeyboardAvoidingView
} from 'react-native';
import addImage from '../../../../assets/add02.png';
import back from '../../../../assets/back.png';
// import { Context } from '../../../../hooks/Context';
import {Context} from '../../../../hooks/Context';
import calender from '../../../../assets/calender.png';
import {format} from 'date-fns';
import { LinearProgress } from '@rneui/themed';
import { useHeaderHeight } from '@react-navigation/elements'

const CareProvider = () => {
  const height = useHeaderHeight()
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [newMeds, setNewMeds] = useState('');
  const [careProviderList, setCareProviderList] = useState([]);
  const formattedDate = format(currentDate, 'EEEE,dd MMM'); // Format the date
  const timee = format(currentDate, 'p');
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const {dataDisplayMatrix,updateDataItem,userData} = useContext(Context);
  
 
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

  const fetchCareProvider = async () => {
    fetch(`http://192.168.43.54:5000/getCareProvider?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length > 0) {
          let arr = responseJson;
          console.log(arr)
          setCareProviderList(arr);
        } else {
          // setClickStart(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
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
      console.log('Data sent successfully:', data); // Handle successful response
      fetchCareProvider();
    } catch (error) {
      console.error('Error sending data:', error); // Handle errors gracefully
    }
  };
  //prepeare th data to send to the server add time and date
  const handleNewCareProvider = () => {
    if (name && location && email && specialty && phone && date) {
      const newCareProvider = {
        name:name,
        specialty:specialty,
        email:email,
        location:location,
        phone:phone,
        date:date,
      };
      sendData(newCareProvider);
      setModalVisible(false);
    }
    setName('');
    setDate('');
    setEmail('');
    setLocation('');
    setPhone('');
    setSpecialty('');
  };

  useEffect(() => {
    fetchCareProvider();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView
      keyboardVerticalOffset={47}
      behavior="padding"
      style={{ flex: 1 }}
      enabled>
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View>
          {careProviderList.length > 0 ? (
            careProviderList.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: 230,
                  padding: 10,
                  flexDirection:"column",
                  justifyContent: 'space-between',
                  borderTopWidth: 1,
                  borderTopColor: '#d9dad7',
                }}>
                <View style={{ flexDirection: "row",marginBottom:5,alignItems:"baseline"}} >
                  <Text style={{color:"#000",fontWeight:"700",marginRight:10,fontSize:18}} >Name : </Text>
                  <Text
                  style={{
                    color: '#000',
                    // marginBottom: 7,
                    fontWeight: '400',
                    fontSize: 18,
                  }}>
                  {item.name}
                </Text>
                </View>
                  <View style={{ flexDirection: "row",marginBottom:5,alignItems:"baseline"}} >
                  <Text style={{color:"#000",fontWeight:"700",marginRight:10,fontSize:18}} >Phone number : </Text>
                  <Text
                  style={{
                    color: '#000',
                    // marginBottom: 7,
                    fontWeight: '400',
                    fontSize: 15,
                  }}>
                  {item.phoneNumber}
                </Text>
                </View>
                  <View style={{ flexDirection: "row",marginBottom:5,alignItems:"baseline"}} >
                  <Text style={{color:"#000",fontWeight:"700",marginRight:10,fontSize:18}} >Email : </Text>
                  <Text
                  style={{
                    color: '#000',
                    // marginBottom: 7,
                    fontWeight: '400',
                    fontSize: 15,
                  }}>
                  {item.email}
                </Text>
                </View>
                <View style={{ flexDirection: "row",marginBottom:5,alignItems:"baseline"}} >
                  <Text style={{color:"#000",fontWeight:"700",marginRight:10,fontSize:18}} >Location: </Text>
                  <Text
                  style={{
                    color: '#000',
                    // marginBottom: 7,
                    fontWeight: '400',
                    fontSize: 15,
                  }}>
                  {item.location}
                </Text>
                </View> 
                  <View style={{ flexDirection: "row",marginBottom:5,alignItems:"baseline"}} >
                  <Text style={{color:"#000",fontWeight:"700",marginRight:10,fontSize:18}} >Specialty: </Text>
                  <Text
                  style={{
                    color: '#000',
                    // marginBottom: 7,
                    fontWeight: '400',
                    fontSize: 15,
                  }}>
                  {item.specialty}
                </Text>
                </View> 
                <View style={{flexDirection: "row", alignItems:"baseline"}}>
                  <Text style={{color:"#000",fontWeight:"700",fontSize:18,marginRight:10}} >Date :</Text>
                  <View style={{flexDirection:"row",alignItems:"baseline"}} >
                  <Image
                    source={calender}
                    style={{
                      width: 15,
                      height: 15,
                      marginRight: 10,
                      tintColor: '#000',
                    }}
                  />
                  <Text style={{color: '#000',color: '#000',
                    // marginBottom: 7,
                    fontWeight: '400',
                    fontSize: 15}}>{item.date}</Text>
                 </View>
                </View>
              </View>
            ))
          ) : (
            <></>
          )}
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
                New Care Provider
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
                height: 600,
              }}>
              <View
                style={{
                  backgroundColor: '#007F73',
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
                  New Care Provider
                </Text>
              </View>
             <SafeAreaView  style={{height:"100%",width:"100%"}} >
               <View
                style={{
                  width: '100%',
                  alignItems: 'flex-start',
                  backgroundColor: 'white',
                  justifyContent: 'space-around',
                  height: '100%',
                  paddingLeft: 20,
                  borderRadius: 20
                }}>
                <View style={{width: '95%'}}>
                  <Text style={{color: '#000', marginBottom: 10}}>Name</Text>
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
                  <Text style={{color: '#000', marginBottom: 10}}>
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
                  <Text style={{color: '#000', marginBottom: 10}}>Phone Number</Text>
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
                      placeholder="enter your text here"
                      style={{color: '#000', fontWeight: '500', fontSize: 14}}
                    />
                  </View>
                </View>
                <View style={{width: '95%'}}>
                  <Text style={{color: '#000', marginBottom: 10}}>
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
                      placeholder="enter your text here"
                      style={{color: '#000', fontWeight: '500', fontSize: 14}}
                    />
                  </View>
                </View>
                <View style={{width: '95%'}}>
                  <Text style={{color: '#000', marginBottom: 10}}>
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
                  <Text style={{color: '#000', marginBottom: 10}}>
                    First Date
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
                      value={date}
                      onChangeText={handleTextChangeDate}
                      placeholder="12 May 2024 please enter date like this form"
                      style={{color: '#000', fontWeight: '500', fontSize: 14}}
                    />
                  </View>
                </View>
                <Pressable
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
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
                    Add
                  </Text>
                </Pressable>
              </View>
             </SafeAreaView>
            </View>
          </View>
        </Modal>
        </ScrollView>
        </KeyboardAvoidingView>
      <StatusBar backgroundColor="#007F73" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default CareProvider;
