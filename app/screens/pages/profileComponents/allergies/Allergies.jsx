import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  StyleSheet
} from 'react-native';
import add from '../../../../assets/add.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import timer from '../../../../assets/clock.png';
import calender from '../../../../assets/calender.png';
import {format} from 'date-fns';
import {Context} from '../../../../hooks/Context';
const Allergies = () => {
  const estimated = [{id: 1,name: "Low"},{id: 2, name: "Moderate"},{id: 3,name: "High"},{id: 4,name: "Very High"}];
  const category = [{id:1,name:"Drug"},{id:2,name:"Food"},{id:3,name:"Envirement/Animals"},{id:4,name:"Other"}]
  const [allergy, setAllergy] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = format(currentDate, 'EEEE,dd MMM'); // Format the date
  const timee = format(currentDate, 'pp');
  const [selectedEstimated, setSelectedEstimeted] = useState("Low");
  const [selectedCategory, setSelectedCategory] = useState("Drug");
  const [allergyList, setAllergyList] = useState([]);
  const {userData} = useContext(Context);
  const fetchAllergyList = async () => {
    fetch(`http://192.168.43.54:5000/getAllergy?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          let arr = responseJson;
          setAllergyList(arr);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const sendData = async newAllergy => {
    try {
      const response = await fetch(
        `http://192.168.43.54:5000/addAllergy?userId=${userData.iduser}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify JSON data format
          },
          body: JSON.stringify(newAllergy), // Convert data to JSON string
        },
      );
      const data = await response.json(); // Parse server response if needed
     // console.log('Data sent successfully:', data); // Handle successful response
      fetchAllergyList();
    } catch (error) {
      console.error('Error sending data:', error); // Handle errors gracefully
    }
  };
  const changeTextInpuAllegrytitle = text => {
    setAllergy(text);
  };
  const handleAddNewAllergy = () => {
    if (allergy) {
      const newAllergy = {
        title: allergy,
        date: formattedDate,
        time: timee,
        estimated: selectedEstimated,
        category:selectedCategory
      };
      setAllergy('');
      sendData(newAllergy);
    }
  };
  useEffect(() => {
    fetchAllergyList();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{flex: 1, backgroundColor: 'white', padding: 20}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            width: '100%',
            marginTop: 10,
            height: 55,
            alignItems: 'center',
            borderRadius: 8,
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: 'space-between',
            borderColor: '#d9dad7',
            borderWidth: 1,
            borderStyle: 'solid',
          }}>
          <TextInput
            onChangeText={changeTextInpuAllegrytitle}
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#364f6b',
              textTransform: 'capitalize',
            }}
            value={allergy}
            placeholder="Enter your Allergy title"
          />
        </View>
        <View style={{marginTop:20}}>
          <View>
            <Text style={{fontSize:15,fontWeight:"700",color:"#000"}} >Estimated Servirety</Text>
          </View>
        <View style={{backgroundColor:"white",flexDirection:"row",flexWrap:"wrap",marginTop:10}} >
          {estimated.map((item) => (
            <TouchableOpacity
              style={styles.tab(selectedEstimated, item.name)}
               onPress={()=>setSelectedEstimeted(item.name)}
              >
              <Text style={{color:"#fff"}} >{item.name}</Text>
          </TouchableOpacity>
         ))}
        </View>
        </View>
           <View style={{marginTop:20}}>
          <View>
            <Text style={{fontSize:15,fontWeight:"700",color:"#000"}} >Category</Text>
          </View>
        <View style={{backgroundColor:"white",flexDirection:"row",flexWrap:"wrap",marginTop:10}} >
          {category.map((item) => (
            <TouchableOpacity
              style={styles.tab(selectedCategory, item.name)}
               onPress={()=>setSelectedCategory(item.name)}
              >
              <Text style={{color:"#fff"}} >{item.name}</Text>
          </TouchableOpacity>
         ))}
        </View>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            marginTop: 20,
            backgroundColor: 'white',
          }}>
          <View style={{marginBottom: 10}}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
              Date / Time
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              backgroundColor: '#fff',
              justifyContent: 'flex-start',
              height: 40,
            }}>
            <View
              style={{
                backgroundColor: '#f5f5f5',
                width: '40%',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginRight: 20,
              }}>
              <Image source={calender} style={{width: 15, height: 15}} />
              <Text style={{color: '#000'}}>{formattedDate}</Text>
            </View>
            <View
              style={{
                backgroundColor: '#f5f5f5',
                width: '45%',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingRight: 10,
              }}>
              <Image
                source={timer}
                style={{width: 15, height: 15, tintColor: '#000'}}
              />
              <Text style={{color: '#000', textTransform: 'lowercase'}}>
                {timee}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleAddNewAllergy();
            }}
            style={{
              backgroundColor: '#DD5746',
              width: 120,
              height: 40,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 30,
            }}>
            <Text style={{color: '#fff', fontSize: 14, fontWeight: '600'}}>
              ADD
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white', marginTop: 20}}>
          {allergyList.length>0 &&
            allergyList.map((item, index) => (
            <View
              key={index}
              style={{
                // flexDirection: 'row',
                paddingVertical: 10,
                borderRadius: 7,
                borderColor: '#d9dad7',
                paddingHorizontal: 10,
                paddingVertical:10,
                borderWidth: 1,
                borderStyle: 'solid',
                justifyContent: 'space-between',
                marginTop: 10,
                }}>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:10}} >
                  <Text style={{fontWeight:"700",fontSize:15,color:"#000"}} >{item.title}</Text>
                  <Text style={{fontWeight:"700",fontSize:15,color:"#DD5746"}} >{item.estemated}</Text>
                  <Text style={{fontWeight:"700",fontSize:15,color:"#B4B4B8"}} >{item.category}</Text>
                </View>
              {/* <Text>{item.title}</Text> */}
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    // width: '20%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginRight: 40,
                  }}>
                  <Image
                    source={calender}
                    style={{width: 15, height: 15, marginRight: 10}}
                  />
                  <Text style={{color: '#000'}}>{item.date}</Text>
                </View>
                <View
                  style={{
                    backgroundColor: 'white',
                    // width: '25%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingRight: 3,
                  }}>
                  <Image
                    source={timer}
                    style={{
                      width: 15,
                      height: 15,
                      tintColor: '#000',
                      marginRight: 10,
                    }}
                  />
                  <Text style={{color: '#000', textTransform: 'lowercase'}}>
                    {item.time}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#DD5746" barStyle="light-content" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tab: (selectedFoodTypeItem, item) => ({
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: selectedFoodTypeItem === item ? '#DD5746' : '#B4B4B8',
  }),
});
export default Allergies;






