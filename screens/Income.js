import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { firebase } from '../firebase';

const Income = () => {
  const todoRef = firebase.firestore().collection('Income');

  const [income, setIncome] = useState('');
  
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const addField = () => {
    if (income && income.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        income: income,
        createdAt: timestamp
      };
      todoRef
        .add(data)
        .then(() => {
          setIncome('');
          Keyboard.dismiss()
        })
        .catch((error) => {
          alert(error);
        });
      navigation.navigate('Budget');
      Alert.alert('Income added!');
    } else {
      Alert.alert('Please input your income!');
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
        <Text style={styles.text}>Add Your Income</Text>
      </TouchableOpacity>
    );
  }

  function renderIncome() {
    return (
      <View style={{ marginTop: 30, marginLeft: 25 }}>
        <Text style={{ color: '#C6C6C6', fontWeight: 'bold', fontSize: 20 }}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="$0"
          placeholderTextColor="white"
          keyboardType="numeric"
          onChangeText={(text) => setIncome(text)}
          value={income}
        />
        
        <TouchableOpacity style={styles.button} onPress={addField}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSkip() {
    return (
      <Text style={ [styles.label, { margin: 10, textAlign: 'center'}] }>
          <Text 
              style={[styles.link, { textDecorationLine: 'underline' }]}
              onPress={handleBack}>
            Skip
            </Text>
          </Text>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {renderHeader()}
          {renderIncome()}
          {renderSkip()}
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
    marginLeft: 83,
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
    backgroundColor: '#EAEAEA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center', 
    borderRadius: 6,
    marginTop: 10,
    marginLeft: -37,
  },
  buttonText: {
    color: '#646B73',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    marginLeft: 0,
    color: 'white',
    textAlign: 'center'
  },
});

export default Income;
