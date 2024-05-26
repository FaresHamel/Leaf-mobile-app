import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Linking,
  TouchableOpacity,
} from 'react-native';
const Records = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          width: '90%',
          height: '90%',
          borderColor: '#d9dad7',
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderWidth: 1,
        }}>
        <View
          style={{backgroundColor: 'white', height: '50%', marginBottom: 20}}>
          <Text style={{fontSize: 16, fontWeight: '700', color: '#000'}}>
            Edicationnal Ressources
          </Text>
          <View style={{padding: 20}}>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.urologyhealth.org/')}
              style={{
                width: '95%',
                padding: 10,
                backgroundColor: 'white',
                marginBottom: 20,
                borderRadius: 7,
                borderColor: '#d9dad7',
                borderWidth: 1,
              }}>
              <Text style={{color: '#000'}}>
                Learn about urologica conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.urologyhealth.org/healthy-living/food-and-recipes',
                )
              }
              style={{
                width: '95%',
                padding: 10,
                backgroundColor: 'white',
                marginBottom: 20,
                borderRadius: 7,
                borderColor: '#d9dad7',
                borderWidth: 1,
              }}>
              <Text style={{color: '#000'}}>Food & Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.lompocvmc.com/blogs/2022/november/5-exercises-that-can-improve-urinary-incontinenc/?fbclid=IwZXh0bgNhZW0CMTAAAR2MzvdEUE_4cewyP3QnpsIsRAggPp5GKz8IdcYX580l20nlik7ytkbOxxQ_aem_AQl5fbzyH4wFRW0AtVMDBs7RFNDU6Chf6VX-7e74r_BFZGoBgknHFgyMRxgW516oN3kDFWh4up4rrfu6XE5bwQ8u',
                )
              }
              style={{
                width: '95%',
                padding: 10,
                backgroundColor: 'white',
                marginBottom: 20,
                borderRadius: 7,
                borderColor: '#d9dad7',
                borderWidth: 1,
              }}>
              <Text style={{color: '#000'}}>Activities and Exercises</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.urologyhealth.org/healthy-living/urologyhealth-extra/magazine-archives/winter-2022/living-healthy-mindfulness-may-improve-your-urologic-health?fbclid=IwZXh0bgNhZW0CMTAAAR2fUU9t3XFezjBylx0Lm8d6qfcSidglTgbqIGiZ6p4sSnRcnUevRFEoQrI_aem_AQkyAakERBLmTSKBy4I5ecVrNjYKgGuqH5ww0SR0U6rxpfA7HOpb92OU-32mq2nbCmexwEybJ_DLXnwPcXF3QatK',
                )
              }
              style={{
                width: '95%',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 7,
                borderColor: '#d9dad7',
                borderWidth: 1,
              }}>
              <Text style={{color: '#000'}}>Stress reducation Techniques</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={{fontSize: 16, fontWeight: '700', color: '#000'}}>
            Community Support
          </Text>
          <View style={{padding: 20}}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.urologyhealth.org/healthy-living/survivor-stories?fbclid=IwZXh0bgNhZW0CMTAAAR2Cqxxf24OIrL2nMvZrHCES6y-RtGEac74NasUIfUogwO1cUka3Y1ap6mc_aem_AQlnNN6v5E4FgWjQBn_y1NCm6SvO4LidNpWRbOrBMZHsgxhJwR0OpS6UUr5ooLT7gpvzEfvFlXG_Cfbb3H81SBr0',
                )
              }
              style={{
                width: '95%',
                padding: 10,
                backgroundColor: 'white',
                marginBottom: 20,
                borderRadius: 7,
                borderColor: '#d9dad7',
                borderWidth: 1,
              }}>
              <Text style={{color: '#000'}}>Survivor Stories</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Records;
