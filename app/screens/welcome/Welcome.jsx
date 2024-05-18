import React from 'react';
import {   View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";
import welcomeImage from "../../assets/welcome.jpg";
import styles from './welcome.style';

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true} // Optional for smoother transition
        backgroundColor="transparent"
        barStyle="dark-content" // Adjust for light content if needed
        translucent={true}
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}>
        <ImageBackground source={welcomeImage} style={styles.imageBackground}>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnSignIn}
              onPress={() => navigation.navigate('Signin')}>
              <Text style={styles.textSignIn}>login to your account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSignUp}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.textSignUp}>Create new account</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Welcome;
