import React,{useState,useContext,useEffect} from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, StatusBar, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import Glass from "../../../assets/GlassWater.png";
import MediemeBottle from "../../../assets/BottleMedieme.png";
import BigBottleWater from "../../../assets/bigBottle.png";
import timer from '../../../assets/clock.png';
import { format } from 'date-fns'; 
import { Context } from '../../../hooks/Context';

const Water = ({ navigation }) => {  
 
  const ListWaterBottle = [{ image: Glass, name: "Glass", size: "8 oz" }, { image: MediemeBottle, name: "Bottle", size: "16 oz" }, { image: BigBottleWater, name: "Big Bottle", size: "24 oz" }]
  const {dataDisplayMatrix,updateDataItem,userData} = useContext(Context);
  const [selectedItem, setSelectedItem] = useState("Glass");
  const [currentDate, setCurrentDate] = useState(new Date());
  const formattedDate = format(currentDate, 'EEEE,dd MMM');  
  const timee = format(currentDate, 'pppp')

  // function of fetch last item added by the user
  const fetchWater = async () => {
     fetch(`http://192.168.43.54:5000/getWater?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
         // console.log(responseJson);
          changeVlueWater(responseJson);
        }
      })
      .catch(error => {
        console.log(error)
      });
    };
   // Function of sending data
    const sendData = async (newWaterItem) => {
      try {
        const response = await fetch(`http://192.168.43.54:5000/addWater?userId=${userData.iduser}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  // Specify JSON data format
          },
          body: JSON.stringify(newWaterItem),  // Convert data to JSON string
        });
        const data = await response.json();  // Parse server response if needed
       // console.log('Data sent successfully:', data); // Handle successful response
        fetchWater();
      } catch (error) {
        console.error('Error sending data:', error);  // Handle errors gracefully
      }
    };  
  //change the value of water in Display List in Home page
  const changeVlueWater = (responseJson) => {
    const itemIndex = dataDisplayMatrix.find((childItem) => childItem.title === "Water");
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

  //function to add the item
  const handleSubmitt = () => {
    const itemData = ListWaterBottle.filter((item) => item.name === selectedItem);
    const newWaterItem = {
      title: itemData[0].name,
      size: itemData[0].size,
      date: formattedDate,
      time : timee,
    }
     sendData(newWaterItem); 
  }

  return (
    <SafeAreaView style={{flex:1,padding:10,backgroundColor:"white"}} >
      <View style={{width:"100%",flexDirection:"row",justifyContent:"space-around",backgroundColor:"transparent",padding:10}} >
        {ListWaterBottle.map((item, index) => (
        <Pressable key={index} style={styles.tab(selectedItem,item.name)} onPress={()=>setSelectedItem(item.name)} >
         <View style={{backgroundColor:"#e2f3f5",width:60,height:70,alignItems:"center",justifyContent:"center",borderRadius:7}} >
           <Image source={item.image} style={styles.tabImage(selectedItem,item.name)} />
        </View>
        <View style={{backgroundColor:"transparent",width:60,justifyContent:"center",alignItems:"center",marginTop:5}} >
              <Text style={styles.tabText(selectedItem,item.name)} >{item.name}</Text>
              <Text style={styles.tabText(selectedItem,item.name)}  >{item.size}</Text>
        </View>
       </Pressable>
       ))}
      </View>
      <View style={{justifyContent: 'space-around',marginTop:20}}>
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
            <Image source={timer} style={{width: 15, height: 15}} />
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
        <TouchableOpacity onPress={() => {
          handleSubmitt();
          navigation.navigate("Home")
        }}  style={{backgroundColor:"#3369e7" ,width:120,height:40,borderRadius:5,alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop: 30}}>
          <Text style={{color: '#fff',fontSize:14,fontWeight:"600"}}>ADD</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor="#3369e7" barStyle="light-content" />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  tab: (activeJobType,item) => ({
    borderColor: activeJobType === item ? '#88bef5' : '#fff',
    borderWidth:  activeJobType === item ? 2 : 0,
    width: 90,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#88bef5",
    borderRadius: 10,
    backgroundColor:activeJobType === item ? "#e2f3f5":"#fff"
  }),
    tabText: (activeJobType, item) => ({
    // fontFamily: FONT.medium,
      color: activeJobType === item ? '#3369e7' : '#000',
       fontSize: 13
  }),
    tabImage: (activeJobType, item) => ({
    // fontFamily: FONT.medium,
    width:40,height:40,  
    tintColor: activeJobType === item ? '#3369e7' : '#88bef5',
  }),
})
export default Water
