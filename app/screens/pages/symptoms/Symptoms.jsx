import React, {useState,useEffect,useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Separator} from 'react-native-btr';
import { Context } from '../../../hooks/Context';
import styless from './symptoms.style';
const Symptoms = ({navigation}) => {
  
  const [disabledButton, setDisabledButton] = useState(false);
  const {dataSamptoms} = useContext(Context)  
  const [ListUserSamptoms, setListUserSymptoms] = useState([]); 
  
  const toggle = (iTem) => {
    const itemIndex = dataSamptoms.findIndex((item) => item.refe === iTem.refe);
    const newItemState = !dataSamptoms[itemIndex].isChecked;
    if (newItemState) {
      dataSamptoms[itemIndex].isChecked = true;
      setListUserSymptoms([...ListUserSamptoms, iTem]);
    } else {
      dataSamptoms[itemIndex].isChecked = false;
      setListUserSymptoms(ListUserSamptoms.filter( item => item.refe !== iTem.refe));
    }
  }
  const renderItem = ({item}) => (
    <View style={styles.row}>
      <BouncyCheckbox
          size={25}
          fillColor="#008996"
          unFillColor="#FFFFFF"
          text={item.title}
          iconStyle={{borderColor: '#d9dad7'}}
          innerIconStyle={{borderWidth: 2}}
          textStyle={{fontFamily: 'JosefinSans-Regular'}}
          onPress={() => toggle(item)}
          textStyle={{
            textDecorationLine: "none",
          }}
         isChecked={item.isChecked}
        />
    </View>
  );

  useEffect(() => {
    const disButton = () => {
      if (ListUserSamptoms.length > 0) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
    }
    disButton();
  }, [ListUserSamptoms])
  return (
    <SafeAreaView style={styless.container} >
      <View style={styless.dataFlatListContainer} >
        <FlatList
        data={dataSamptoms}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        ItemSeparatorComponent={() => <Separator />}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        />
      </View>
      {disabledButton ?
       <Pressable style={styless.nextButton} onPress={()=> navigation.navigate("LogSymptoms",{list:ListUserSamptoms})} >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "400", fontFamily: 'JosefinSans-Regular' }} >Next ({ListUserSamptoms.length})</Text>
      </Pressable>:(<></>)}
      <StatusBar barStyle="light-content" backgroundColor="#198E52" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default Symptoms;
