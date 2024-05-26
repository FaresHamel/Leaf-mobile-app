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
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,Linking
} from 'react-native';
import addImage from '../../../../assets/add02.png';
// import { Context } from '../../../../hooks/Context';
import {Context} from '../../../../hooks/Context';
import calender from '../../../../assets/calender.png';

const Events = ({navigation}) => {
  const [careProviderList, setCareProviderList] = useState([]);
  const {userData} = useContext(Context);
  const handleCallPress = () => {
    const phoneNumber = '1234567890'; // Replace with the actual phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const fetchCareProvider = async () => {
    fetch(`http://192.168.43.54:5000/getCareProvider?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.length > 0) {
          let arr = responseJson;
          // console.log(arr);
          setCareProviderList(arr);
        } else {
          // setClickStart(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchCareProvider();
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
          showsVerticalScrollIndicator={false}
        >
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
                    justifyContent:"space-around",
                    borderWidth: 1,
                    borderColor: '#d9dad7',
                    shadowColor: '#000',
                    marginBottom:10,
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
                        fontSize: 18,
                      }}>
                      Name :{' '}
                    </Text>
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
                        fontSize: 18,
                      }}>
                      Phone number :{' '}
                    </Text>
                    <TouchableOpacity onPress={()=>Linking.openURL(`tel:${item.phoneNumber}`)}>
                       <Text
                      style={{
                        color: '#000',
                        // marginBottom: 7,
                        fontWeight: '400',
                        fontSize: 15,
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
                        fontSize: 18,
                      }}>
                      Email :{' '}
                    </Text>
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
                        fontSize: 18,
                      }}>
                      Location:{' '}
                    </Text>
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
                        fontSize: 18,
                      }}>
                      Specialty:{' '}
                    </Text>
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
                  <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text
                      style={{
                        color: '#000',
                        fontWeight: '700',
                        fontSize: 18,
                        marginRight: 10,
                      }}>
                      Date :
                    </Text>
                    <View
                      style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Image
                        source={calender}
                        style={{
                          width: 15,
                          height: 15,
                          marginRight: 10,
                          tintColor: '#000',
                        }}
                      />
                      <Text
                        style={{
                          color: '#000',
                          color: '#000',
                          // marginBottom: 7,
                          fontWeight: '400',
                          fontSize: 15,
                        }}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <></>
            )}
            <Pressable
              onPress={() => navigation.navigate('AddCareProvider')}
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
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar backgroundColor="#CC5DE8" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Events;

