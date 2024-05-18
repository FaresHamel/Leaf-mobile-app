import React from 'react';
import {View, Text,StatusBar ,SafeAreaView, TouchableOpacity} from "react-native";

const Vaccination = () => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity style={{backgroundColor:"#F7C566",padding:20}} >
          <Text>Add</Text>
       </TouchableOpacity>
      </View>
    <StatusBar backgroundColor="#F7C566" barStyle="dark-content" />
   </SafeAreaView>
  )
}

export default Vaccination;
