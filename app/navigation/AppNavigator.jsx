import React, { createContext, useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/welcome/Welcome';
import SignIn from "../screens/signin/SignIn";
import SignUp from "../screens/signup/SignUp";
import Tabnavigator from './Tabnavigator';
import Water from '../screens/pages/water/Water';
import Symptoms from '../screens/pages/symptoms/Symptoms';
import Activity from '../screens/pages/activity/Activity';
import Uniration from '../screens/pages/uniration/Uniration';
import Mood from '../screens/pages/mood/Mood';
import Food from '../screens/pages/food/Food';
import Meds from '../screens/pages/Meds/Meds';
import LogSymptoms from '../screens/log/LogSymptoms';
import SplashScreen from '../screens/splashscreen/SplashScreen';
import { Context } from "../hooks/Context";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  
  const [isLogin, setIsLogin] = useState(true);
  const [checkStatus, setCheckStatus] = useState(false);
  const [userData, setUserData] = useState('');  
  const [cklickStart, setClickStart] = useState(false);
  const [dataSamptoms, setDataSamptoms] = useState([
    {id:1,title: 'Anxiety',isChecked:false,date:"",time:""},
    {id:2,title: 'Difficulty falling asleep', isChecked: false,date:"",time:""},
    { id: 3, title:'Dry Cough', isChecked: false,date:"",time:""},
    {id:4,title: 'Fating',isChecked:false,date:"",time:""},
    {id:5,title: 'Fever', isChecked: false,date:"",time:""},
    {id: 6, title: 'Headache', isChecked: false,date:"",time:""},
    {id:7,title: 'Heartburn',isChecked:false,date:"",time:""},
    {id:8,title: 'Itching Skin', isChecked: false,date:"",time:""},
    {id: 9, title: 'Muscle pain', isChecked: false,date:"",time:""},
    {id:10,title: 'Nausea',isChecked:false,date:"",time:""},
    {id:11,title: 'Post nasak drip', isChecked: false,date:"",time:""},
    {id: 12, title: 'Runny Nose', isChecked: false,date:"",time:""},
    {id:13,title: 'Sore throat',isChecked:false,date:"",time:""},
    {id:14,title: 'Acne', isChecked: false,date:"",time:""},
    {id:15,title: 'Acne on back', isChecked: false,date:"",time:""},
  ]);

  const [medsList, setMedsList] = useState([]);

   useEffect(() => {
    const checkLoginStatus = async () => {
      setCheckStatus(true);
      setTimeout(() => {
      setCheckStatus(false);
      setIsLogin(true)
      },500)
      // try {
      //   const token = await AsyncStorage.getItem('userInfo');
      //   const jsonInfo = await JSON.parse(token);
      //   if (jsonInfo === null) {
          
      //     // setIsLoading(false);
      //     // setIsSearching(false);
      //   } else {
      //     // setUserdata(jsonInfo);
      //     // setIsLoading(true);
      //     // setIsSearching(false)
      //   }
      // } catch (error) {
      // } 
    };
    checkLoginStatus();
  }, []);

  if (checkStatus) {
    return <SplashScreen/>
  }

  return (
    <Context.Provider value={{cklickStart,setClickStart,dataSamptoms,setDataSamptoms,medsList,setMedsList}} >
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin ? (<>
          <Stack.Screen component={Tabnavigator} name="Tabnavigator" options={{ title: "", headerShown: false }} />
            <Stack.Screen component={Meds} name="Medicaments"
              options={{
              title: "Select Meds",
              headerBackTitleStyle: { color: "white" },
              headerTintColor:"white",
              headerTitleStyle:{color: "white",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#18A6C5" } 
             }}
            />
            <Stack.Screen component={Water} name="Water"
              options={{
              title: "Log Water",
              headerBackTitleStyle: { color: "white" },
              headerTintColor:"white",
              headerTitleStyle:{color: "white",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#3369e7" } 

             }}
            />
          <Stack.Screen component={Uniration} name="Uniration" />
            <Stack.Screen component={Mood} name="Mood"
              options={{
              title: "Log Mod",
              headerBackTitleStyle: { color: "white" },
              headerTintColor:"white",
              headerTitleStyle:{color: "white",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#a75377" } 

             }}/>
          <Stack.Screen component={Food} name="Food" />
          <Stack.Screen component={Activity} name="Activity" />
          <Stack.Screen component={Symptoms} name="Symptoms"
            options={{
              title: "Select Somptoms",
              headerBackTitleStyle: { color: "white" },
              headerTintColor:"white",
              headerTitleStyle:{color: "white",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#198E52" }
            }}
          />
          <Stack.Screen component={LogSymptoms} name="LogSymptoms"
            options={{
              title: "Log Somptoms",
              headerBackTitleStyle: { color: "white" },
              headerTintColor:"white",
              headerTitleStyle:{color: "white",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#198E52" }
            }}
          />
        </>) : (<>
         <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: '',
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible:false,
          }}
        />
        <Stack.Screen
          name="Signin"
          component={SignIn}
          options={{
            title: '',
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{
            title: '',
            headerBackVisible: false,
            headerShown: false,
          }}
          />
        </>)}
      </Stack.Navigator>
    </NavigationContainer>
  </Context.Provider>
  );
}

export default AppNavigator