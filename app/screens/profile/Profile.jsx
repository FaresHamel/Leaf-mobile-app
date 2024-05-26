import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from "react-native";
import bandages from "../../assets/prifile/bandages.png";
import careprovider from "../../assets/prifile/careprovider.png";
import genitic from "../../assets/prifile/genitic.png";
import syringe from "../../assets/prifile/syringe.png";
import virus from "../../assets/prifile/virus.png";
import add from "../../assets/add.png";
import events from "../../assets/events.png"
const Profile = ({ navigation }) => {
  const data = [
   {
      id:1,
      image:bandages,
      title:"Condition & Injuries",
      link: "Condition",
      color: "#BE6A15",
    },
    {
      id:3,
      image:genitic,
      title:"Genetics",
      link: "Genetics",
      color: "#5FCDA4",
    },
    {
      id:4,
      image:syringe,
      title:"Vaccination",
      link: "Vaccination",
      color: "#5F0F40",
    },
    {
      id:5,
      image:virus,
      title:"Allegies & Intolerance",
      link: "Allergies",
      color: "#DD5746",
    },
    {
      id:2,
      image:careprovider,
      title:"Care Provider",
      link: "CareProvider",
      color:"#007F73"
    },
    {
      id:6,
      image:events,
      title:"Events",
      link: "Events",
      color:"#CC5DE8"
    }
    
  ]
const renderItem = ({ item }) => (
  <TouchableOpacity
    onPress={()=>navigation.navigate(item.link)}
    style={{
      borderColor: "#d9dad7",
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20
    }} >
         <View style={{width:"50%",flexDirection:"row",alignItems:"center",justifyContent:"flex-start"}} >
         <Image source={item.image} style={{width:30,height:30,marginRight:10,tintColor:item.color}}/>
         <Text>
          {item.title}
         </Text>
         </View>
         <View style={{backgroundColor:"#F6F5F2",padding:10,borderRadius:20}} >
         <Image source={add} style={{width:17,height:17}}/>
        </View>
       </TouchableOpacity>
);
 return (
  <SafeAreaView style={{flex:1,padding:20,backgroundColor:"white"}} >
     <FlatList
       data={data}
       renderItem={renderItem}
     />
  </SafeAreaView>
  )
}

export default Profile
//Bandage color #BE6A15
//Virus Color #DD5746
//Vaccine Color #F7C566
//DNA color #5FCDA4
//care privider color #007F73