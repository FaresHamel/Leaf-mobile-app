import React,{useContext,useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import Source from '../screens/source/Source';
import Records from '../screens/records/Records';
import menu from '../assets/menuImage.png';
import recodImage from '../assets/recordImage.png';
import account from '../assets/account.png';
import resource from '../assets/resource.png';
import { Context } from '../hooks/Context';
import { date } from 'yup';
const Tab = createBottomTabNavigator();
const Tabnavigator = () => {
 
  // const [userdata, setuserdata] = useState({});
  const { userData } = useContext(Context);
 
  // const getData = async () => {
  //   console.log("we try to get data");
  //   try {
  //     const dannn = await AsyncStorage.getItem('userInfo');
  //     const userInfo = await JSON.parse(dannn);
  //     console.log(userInfo)
  //     setuserdata(userInfo);
  //   } catch (e) {}
  // };
 
  // useEffect(() => {
  //   getData();
  // },[])

  
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        headerTintColor: '#303a52',
        headerLeft: () => (
          <View style={{backgroundColor: 'white', width: 50, paddingLeft: 10}}>
            <Image source={menu} style={{width: 30, height: 30}} />
          </View>
        ),
        headerRight: () => (
          <View
            style={{backgroundColor: 'white', width: 100, paddingRight: 10}}>
            <View
              style={{
                backgroundColor: 'white',
                height: 35,
                borderRadius: 20,
                borderColor: '#303a52',
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={account}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: '#303a52',
                  marginRight: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '400',
                  color: '#303a52',
                }}>
               {userData.name}
              </Text>
            </View>
          </View>
        ),
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = menu;
              color = focused ? '#198E52' : '#83829A';
              size = focused ? 30 : 20;
              return (
                <Image
                  source={iconName}
                  style={{tintColor: color, width: size, height: size}}
                />
              );
            case 'Profile':
              iconName = account;
              color = focused ? '#198E52' : '#83829A';
              size = focused ? 30 : 20;
              return (
                <Image
                  source={iconName}
                  style={{tintColor: color, width: size, height: size}}
                />
              );
            case 'Source': // Add cases for other routes
              iconName = resource;
              color = focused ? '#198E52' : '#83829A';
              size = focused ? 30 : 20;
              return (
                <Image
                  source={iconName}
                  style={{tintColor: color, width: size, height: size}}
                />
              );
            case 'Ressource':
              iconName = recodImage;
              color = focused ? '#198E52' : '#83829A';
              size = focused ? 30 : 20;
              return (
                <Image
                  source={iconName}
                  style={{tintColor: color, width: size, height: size}}
                />
              );
            default:
              return null; // Handle default case if needed
          }
        },
        tabBarActiveTintColor: '#198E52',
        tabBarInactiveTintColor: '#83829A',
        headerShadowVisible: true,
        headerStyle: {
          borderBottomWidth: 0.3, // Add border width and desired color
          borderBottomColor: '#83829A', // Customize border color
        },
      })}>
      <Tab.Screen name="Home" component={Home} />

      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Ressource" component={Records} options={{headerShadowVisible:false}}/>
        <Tab.Screen name="Source" component={Source} options={{title:"Your Profile",headerTitleStyle:{fontSize:15}}} />
    </Tab.Navigator>
  );
};

export default Tabnavigator;
