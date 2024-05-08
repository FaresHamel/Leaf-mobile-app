import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import styles from './home.style';
import startImage from '../../assets/goStart.png';
import medicaments from '../../assets/medicament.png';
import body from '../../assets/body.png';
import bool from '../../assets/bool.png';
import mood from '../../assets/mood.png';
import food from '../../assets/food.png';
import symptoms from '../../assets/symptoms.png';
import addImage from "../../assets/add02.png";
import water from '../../assets/water.png';
import { Context } from '../../hooks/Context';
import Moodal from '../components/Modal/Moodal';

const dataDisplay = [
  {
    source: symptoms,
    backgroundColor: '#198E52',
    tintcolor: 'white',
    title: 'Symptoms',
    link: 'Symptoms',
  },
  {
    source: medicaments,
    backgroundColor: '#18A6C5',
    tintcolor: 'white',
    title: 'Tock Meds',
    link: 'Medicaments',
  },
  {
    source: bool,
    backgroundColor: '#FBCD59',
    tintcolor: 'white',
    title: 'Uniration',
    link: 'Uniration',
  },
  {
    source: mood,
    backgroundColor: '#a75377',
    tintcolor: 'white',
    title: 'Mood',
    link: 'Mood',
  },
  {
    source: body,
    backgroundColor: '#be6a15',
    tintcolor: 'white',
    title: 'Activity',
    link: 'Activity',
  },
  {
    source: food,
    backgroundColor: '#f47721',
    tintcolor: 'white',
    title: 'Food',
    link: 'Food',
  },
  {
    source: water,
    backgroundColor: '#3369e7',
    tintcolor: 'white',
    title: 'Water',
    link: 'Water',
  },
];

const Home = ({navigation}) => {
  
  const [matrix,setlistmatrix] = useState(""); 
  const {cklickStart,setClickStart,dataSamptoms,medsList} = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const symptomsChecked = dataSamptoms.filter((obj) => obj.isChecked).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:"#fff"}} >     
      <View
        style={{
          marginBottom: 20,
          marginTop: 20,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {cklickStart ? (
          dataDisplay.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate(item.link)}
                style={{
                  flexDirection: 'row',
                  borderRadius: 6,
                  width: 110,
                  height: 40,
                  backgroundColor: 'white',
                  borderColor: '#d9dad7',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  margin: 10,
                }}>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    width: '30%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={item.source}
                    style={{
                      tintColor: item.backgroundColor,
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      color: '#403f3f',
                      fontWeight: '700',
                    }}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <>
            <View style={{width: '100%', marginBottom: 20, paddingLeft: 4}}>
              <Text style={{fontWeight: '600'}}>
                Click to Get Starte to start your Tasks and Track other things
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#198E52',
                borderRadius: 10,
                width: '100%',
                height: 200,
                justifyContent: 'center',
                paddingVertical: 15,
                paddingHorizontal: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: '300', fontSize: 18}}>
                Track symtopms,meds,cycle and other factors to see trends and
                relashionships
              </Text>
              <FlatList
                data={dataDisplay}
                renderItem={({item,index}) => (
                  <View
                    key={index}
                    style={{
                      width: 30,
                      height: 30,
                      borderWidth: 2,
                      borderColor: 'white',
                      backgroundColor: item.backgroundColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                    }}>
                    <Image
                      source={item.source}
                      style={{width: 20, height: 20, tintColor: item.tintcolor}}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => String(index)}
                contentContainerStyle={{
                  columnGap: 11,
                  backgroundColor: 'reds',
                  alignSelf: 'center',
                  height: 50,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  width: 200,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => setModalVisible(true)}>
                <Text
                  style={{
                    color: '#198E52',
                    fontWeight: '400',
                    fontSize: 15,
                    marginRight: 20,
                  }}>
                  Get Started
                </Text>
                <Image source={startImage} style={{width: 23, height: 23}} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
        {symptomsChecked ?
          <View style={{ width: "100%",marginBottom:20}}>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",padding:10}} >
              <Text style={{fontWeight:"500",fontSize:16}} >Symptoms</Text>
              <Pressable>
                <Text style={{color:"#198E52"}} >See All</Text>
              </Pressable>
            </View>
          <View style={{backgroundColor:"#fff", borderRadius:10,padding:20,borderColor:"#198E52",borderWidth:1}}>
            {dataSamptoms.map((obj) => (
              obj.isChecked ?
                <View style={{borderBottomColor:"#d9dad7",borderBottomWidth:1,marginBottom:10,paddingVertical:5,flexDirection:"row",justifyContent:"space-between"}} >
                  <Text>{obj.title}</Text>
                  <Text>{obj.date+"   "+obj.time}</Text>
                </View>
              :(<></>)
            ))}
             <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}} >
              <Pressable onPress={()=>navigation.navigate("Symptoms")}  style={{backgroundColor:"#198E52",marginTop:10,width:140,height:35,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingHorizontal:10,borderRadius:7}} >
              <Image source={addImage} style={{width:20,height:20,tintColor:"#fff",marginRight:10}}/>
              <Text style={{color:"#f1f3f3"}} >Symptoms</Text>
             </Pressable>
          </View>
        </View>
        </View>
          : null}
        {medsList.length >0 ?
         <View style={{ width: "100%" }}>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"space-between",padding:10}} >
              <Text style={{fontWeight:"500",fontSize:16}} >Meds Taken</Text>
              <Pressable>
                <Text style={{color:"#18A6C5"}} >See All</Text>
              </Pressable>
            </View>
          <View style={{backgroundColor:"#fff", borderRadius:10,padding:20,borderColor:"#18A6C5",borderWidth:1}}>
            {medsList.map((obj) => (
             
                <View style={{borderBottomColor:"#d9dad7",borderBottomWidth:1,marginBottom:10,paddingVertical:5,flexDirection:"row",justifyContent:"space-between"}} >
                  <Text>{obj.name}</Text>
                  <Text>{obj.date+"   "+obj.time}</Text>
                </View>
             
            ))}
             <View style={{flexDirection:"row",width:"100%",justifyContent:"space-between"}} >
              <Pressable onPress={()=>navigation.navigate("Medicaments")}  style={{backgroundColor:"#18A6C5",marginTop:10 ,width:140,height:35,flexDirection:"row",justifyContent:"flex-start",alignItems:"center",paddingHorizontal:10,borderRadius:7}} >
              <Image source={addImage} style={{width:20,height:20,tintColor:"#fff",marginRight:10}}/>
             <Text style={{color:"#f1f3f3"}} >Medicaments</Text>
             </Pressable>
          </View>
        </View>
        </View> :null
        }
      </ScrollView>
      <Moodal  modalVisible={modalVisible} setModalVisible={setModalVisible} setClickStart = {setClickStart}/>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
    </SafeAreaView>
  );
};
export default Home;
