import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../firebase';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleBack = () => {
    navigation.navigate('Login');
  };

  const handleForgotPassword = () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    auth.sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Password Reset Email Sent', 'An email has been sent to your email address with instructions to reset your password.');
        navigation.navigate('SendEmail');
    })
      .catch((error) => {
        Alert.alert('Error', 'Failed to send password reset email. Please check your email address and try again.');
    });
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

            <Text style={{ marginTop: 25, marginLeft: 90, color: 'black', fontSize: 16 }}>Forgot Password</Text>
        </TouchableOpacity>
    )
  }

  function renderText() {
    return (
      <View style={{
        marginTop: 30,
        marginHorizontal: 30,
      }}
    >
      <Text style={{ marginTop: 30, fontSize: 25, fontWeight: 'bold'}}>Don't worry.</Text>
      <Text style={{ marginTop: 0, fontSize: 25, fontWeight: 'bold'}}>Enter your email and we'll</Text>
      <Text style={{ marginTop: 0, fontSize: 25, fontWeight: 'bold'}}>send you a link to reset</Text>
      <Text style={{ marginTop: 0, fontSize: 25, fontWeight: 'bold'}}>your password.</Text>
      </View>
    )
  }

  function renderForm() {
    return (
      <View style={{
        marginHorizontal: 30,
      }}
    >
      {/*Email*/}
      <View style={{ marginTop: 30 }}>
        <TextInput
          style={{
            marginVertical: 10,
            borderBottomColor: '#91919F',
            borderBottomWidth: 1,
            height: 40,
            color: '#91919F',
            fontSize: 16
          }}
          placeholder="Email"
          placeholderTextColor='#91919F'
          selectionColor='#91919F'
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </View>
    </View>
    );
  }

  function renderButton() {
    return (
        <View style={{ margin: 40 }}>
            <TouchableOpacity
                style={{
                    height: 60,
                    marginTop: -20,
                    backgroundColor: '#646B73',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={handleForgotPassword}
            >
                <Text style={{ color: '#FCFCFC', fontSize: 16 }}>Continue</Text>
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
        {renderForm()}
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

  label: {
    fontSize: 12,
    marginLeft: 0,  // Add margin between checkbox and label
  },

});

export default ForgotPassword;
