import React,{useState,useContext,useEffect} from 'react'
import { View, Text, SafeAreaView, ScrollView, Image, StatusBar, Pressable,TouchableOpacity } from "react-native";
import smile from "../../../assets/smile.png";
import crying from "../../../assets/crying.png";
import confused from "../../../assets/confused.png"
import happy from "../../../assets/happy.png";
import disappointed from "../../../assets/disappointed.png"
import timer from '../../../assets/clock.png';
import { Context } from '../../../hooks/Context';
import styles from './uniration.style';
import { format } from 'date-fns'; 

const Uniration = ({navigation}) => {
  
    const {dataDisplayMatrix,updateDataItem,userData} = useContext(Context);
    const ListWaterBottle = [
    { image: crying, name: "Clear",backgroundColor:"#cdd5d5"},
    { image: disappointed, name: "Yellow",backgroundColor:"#eab565"},
    { image: confused, name: "Dark Yellow",backgroundColor:"#9b7a01"},
    { image: smile, name: "Orange",backgroundColor:"#aa4f44"},
    { image: happy, name: "Dark Brown",backgroundColor:"#8d8d8d"},
    { image: crying, name: "Pink",backgroundColor:"#d7837f"},
    { image: disappointed, name: "Blue",backgroundColor:"#6ab4e0"},
    { image: confused, name: "Cloudy",backgroundColor:"#ece3e1"},
    ]
  
    const [selectedItem, setSelectedItem] = useState("Clear");
    const [currentDate, setCurrentDate] = useState(new Date());
    const formattedDate = format(currentDate, 'EEEE,dd MMM');  
    const timee = format(currentDate, 'p')
  const [unirationList, setUnirationList] = useState([]);
    const fetchUniration = async () => {
     fetch(`http://192.168.43.54:5000/getUniration?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          changeVlueUniration(responseJson);
        }
      })
      .catch(error => {
        console.log(error)
      });
    };
  
    const sendData = async (newMedicaments) => {
      try {
        const response = await fetch(`http://192.168.43.54:5000/addUniration?userId=${userData.iduser}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',  // Specify JSON data format
          },
          body: JSON.stringify(newMedicaments),  // Convert data to JSON string
        });
        const data = await response.json();  // Parse server response if needed
        fetchUniration();
      } catch (error) {
        console.error('Error sending data:', error);  // Handle errors gracefully
      }
    };  
  
    const handleSubmitt = () => {
    const newUnirationItem = {
      title: selectedItem,
      date : formattedDate,
      time : timee,
    }
    sendData(newUnirationItem); 
    }


  const changeVlueUniration = (responseJson) => { 
  const itemIndex = dataDisplayMatrix.find((childItem) => childItem.title === "Uniration");
  if (itemIndex) {
      // Modification logic
      itemIndex.value = responseJson.title;
      itemIndex.isChecked = true;
      itemIndex.date = responseJson.date;
      itemIndex.time = responseJson.time;
      // Update the context
      updateDataItem(itemIndex, itemIndex.index); // Pass the modified object and its index
  }
    navigation.navigate("Home");
  }

  useEffect(() => {
      // function of fetch last item added by the user
  const fetchWaterList = async () => {
     fetch(`http://192.168.43.54:5000/getUnirationList?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
         console.log(responseJson);
          setUnirationList(responseJson);
        }
      })
      .catch(error => {
        console.log(error)
      });
    }; 
    fetchWaterList();
  });


  return (
     <SafeAreaView style={{flex:1,padding:10,backgroundColor:"white"}} >
      <ScrollView>
         <View style={{width:"100%",flexDirection:"row",justifyContent:"space-around",backgroundColor:"transparent",padding:10,flexWrap:"wrap"}} >
        {ListWaterBottle.map((item, index) => (
        <View key={index}  style={{backgroundColor:"white",width:80,alignItems:"center",marginTop:10}} >
        <Pressable key={index} style={styles.tab(selectedItem,item.name)} onPress={()=>setSelectedItem(item.name)} >
        <View style={{backgroundColor:item.backgroundColor,width:30,height:30,borderRadius:15}} >
        <Text></Text>
        </View>
        </Pressable>
        <View style={{backgroundColor:"transparent",width:100,height:15,justifyContent:"center",alignItems:"center",marginTop:5}} >
          <Text style={styles.tabText(selectedItem,item.name)} >{item.name}</Text>
        </View>
        </View>
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
            justifyContent: 'space-between',
            height: 40,
          }}>
          <View
            style={{
              backgroundColor: '#f5f5f5',
              width: '45%',
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
        }}  style={{backgroundColor:"#FBCD59" ,width:120,height:40,borderRadius:5,alignItems:"center",justifyContent:"center",alignSelf:"center",marginTop: 30}}>
          <Text style={{color: '#000',fontSize:14,fontWeight:"600"}}>ADD</Text>
        </TouchableOpacity>
      </View>
       {unirationList.length>0 ?(
          unirationList.map((item, index) => (
            <View style={{backgroundColor:"#FAFAFA",width:"100%",padding:20,marginTop:10,shadowColor: '#000',
                    marginBottom: 10,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 2}}>
              <Text style={{marginTop:10}}><Text style={{fontWeight:"600",color:"#2D2D2D"}} >Color : </Text>{item.title}</Text>
              <Text style={{marginTop:10}} ><Text style={{fontWeight:"600",color:"#2D2D2D"}} >Day : </Text>{item.date}</Text>
              <Text style={{marginTop:10}} ><Text style={{fontWeight:"600",color:"#2D2D2D"}} >At time : </Text>{item.time}</Text>
             </View>
              ))
        ) : (
              <></>
            )}
     </ScrollView>
      <StatusBar backgroundColor="#FBCD59" barStyle="dark-content" />
    </SafeAreaView>
  )
}

export default Uniration;
