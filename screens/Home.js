import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';

const Welcome = () => {

  const handleBack = () => {
    navigation.navigate('Login');
  };

  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
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
                    tintColor: 'black',
                    marginLeft: 25,
                    marginTop: 25
                }}
            />

            <Text style={{ marginTop: 25, marginLeft: 120, color: 'black', fontSize: 16 }}>Home</Text>
        </TouchableOpacity>
    )
  }

    function renderText() {
        return (
        <View style={styles.container}>
        <Text style={ [styles.first, { textAlign: 'center'}] }>
            Hi, welcome to DollarDash!
        </Text>
        </View>
        );
    }

    function renderSignOut() {
      return (
        <View style={ {margin: 40} }>
          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              height: 60,
              backgroundColor: '#646B73',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={ {color: '#FCFCFC', fontSize: 16} }>Sign out</Text>
          </TouchableOpacity>
        </View>
      )
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          {renderHeader()}
          {renderText()}
          {renderSignOut()}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  first: {
    fontSize: 15,
    marginTop: 50, 
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default Welcome;