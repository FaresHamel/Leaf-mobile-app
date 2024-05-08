import React from 'react';
import { View, Text,Modal,Pressable,Image} from "react-native";
import styles from './modal.style';
import back from '../../../assets/back.png';
import symptoms from '../../../assets/symptoms.png';
import medicaments from '../../../assets/medicament.png';
import body from '../../../assets/body.png';
import bool from '../../../assets/bool.png';
import mood from '../../../assets/mood.png';
import food from '../../../assets/food.png';
import water from '../../../assets/water.png';

const Moodal = ({modalVisible,setModalVisible,setClickStart}) => {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={styles.header}>
              <Pressable
                style={styles.btnGoback}
                onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  source={back}
                  style={styles.imgGoback}
                />
              </Pressable>
              <Text
                style={styles.textGoback}>
                Get Logining
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.title}>
                Choose a few things to track regularly
              </Text>
              <Text style={styles.description}>
                You can log anything anytime ,but this can help focus your
                efforts .
              </Text>
            </View>
            <View
              style={styles.containerSymptoms}>
              <Text style={styles.symptomsTitle}>
                Symptoms and Meds
              </Text>
              <View
                style={styles.symptoms}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 6,
                    width: 120,
                    height: 30,
                    backgroundColor: 'white',
                    borderColor: '#198E52',
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      width: '30%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderRightColor: '#198E52',
                    }}>
                    <Image source={symptoms} style={{tintColor: '#198E52'}} />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#198E52',
                        fontWeight: '700',
                      }}>
                      Symptoms
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    borderRadius: 6,
                    width: 120,
                    height: 30,
                    backgroundColor: 'white',
                    borderColor: '#18A6C5',
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      width: '30%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderRightColor: '#18A6C5',
                    }}>
                    <Image
                      source={medicaments}
                      style={{tintColor: '#18A6C5', width: 20, height: 20}}
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#18A6C5',
                        fontWeight: '700',
                      }}>
                      Took Meds
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 14, color: '#000', marginBottom: 5}}>
                Mood and Activity
              </Text>
              <View
                style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 6,
                    width: 120,
                    height: 30,
                    backgroundColor: 'white',
                    borderColor: '#a75377',
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      width: '30%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderRightColor: '#a75377',
                    }}>
                    <Image
                      source={mood}
                      style={{tintColor: '#a75377', width: 20, height: 20}}
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#a75377',
                        fontWeight: '700',
                      }}>
                      Mood
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    borderRadius: 6,
                    width: 120,
                    height: 30,
                    backgroundColor: 'white',
                    borderColor: '#be6a15',
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      width: '30%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderRightColor: '#be6a15',
                    }}>
                    <Image
                      source={body}
                      style={{tintColor: '#be6a15', width: 20, height: 20}}
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#be6a15',
                        fontWeight: '700',
                      }}>
                      Activity
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 14, color: '#000', marginBottom: 5}}>
                Urination
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 6,
                  width: 120,
                  height: 30,
                  backgroundColor: 'white',
                  borderColor: '#FBCD59',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    width: '30%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRightWidth: 1,
                    borderRightColor: '#FBCD59',
                  }}>
                  <Image
                    source={bool}
                    style={{tintColor: '#FBCD59', width: 20, height: 20}}
                  />
                </View>
                <View
                  style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 7,
                  }}>
                  <Text
                    style={{fontSize: 13, color: '#FBCD59', fontWeight: '700'}}>
                    Urination
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 14, color: '#000', marginBottom: 5}}>
                Food and Water
              </Text>
              <View
                style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 6,
                    width: 120,
                    height: 30,
                    backgroundColor: 'white',
                    borderColor: '#a4c639',
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      width: '30%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderRightColor: '#a4c639',
                    }}>
                    <Image
                      source={food}
                      style={{tintColor: '#a4c639', width: 20, height: 20}}
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#a4c639',
                        fontWeight: '700',
                      }}>
                      Food
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    flexDirection: 'row',
                    borderRadius: 6,
                    width: 120,
                    height: 30,
                    backgroundColor: 'white',
                    borderColor: '#3369e7',
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      width: '30%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderRightColor: '#3369e7',
                    }}>
                    <Image
                      source={water}
                      style={{tintColor: '#3369e7', width: 20, height: 20}}
                    />
                  </View>
                  <View
                    style={{
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 7,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#3369e7',
                        fontWeight: '700',
                      }}>
                      Water
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Pressable
            style={{
              position: 'absolute',
              right: 20,
              bottom: 60,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: '#198E52',
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setModalVisible(false)
              // setDisplay(true)
              setClickStart(true)
            }}>
            <Text
              style={{
                color: '#198E52',
                textTransform: 'capitalize',
                fontSize: 12,
              }}>
              select all and get started
            </Text>
          </Pressable>
        </View>
      </Modal>
  )
}

export default Moodal;
