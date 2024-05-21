import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import add from '../../../../assets/add.png';
import timer from '../../../../assets/clock.png';
import calender from '../../../../assets/calender.png';
import {format} from 'date-fns';
import {Context} from '../../../../hooks/Context';
const Genetics = () => {
  
   const listFammilyMumbers = [
    { id: 1, title: "Mother"},
    { id: 2, title: "Father" },
    { id: 3, title: "Sister" },
    { id: 4, title: "Brother"},
    { id: 5, title: "Son" },
    { id: 6, title: "Grand Mother" },
    { id: 7, title: "Grand Father" },
    { id: 8, title: "Onkel" },
    { id: 9, title: "Tante"}
  ]
  const [selectedFamilyMumber,setSelectedFamilyMumber] = useState("Mother")
  const [genetics, setGenetics] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [geneticsList, setGeneticsList] = useState([]);
  const {userData} = useContext(Context);
  const fetchGeneticsList = async () => {
    fetch(`http://192.168.43.54:5000/getGenetics?userId=${userData.iduser}`)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          let arr = responseJson;
          setGeneticsList(arr);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const sendData = async newGenetics => {
    try {
      const response = await fetch(
        `http://192.168.43.54:5000/addGenetics?userId=${userData.iduser}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Specify JSON data format
          },
          body: JSON.stringify(newGenetics), // Convert data to JSON string
        },
      );
      // const data = await response.json(); // Parse server response if needed
      // console.log('Data sent successfully:', data); // Handle successful response
      fetchGeneticsList();
    } catch (error) {
      console.error('Error sending data:', error); // Handle errors gracefully
    }
  };
  const changeTextInputGeneticsName = text => {
    setGenetics(text);
  };
  const handleAddNewGenetics = () => {
    if (genetics) {
      const newGenetics = {
        title: genetics,
        person: selectedFamilyMumber,
      };
      setGenetics('');
      sendData(newGenetics);
    }
  };

  useEffect(() => {
    fetchGeneticsList();
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
            onChangeText={changeTextInputGeneticsName}
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: '#364f6b',
              textTransform: 'capitalize',
            }}
            value={genetics}
            placeholder="Covid-19,conser...."
          />
        </View>
        <View style={{backgroundColor:"white",flexDirection:"row",flexWrap:"wrap",marginTop:20}} >
          {listFammilyMumbers.map((item) => (
            <TouchableOpacity
              style={styles.tab(selectedFamilyMumber, item.title)}
               onPress={()=>setSelectedFamilyMumber(item.title)}
              >
              <Text style={{color:"#fff"}} >{item.title}</Text>
          </TouchableOpacity>
         ))}
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            marginTop: 20,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            onPress={() => {
              handleAddNewGenetics();
            }}
            style={{
              backgroundColor: '#5FCDA4',
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
          {geneticsList.length >0 &&
            geneticsList.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                borderRadius: 7,
                borderColor: '#d9dad7',
                paddingHorizontal: 15,
                paddingVertical:10,
                borderWidth: 1,
                borderStyle: 'solid',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize:16,fontWeight:"600",color:"#5FCDA4"}} >{item.title}</Text>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingRight: 3,
                  }}>
                  <Text style={{color: '#000', textTransform: 'lowercase'}}>
                    {item.person}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#5FCDA4" barStyle="light-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tab: (selectedFoodTypeItem, item) => ({
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: selectedFoodTypeItem === item ? '#5FCDA4' : '#92C7CF',
  }),
});

export default Genetics;
