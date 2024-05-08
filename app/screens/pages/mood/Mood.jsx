import React,{useState,useContext,useEffect} from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, StatusBar, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import smile from "../../../assets/smile.png";
import crying from "../../../assets/crying.png";
import confused from "../../../assets/confused.png"
import happy from "../../../assets/happy.png";
import disappointed from "../../../assets/disappointed.png"
import timer from '../../../assets/clock.png';

import { format } from 'date-fns'; 
const Mood = () => {

  const ListWaterBottle = [
    { image: crying, name: "1"},
      { image: disappointed, name: "2"},
    { image: confused, name: "3"},
    { image: smile, name: "4"},
    { image: happy, name: "5" }
  ]
  const [selectedItem, setSelectedItem] = useState("1");
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = format(currentDate, 'EEEE,dd MMM');  
  const timee = format(currentDate, 'pppp')

  const handleSubmitt = () => {
    const it = ListWaterBottle.filter((item) => item.name === selectedItem);
    console.log(it);
  }


  return (
     <SafeAreaView style={{flex:1,padding:10,backgroundColor:"white"}} >
      <View style={{width:"100%",flexDirection:"row",justifyContent:"space-around",backgroundColor:"transparent",padding:10}} >
        {ListWaterBottle.map((item, index) => (
        <Pressable key={index} style={styles.tab(selectedItem,item.name)} onPress={()=>setSelectedItem(item.name)} >
         <View style={{backgroundColor:"#e2f3f5",width:50,height:50,alignItems:"center",justifyContent:"center",borderRadius:7}} >
          <Image source={item.image} style={styles.tabImage(selectedItem,item.name)}/>
        </View>
        <View style={{backgroundColor:"transparent",width:60,height:15,justifyContent:"center",alignItems:"center",marginTop:5}} >
          <Text style={styles.tabText(selectedItem,item.name)} >{item.name}</Text>
        </View>
       </Pressable>
       ))}
      </View>
      <View style={{justifyContent: 'space-around',marginTop:20}}>
        <View style={{marginBottom: 10}}>
          <Text style={{color: '#000',fontSize:16,fontWeight:"bold"}}>Date / Time</Text>
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
            <Image source={timer} style={{width: 15, height: 15}} />
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
              paddingRight:10
            }}>
            <Image
              source={timer}
              style={{width: 15, height: 15, tintColor: '#000'}}
            />
             <Text style={{ color: '#000',textTransform:"lowercase"}}>{timee}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => {
          handleSubmitt();
          navigation.navigate("Home")
        }}  style={{backgroundColor:"#a75377" ,width:120,height:40,borderRadius:5,alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop: 30}}>
          <Text style={{color: '#fff',fontSize:14,fontWeight:"600"}}>ADD</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor="#a75377" barStyle="light-content" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tab: (activeJobType,item) => ({
    borderColor:  activeJobType === item ? "#a75377" : "red",
    borderWidth:  activeJobType === item ? 2 : 0,
    width: 55,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor:activeJobType === item ? "#e2f3f5":"#fff"
   }),
    tabText: (activeJobType, item) => ({
      color: activeJobType === item ? '#a75377' : '#000',
      fontSize: 10,
      marginTop:3
  }),
    tabImage: (activeJobType, item) => ({
    width:25,height:25,  
    tintColor: activeJobType === item ? '#a75377' : '#f2a2e4',
  }),
})

export default Mood;
