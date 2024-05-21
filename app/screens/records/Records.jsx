import React from 'react';
import { Text, View,SafeAreaView,  Linking, TouchableOpacity,} from "react-native";
//     onPress={() => Linking.openURL(data.link)}>
const Records = () => {
  const dataResources = [{
    id: 1,
    title: "",
    link:""
  },{},{},{}]
  return (
    <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:"white"}} >
      <View style={{
        backgroundColor: "white", borderRadius: 10, width: "90%", height: "90%", borderColor: "#d9dad7",
        paddingHorizontal: 20,
        paddingVertical:20,
        borderWidth: 1
      }} >
        <View style={{backgroundColor:"white",height:"50%",marginBottom:20}} >
         <Text style={{fontSize:16,fontWeight:"700",color:"#000"}} >
          Edicationnal Ressources
          </Text>
          <View style={{padding:20}} >
           <TouchableOpacity style={{width:"95%",padding:10,backgroundColor:"white",marginBottom:20,borderRadius:7,borderColor:"#d9dad7",borderWidth:1}} >
              <Text style={{color:"#000"}} >Learn about urologica conditions</Text>
            </TouchableOpacity>
              <TouchableOpacity style={{width:"95%",padding:10,backgroundColor:"white",marginBottom:20,borderRadius:7,borderColor:"#d9dad7",borderWidth:1}} >
              <Text style={{color:"#000"}}  >Food & Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:"95%",padding:10,backgroundColor:"white",marginBottom:20,borderRadius:7,borderColor:"#d9dad7",borderWidth:1}} >
              <Text style={{color:"#000"}}  >Activities and Exercises</Text>
            </TouchableOpacity>
             <TouchableOpacity style={{width:"95%",padding:10,backgroundColor:"white",borderRadius:7,borderColor:"#d9dad7",borderWidth:1}} >
              <Text style={{color:"#000"}}  >Stress reducation Techniques</Text>
           </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={{fontSize:16,fontWeight:"700",color:"#000"}} >
           Community Support
          </Text>
          <View  style={{padding:20}} >
           <View style={{width:"95%",padding:10,backgroundColor:"white",marginBottom:20,borderRadius:7,borderColor:"#d9dad7",borderWidth:1}} >
              <Text style={{color:"#000"}} >Survivor Stories</Text>
            </View>
          </View>
        </View>
      </View>
   </SafeAreaView>
  )
}

export default Records
