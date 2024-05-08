import React, {useEffect, useState, useContext} from 'react';
import {View, Text} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import logo from"../../assets/menuImage.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './splash.style';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View style={styles.viewContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
        <View
          style={styles.containerActiveIndicator}>
          <ActivityIndicator
            size="large"
            color="#198E52"
          />
        </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
