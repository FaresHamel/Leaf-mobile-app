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
// import { Context } from '../../../../hooks/Context';
import {Context} from '../../../../hooks/Context';
import axios from 'axios';
const CareProvider = ({navigation}) => {
  const [careProviderList, setCareProviderList] = useState([]);
  const {userData} = useContext(Context);
  const fetchCareProvider = async () => {
    fetch(`http://192.168.43.54:5000/getCareProvider?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson)
        if (responseJson.result === 0) {
          setCareProviderList([]);
        } else {
          setCareProviderList(responseJson);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteCareProvider = async id => {
    try {
      const response = await fetch(
        `http://192.168.43.54:5000/deleteCareProvider?userId=${userData.iduser}&providerId=${id}`,
        {
          method: 'DELETE',
        },
      );
      // console.log(response);
      if (response) {
        Alert.alert('Success', 'Care Provider deleted successfully');
        // fetchCareProvider();
      } else {
        Alert.alert('Error', 'Failed to delete the Care Provider');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred');
    }
  };

  const shareProfileWithProvider = async id => {
    try {
      const response = await axios.post(
        `http://192.168.43.54:5000/shareProfile?userId=${userData.iduser}&idMedecin=${id}`,
      );
      if (response.data.result == 1) {
        Alert.alert('Success', 'Profile Shared');
        // navigation.navigate("CareProvider");
        // navigation.popToTop('CareProvider');
      } else {
        Alert.alert(
          'Error',
          'Failed to Share Profile',
        );
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred');
    }
  };

  const showAlertBeforeShareProfile = id => {
    Alert.alert(
      'Share Profile',
      'Are you sure that you want to share your Profile with this Provider ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel share'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => shareProfileWithProvider(id)},
      ],
      {cancelable: false},
    );
  };
  const showAllerBeforeDelteProvider = id => {
    console.log(id);
    Alert.alert(
      'Delete Provider',
      'Are you sure that you want to delete this Provider ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteCareProvider(id)},
      ],
      {cancelable: false},
    );
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
                      Name :{' '}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        // marginBottom: 7,
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
                      Phone number :{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(`tel:${item.phoneNumber}`)
                      }>
                      <Text
                        style={{
                          color: '#000',
                          // marginBottom: 7,
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
                      Email :{' '}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        // marginBottom: 7,
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
                      Location:{' '}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        // marginBottom: 7,
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
                      Specialty:{' '}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        // marginBottom: 7,
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
                      onPress={() => showAlertBeforeShareProfile(item.idprov)}
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
                        Share Profile
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        showAllerBeforeDelteProvider(item.idcareProvider)
                      }
                      style={{
                        // backgroundColor: '#198E52',
                        // width: 100,
                        // paddingHorizontal: 10,
                        // paddingVertical: 5,
                        paddingBottom: 5,
                        borderBottomColor: 'red',
                        borderBottomWidth: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: 'red',
                          fontWeight: '700',
                          fontSize: 10,
                          textDecoration: true,
                        }}>
                        delete
                      </Text>
                    </TouchableOpacity>
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
      <StatusBar backgroundColor="#007F73" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default CareProvider;
