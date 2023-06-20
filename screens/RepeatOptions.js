import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/AntDesign';
import { SelectedOptionContext } from '../SelectedOptionContext';
import { auth } from '../firebase';

const RepeatOptions = () => {
  const navigation = useNavigation();
  const { selectedOption, updateSelectedOption } = useContext(SelectedOptionContext);

  const handleBack = () => {
    navigation.navigate('AddNewBill');
  };

  const handleOptionSelection = (option) => {
    updateSelectedOption(option);
  };

  /*
  const handleOptionSelection = (option) => {
    updateSelectedOption(option);

    const userId = auth.currentUser.uid; // Assuming you have authenticated the user
    const selectedOptionRef = firebase.firestore().collection('users').doc(userId);

    selectedOptionRef
        .set({ selectedOption })
        .then(() => {
        console.log('Selected option saved to Firestore');
        })
        .catch((error) => {
        console.error('Error saving selected option to Firestore:', error);
        });
  };
  */

  function renderHeader() {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={handleBack}
        >
          <Image
            source={require('../assets/icons/back.png')}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: 'black',
              marginLeft: 25,
              marginTop: 25,
            }}
          />

          <Text style={{ marginTop: 25, marginLeft: 125, color: 'black', fontSize: 16 }}>Repeat</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderMenu() {
    const options = ['None', 'First day of every month', 'Last day of every month', 'Custom'];

    return (
      <View style={styles.container}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.text, selectedOption === option && styles.selectedText]}
            onPress={() => handleOptionSelection(option)}
          >
            <Text>{option}</Text>
            {selectedOption === option && (
              <Icon
                name="checkcircle"
                size={20}
                color="#646B73"
                style={[styles.checkIcon, { marginTop: -3 }]}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          {renderHeader()}
          {renderMenu()}
          <TouchableOpacity
            style={styles.commandButton}
            onPress={() => navigation.navigate('AddNewBill', { selectedOption })}
            disabled={!selectedOption}
          >
            <Text style={styles.panelButtonTitle}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RepeatOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 25,
  },
  text: {
    color: 'black',
    fontSize: 13,
    marginTop: 40,
  },
  checkIcon: {
    position: 'absolute',
    right: 20,
  },
  commandButton: {
    backgroundColor: '#646B73',
    paddingVertical: 15,
    margin: 20,
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});