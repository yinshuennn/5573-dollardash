import React from "react";
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const SendEmail = ({ navigation }) => {

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  function renderImage() {
    return (
        <View style={ styles.image }>
            <Image
                source={require('../assets/icons/mail-send.png')}
                resizeMode="contain"
                style={{
                    width: 250,
                    height: 250,
                    tintColor: '#646b73',
                }}
            />
        </View>
    )
  }

  function renderText() {
    return (
      <View>
      <Text style={styles.mainText} >Your email is on the way</Text>
      <Text style={ [styles.subText, { marginTop: 15 }] }>Check your email and follow the instructions</Text>
      <Text style={styles.subText}>to reset your password</Text>
      </View>
    )
  }

  function renderButton() {
    return (
        <View style={{ margin: 40, marginTop: 275 }}>
            <TouchableOpacity
                style={{
                    height: 60,
                    backgroundColor: '#646B73',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={handleLogin}
            >
                <Text style={{ color: '#FCFCFC', fontSize: 16 }}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    )
  } 

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
        {renderImage()}
        {renderText()}
        {renderButton()}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainText: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    textAlign: 'center'
  },
});

export default SendEmail;