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
import Vaccination from '../screens/pages/profileComponents/vaccination/Vaccination';
import Allergies from '../screens/pages/profileComponents/allergies/Allergies';
import CareProvider from '../screens/pages/profileComponents/careProvider/CareProvider';
import Condition from '../screens/pages/profileComponents/ConditionInjuction/Condition';
import Genetics from '../screens/pages/profileComponents/genetics/Genetics';
import { Context } from "../hooks/Context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import body from '../assets/body.png';
import bool from '../assets/bool.png';
import mood from '../assets/mood.png';
import food from '../assets/food.png';
import water from '../assets/water.png';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  
  const [isLogin, setIsLogin] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);
  const [userData, setUserData] = useState({});  
  const [cklickStart, setClickStart] = useState(false);
  const [medsList, setMedsList] = useState([]);
  
  const [dataSamptoms, setDataSamptoms] = useState([
    {refe:1,title: 'Anxiety',isChecked:false,date:"",time:""},
    {refe:2,title: 'Difficulty falling asleep', isChecked: false,date:"",time:""},
    {refe: 3, title:'Dry Cough', isChecked: false,date:"",time:""},
    {refe:4,title: 'Fating',isChecked:false,date:"",time:""},
    {refe:5,title: 'Fever', isChecked: false,date:"",time:""},
    {refe: 6, title: 'Headache', isChecked: false,date:"",time:""},
    {refe:7,title: 'Heartburn',isChecked:false,date:"",time:""},
    {refe:8,title: 'Itching Skin', isChecked: false,date:"",time:""},
    {refe: 9, title: 'Muscle pain', isChecked: false,date:"",time:""},
    {refe:10,title: 'Nausea',isChecked:false,date:"",time:""},
    {refed:11,title: 'Post nasak drip', isChecked: false,date:"",time:""},
    {refe: 12, title: 'Runny Nose', isChecked: false,date:"",time:""},
    {refe:13,title: 'Sore throat',isChecked:false,date:"",time:""},
    {refe:15,title: 'Acne on back', isChecked: false,date:"",time:""},
  ]);
  const [dataDisplayMatrix,setDataDisplayMatrix] = useState([
   {
    id:1,
    source: body,
    backgroundColor: '#be6a15',
    tintcolor: 'white',
    title: 'Activity',
    link: 'Activity',
    date: "",
    time: "",
    isChecked:false
  },
    {
    id:2,
    source: water,
    backgroundColor: '#3369e7',
    tintcolor: 'white',
    title: 'Water',
    link: 'Water',
    date: "",
    time: "",
    isChecked:false
  },
    {
    id:3,
    source: bool,
    backgroundColor: '#FBCD59',
    tintcolor: 'white',
    title: 'Uniration',
    link: 'Uniration',
    date: "",
    time: "",
    isChecked:false
  },
   {
    id:4,
    title: 'Mood',
    source: mood,
    backgroundColor: '#a75377',
    tintcolor: 'white',
    link: 'Mood',
    date: "",
    time: "",
    isChecked:false
    },
       {
    id:5,
    title: 'Food',
    source: food,
    backgroundColor: '#a75377',
    tintcolor: 'white',
    link: 'Mood',
    date: "",
    time: "",
    isChecked:false
  }
  ]);
  //function to update data Matrix to display in our app that's mean just auppdate the last item add in mEds water uniration to dispaly it in our home screen or other screens
  const updateDataItem = (modifiedObject, index) => {
    setDataDisplayMatrix((prevState) => {
      const updatedList = [...prevState];
      updatedList[index] = modifiedObject;
      return updatedList;
    });
  };

  // update user data state to use them 
  //in holl of our application this mean state app managment
  const updateUserData = (dataObject) => {
    setUserData(prevData => ({ ...prevData, ...dataObject }));
  };

 // function get data from local storage to see that if the user login before or not it's work when the user close the app 
 //and active it agian and this function charge the user data needed to signin
  const getData = async () => {
    try {
      const dannn = await AsyncStorage.getItem('userInfo');
      const userInfo = await JSON.parse(dannn);
      // condition to see if the user login or not if login we go to 
      // the home screen if not we will go to the welcome screen
      if (userInfo.iduser) {
        updateUserData(userInfo);
        setCheckStatus(false);
        setIsLogin(true);
      } else {
        setCheckStatus(false);
        setIsLogin(false)
      }
    } catch (e) {
      // return false;
    }
  };

  // useEffect it's a core function run first before render the screen so it's method run and
  // update the data and all information you need before render UI Screen
   useEffect(() => {
      setCheckStatus(true);
      getData();
  }, []);

  if (checkStatus) {
    return <SplashScreen/>
  }

  return (
    <Context.Provider value={{userData,updateUserData,cklickStart,setClickStart,dataSamptoms,setDataSamptoms,medsList,setMedsList,dataDisplayMatrix,updateDataItem,setIsLogin}} >
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
            <Stack.Screen component={Uniration} name="Uniration"
            
             options={{
              title: "Log Uniration",
              headerBackTitleStyle: { color: "#000" },
              headerTintColor:"#fff",
              headerTitleStyle:{color: "#fff",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#FBCD59" }
            }}/>
            <Stack.Screen component={Mood} name="Mood"
              options={{
              title: "Log Mod",
              headerBackTitleStyle: { color: "white" },
              headerTintColor:"white",
              headerTitleStyle:{color: "white",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#a75377" } 

             }}/>
            <Stack.Screen component={Food} name="Food"
              options={{
              title: "Log Food",
              headerBackTitleStyle: { color: "#000" },
              headerTintColor:"#fff",
              headerTitleStyle:{color: "#fff",fontWeight:"500",fontSize:18},
              headerStyle: { backgroundColor: "#f47721" }
            }}/>
            <Stack.Screen component={Activity} name="Activity"
            //be6a15
             options={{
              title: "Log Activity",
              headerBackTitleStyle: { color: "white" },
              headerTintColor:"white",
              headerTitleStyle:{color: "white",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#be6a15" } 

             }}/>
           <Stack.Screen component={Symptoms} name="Symptoms"
            options={{
              title: "Select Somptoms",
              headerBackTitleStyle: { color: "white" },
              headerTintColor:"white",
              headerTitleStyle:{color: "white",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#198E52" }
            }}/>
           <Stack.Screen component={LogSymptoms} name="LogSymptoms"
            options={{
              title: "Log Somptoms",
              headerBackTitleStyle: { color: "white" },
              headerTintColor:"white",
              headerTitleStyle:{color: "white",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#198E52" }
              }} />
            <Stack.Screen component={Vaccination} name="Vaccination" options={{
              title: "Vaccination",
              headerBackTitleStyle: { color: "#000" },
              headerTintColor:"#fff",
              headerTitleStyle:{color: "#fff",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#F7C566" }
            }} />
            <Stack.Screen component={Allergies} name="Allergies"
            options={{
              title: "Allergies & Intolerances",
              headerBackTitleStyle: { color: "#000" },
              headerTintColor:"#fff",
              headerTitleStyle:{color: "#fff",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#DD5746" }
            }}
            />
            <Stack.Screen component={CareProvider} name="CareProvider"
            options={{
              title: "Care Provider",
              headerBackTitleStyle: { color: "#000" },
              headerTintColor:"#fff",
              headerTitleStyle:{color: "#fff",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#007F73" }
            }}
            />
            <Stack.Screen component={Condition} name="Condition"
            options={{
              title: "Condition & Injuries",
              headerBackTitleStyle: { color: "#000" },
              headerTintColor:"#fff",
              headerTitleStyle:{color: "#fff",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#BE6A15" }
            }}
            />
            <Stack.Screen component={Genetics} name="Genetics"
             options={{
              title: "Genetics",
              headerBackTitleStyle: { color: "#000" },
              headerTintColor:"#fff",
              headerTitleStyle:{color: "#fff",fontWeight:"400",fontSize:18},
              headerStyle: { backgroundColor: "#5FCDA4" }
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