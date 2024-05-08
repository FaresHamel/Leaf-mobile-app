import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Button,
  StatusBar,
} from 'react-native';
import google from '../../assets/google.png';
import styles from './signin.style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const validationSchema = Yup.object().shape({
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
  email: Yup.string()
    .email('please enter correct email')
    .required('please enter your email'),
});

const SignIp = ({navigation}) => {
 

  const API_URL = 'http://192.168.43.54:3000/signIn';
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setAlertText] = useState('please wait...');
  const [showProgress, setShowProgress] = useState(false);
  const [showCancelButton, setshowCancelButton] = useState(false);
  const [err, setErr] = useState(false);
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
            email : user.email,
            password : user.id,
       }
      handleSubmition(val)
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmition = values => {
    setErr(false);
    setAlertText('please wait');
    setshowCancelButton(false);
    setShowAlert(true);
    setShowProgress(true);
    if (values.email || values.password) {
      signIn(values);
    } else {
      return;
    }
  };

  const signIn = async val => {
    try {
      const response = await axios.post(API_URL, val);
      if (response.data.id) {
        const store = storeData(response.data);
        if (store) {
          setAlertText('please wait...');
          setshowCancelButton(false);
          setShowAlert(false);
          setShowProgress(false);
          navigation.navigate('Home');
        }
      } else {
        setErr(true);
        setShowProgress(false);
        setAlertText('something wrong please try again');
        setshowCancelButton(true);
        setStyle({ width: 200, height: 120 })
      }
    } catch (error) {
      setShowProgress(false);
      setAlertText('something wrong please try again');
      setStyle({ width: 200, height: 120 })
      setshowCancelButton(true);
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
        barStyle="dark-content" // Adjust for light content if needed
        translucent={true}
      />
      <ScrollView contentContainerStyle={styles.containerView}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.backText}>Back !</Text>
          <Text style={styles.explainText}>
            Log in to access your account history and get updated
             In real time.
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
                <View style={styles.inputContainer}>
                  <TextInput
                    name="email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.inputText}
                    placeholder="Enter your email"
                    value={values.email}
                  />
                </View>
                {errors.email ? (
                  <Text style={styles.errorTextmessage}>{errors.email}</Text>
                ) : null}
                <View style={styles.inputContainer}>
                  <TextInput
                    nativID="password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder="Enter your password ."
                    secureTextEntry={true}
                    value={values.password}
                    style={styles.inputText}
                  />
                </View>
                {errors.password ? (
                  <Text style={styles.errorTextmessage}>{errors.password}</Text>
                ) : null}
                <View>
                  <Text style={styles.forgotText}></Text>
                </View>
                {err ? (
                  <View>
                    <Text style={styles.forgotText}>
                      Please check that the information is correct. Password or email is wrong.
                    </Text>
                  </View>
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
                  contentContainerStyle={style}
                />

                <TouchableOpacity
                  style={styles.btnLoginContainer}
                  onPress={handleSubmit}>
                  <Text style={styles.loginText}>Log in</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.orText}>
            <Text>----------------- OR -----------------</Text>
          </View>
          <TouchableOpacity style={styles.btnGoogle} onPress={() => onGoogleButtonPress()} >
            <Image source={google} style={styles.googleLogo} />
            <Text style={styles.googleText}>continue with google</Text>
          </TouchableOpacity>
          <View style={styles.createAccount}>
           
            <Text style={{ marginLeft: 7 }}>You don't have an account ? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.createAcountText}>create new account</Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIp;