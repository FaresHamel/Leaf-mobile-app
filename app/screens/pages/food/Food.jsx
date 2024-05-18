import React, {useState, useContext,useEffect} from 'react';
import {
  Text,
  View,StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import timer from '../../../assets/clock.png';
import calender from "../../../assets/calender.png";
import { Context } from '../../../hooks/Context';
import { format } from 'date-fns'; 
const Food = ({ navigation }) => {
  
 const listFoodType = [
    { id: 1, title: "Dairy"},
    { id: 2, title: "Fruits" },
    { id: 3, title: "Hight Sodium" },
    { id: 4, title: "Hight Sugar"},
    { id: 5, title: "Processed Heat" },
    { id: 6, title: "Red Meat" },
    { id: 7, title: "Vegetables" },
    { id: 8, title: "Whole Grains" },
    { id: 9, title: "Zero Calorie"}
  ]
  
  const [selectedFoodTypeItem, setSelectedFoodTypeItem] = useState("Dairy");
  const [foodName, setFoodName] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = format(currentDate, 'EEEE,dd MMM'); // Format the date  
  const timee = format(currentDate, 'pp')
  const {dataDisplayMatrix,updateDataItem,userData} = useContext(Context);
  
  
  const changeVlueActivity = (responseJson) => {
    const itemIndex = dataDisplayMatrix.find((childItem) => childItem.title === "Food");
    if (itemIndex) {
     // Modification logic
     itemIndex.value = responseJson.title;
     itemIndex.isChecked = true;
    // setDataDisplayMatrix(itemIndex, dataDisplayMatrix[itemIndex].isChecked=true);
     itemIndex.date = responseJson.date;
     itemIndex.time = responseJson.time;
     // Update the context
    updateDataItem(itemIndex, itemIndex.index); // Pass the modified object and its index
  }
    navigation.navigate("Home")
  }

  const fetchActivity = async () => {
     fetch(`http://192.168.43.54:5000/getFood?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          // console.log(responseJson);
          changeVlueActivity(responseJson);
        }
      })
      .catch(error => {
        console.log(error)
      });
    };
   const sendData = async (newFood) => {
      try {
        const response = await fetch(`http://192.168.43.54:5000/addFood?userId=${userData.iduser}`, {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',  // Specify JSON data format
          },
          body: JSON.stringify(newFood),  // Convert data to JSON string
        });
        const data = await response.json();  // Parse server response if needed
      //console.log('Data sent successfully:', data); // Handle successful response
        fetchActivity();
      } catch (error) {
        console.error('Error sending data:', error);  // Handle errors gracefully
      }
    };  
  
  const changeTextInputFoodName = (text) => {
    setFoodName(text);
  }
  
  const handleAddNewFood = () => {
    if (foodName) {
     const newFood = {
      title: foodName,
      type:selectedFoodTypeItem,
      date: formattedDate,
      time: timee,
    }
    console.log(newFood);
    sendData(newFood);
    }
  }

  return (
    <SafeAreaView  style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView  style={{ flex: 1, backgroundColor: 'white',padding:20}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={{
          flexDirection: "row",
          backgroundColor: "white",
          width: "100%",
          marginTop: 10,
          height: 55,
          alignItems: "center",
          borderRadius: 8,
          paddingLeft: 10,
          paddingRight: 10,
          justifyContent: "space-between",
          borderColor: '#d9dad7',
          borderWidth: 1,
          borderStyle: 'solid'}}>
        <TextInput onChangeText={changeTextInputFoodName}  style={{ fontSize: 18, fontWeight: "400", color: "#364f6b", textTransform: "capitalize" }} placeholder="Enter your Food title here"/>
       </View>
        <View style={{backgroundColor:"white",flexDirection:"row",flexWrap:"wrap"}} >
          {listFoodType.map((item) => (
            <TouchableOpacity
              style={styles.tab(selectedFoodTypeItem, item.title)}
              onPress={()=>setSelectedFoodTypeItem(item.title)}
              >
              <Text style={{color:"#fff"}} >{item.title}</Text>
          </TouchableOpacity>
         ))}
        </View>
        <View style={{ justifyContent: 'space-around', marginTop: 20,backgroundColor:"white"}}>
        <View style={{marginBottom: 10}}>
          <Text style={{color: '#000',fontSize:16,fontWeight:"bold"}}>Date / Time</Text>
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
              paddingRight:10
            }}>
            <Image
              source={timer}
              style={{width: 15, height: 15, tintColor: '#000'}}
            />
             <Text style={{ color: '#000',textTransform:"lowercase"}}>{timee}</Text>
          </View>
        </View>
          <TouchableOpacity
            onPress={() => {handleAddNewFood();}}
            style={{ backgroundColor: "#f47721", width: 120, height: 40, borderRadius: 5, alignItems: "center", justifyContent: "center", alignSelf: "center", marginTop: 30 }}>
          <Text style={{color: '#fff',fontSize:14,fontWeight:"600"}}>ADD</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
     <StatusBar backgroundColor="#f47721" barStyle="light-content"/>
     </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  tab: (selectedFoodTypeItem, item) => ({
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: selectedFoodTypeItem === item ? '#f47721' : '#ED9455',
  }),
});

export default Food
