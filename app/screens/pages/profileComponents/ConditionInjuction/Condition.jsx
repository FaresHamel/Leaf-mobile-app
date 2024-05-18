import React from 'react'
import { Text, View ,SafeAreaView,StatusBar,TouchableOpacity} from "react-native";
const Condition = () => {
  return (
     <SafeAreaView>
      <View>
        <TouchableOpacity style={{backgroundColor:"#BE6A15",padding:10,width:70,borderRadius:20,alignItems:"center"}} >
          <Text style={{color:"white"}} >Add</Text>
       </TouchableOpacity>
      </View>
      <StatusBar backgroundColor="#BE6A15" barStyle="dark-content" />
   </SafeAreaView>
  )
}

export default Condition
