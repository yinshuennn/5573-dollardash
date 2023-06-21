import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { SelectList } from 'react-native-dropdown-select-list';
import { firebase } from '../firebase';

const Budget = () => {
  const todoRef = firebase.firestore().collection('Budget');

  const [budget, setBudget] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    {key:'1', value:'Food'},
    {key:'2', value:'Transportation'},
    {key:'3', value:'Entertainment'},
    {key:'5', value:'Shopping'},
    {key:'7', value:'Utilities'},
  ];

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Income');
  };

  const addField = () => {
    if (budget && category && 
      budget.length > 0 && category.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        budget: budget,
        category: category,
        createdAt: timestamp
      };
      todoRef
        .add(data)
        .then(() => {
          setBudget('');
          setCategory('');
          Keyboard.dismiss()
        })
        .catch((error) => {
          alert(error);
        });
      navigation.navigate('OnboardingComplete');
      Alert.alert('Budget added!');
    } else {
      Alert.alert('Please fill in all fields');
    }
  }
  
  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: "center",
        }}
        onPress={handleBack}
      >
        <Image
          source={require('../assets/icons/back.png')}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: 'white',
            marginLeft: 25,
            marginTop: 25
          }}
        />
        <Text style={styles.text}>Set Your Budget</Text>
      </TouchableOpacity>
    );
  }

  function renderAmount() {
    return (
      <View style={{ marginTop: 30, marginLeft: 25 }}>
        <Text style={{ color: '#C6C6C6', fontWeight: 'bold', fontSize: 20 }}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="$0"
          placeholderTextColor="white"
          keyboardType="numeric"
          onChangeText={(text) => setBudget(text)}
          value={budget}
        />

        <SelectList
          setSelected={(category) => setCategory(category)}
          data={categories}
          save="value"
          boxStyles={{ marginLeft: -5, marginRight: 20, backgroundColor: '#EAEAEA' }}
          dropdownStyles={{ marginLeft: 17, marginRight: 17, backgroundColor: '#EAEAEA' }}
          placeholderStyle={styles.buttonText}
          placeholder="Choose a Category"
        />
        
        <TouchableOpacity style={styles.button} onPress={addField}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {renderHeader()}
          {renderAmount()}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#646B73',
  },
  text: {
    marginTop: 25,
    marginLeft: 90,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  text1: {
    // marginTop: 25,
    marginLeft: 0,
    marginBottom: 10,
    color: 'white',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 50,
    fontSize: 65,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 8,
    color: 'white',
  },
  button: {
    // backgroundColor: '#646B73',
    backgroundColor: '#EAEAEA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#646B73',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Budget;
