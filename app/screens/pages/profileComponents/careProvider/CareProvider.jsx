import React from 'react'
import { Text, View,SafeAreaView,StatusBar} from "react-native";
const CareProvider = () => {
  return (
     <SafeAreaView>
      <View>
        <Text>
          welcome
        </Text>
      </View>
      <StatusBar backgroundColor="#007F73" barStyle="dark-content" />
   </SafeAreaView>
  )
}

export default CareProvider
