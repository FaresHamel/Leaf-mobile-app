import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import google from '../../assets/google.png';
import styles from './signup.style';
import AwesomeAlert from 'react-native-awesome-alerts';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('please enter your name'),
  phoneNumber: Yup.string()
    .required('Please enter your phone number')
    .min(10,'Please enter correct phone number')
    .max(10,'Please enter correct phone number'),
   email: Yup.string()
    .email('please enter correct email')
    .required('please enter your email'),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'The password should contain 8 character')
    .matches(/[a-z]/, 'The password should contain small letter')
    .matches(/[A-Z]/, 'The password should contain one capital letter')
    .matches(/[0-9]/, 'The password should containe one letter')
    .matches(
      /[^a-zA-Z0-9]/,
      'The password should contain one special letter',
    ),
});

const SignUp = ({navigation}) => {
 
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setAlertText] =  useState('please wait...');
  const [showProgress, setShowProgress] = useState(false);
  const [showCancelButton, setshowCancelButton] = useState(false);
  const [style, setStyle] = useState({ width: 170, height: 120 });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '443425767025-dfcjm96gmgk71lj6je4edpo0qo3ao59h.apps.googleusercontent.com',
    });
   },[])
  
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken, user } = await GoogleSignin.signIn();

      const val = {
        firstname: user.familyName,
        lastname: user.givenName,
        phoneNumber: "0000000000",
        email: user.email,
        password: user.id,
      }

      handleSubmition(val);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      // console.log(error);
    }
  }


  const handleSubmition = values => {
    setAlertText('please wait..');
    setshowCancelButton(false);
    setShowAlert(true);
    setShowProgress(true);
    if (values.email || values.password) {
      verification(values);
    } else {
      return;
    }
  };

  const verification = async val => {
    try {
      const res = await axios.post(
        'http://192.168.43.54:3000/verification',
        val,
      );
      const result = res.data.result;
      if (result === 1) {
        setShowProgress(false);
        setAlertText('البريد الالكتروني او رقم الهاتف مستعمل من قبل .');
        setshowCancelButton(true);
        setStyle({ width: 220, height: 120 });
      } else {
        signUp(val);
      }
    } catch (error) {
      // Alert.alert('Error sign in', 'please try again', [{text: 'OK'}]);
      setShowProgress(false);
      setAlertText('حدث خطأ. حاول مرة اخرى');
      setshowCancelButton(true);
      setStyle({ width: 200, height: 120 });
    }
  };

  const signUp = async val => {
    try {
      const res = await axios.post('http://192.168.43.54:3000/signup', val);
      if (res.data.id) {
        const store = storeData(res.data);
        if (store) {
          setAlertText('please wait..');
          setShowAlert(false);
          setShowAlert(false);
          setshowCancelButton(false);
          setShowAlert(false);
          setShowProgress(false);
          navigation.navigate('Home');
        } else return;
      }
    } catch (error) {
      setShowProgress(false);
      setAlertText('olease try again');
      setshowCancelButton(true);
      setStyle({ width: 200, height: 120 });
    }
  };

  const storeData = async values => {
    try {
      const jsonValue = JSON.stringify(values);
      await AsyncStorage.setItem('userInfo', jsonValue);
      return true;
    } catch (e) {
      // console.log(e);
      return false;
    }
  };
 
 
  return (
   <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerWelcomeText}> Welcome !</Text>
          <Text style={styles.headerDescriptionText}>
            Create new account to get started .
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={values => {
              handleSubmition(values);
            }}>
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <View
                  style={styles.inputContainer}>
                  <TextInput
                    nativID="lastname"
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    placeholder="Enter you username "
                    style={styles.textInputStyle}
                    writingDirection="ltr"
                  />
                </View>
                {errors.firstname ? (
                  <Text style={styles.errorText}>{errors.firstname}</Text>
                ) : null}
                <View
                  style={styles.inputContainer}>
                  <TextInput
                    nativID="email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder="Enter your email . "
                    keyboardType="email-address"
                    style={styles.textInputStyle}
                  />
                </View>

                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
                <View
                  style={styles.inputContainer}>
                  <TextInput
                    nativID="password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    value={values.password}
                    style={styles.textInputStyle}
                  />
                </View>
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}

                <AwesomeAlert
                  show={showAlert}
                  showProgress={showProgress}
                  useNativeDriver={true}
                  title=""
                  message={textAlert}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showCancelButton={showCancelButton}
                  // showConfirmButton={true}
                  cancelText="ok"
                  // confirmText="Yes, delete it"
                  // confirmButtonColor="#DD6B55"
                  cancelButtonColor="#198E52"
                  onCancelPressed={() => {
                    setShowAlert(false);
                    setShowProgress(false);
                  }}
                  // onConfirmPressed={() => {
                  //   this.hideAlert();
                  // }}
                  progressColor="#198E52"
                  progresSize="30"
                  animatedValue={3}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={true}
                  contentContainerStyle={styles.alertDimmention}
                />

                <TouchableOpacity
                  style={styles.createAcountBotton} 
                  onPress={handleSubmit}>
                  <Text
                    style={styles.createAcountText}>
                    create new account</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
        <View style={styles.footer}>
          <View style={styles.orText}>
            <Text>----------------- OR -----------------</Text>
          </View>
          <TouchableOpacity style={styles.singupGoogle} onPress={() => onGoogleButtonPress()} >
            <Image source={google} style={styles.googleIcon} />
            <Text style={styles.googleText}>Continue with google</Text>
          </TouchableOpacity>
          <View style={styles.anotherAcountText}>
            <Text>You have already an account ?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signin')}>
              <Text
                style={styles.signInText}>
                Sign in to your account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp;
