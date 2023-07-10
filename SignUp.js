import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import disableEye from '../assets/icons/disable_eye.png';
import eye from '../assets/icons/eye.png';

const SignUp = ({ navigation }) => {

  const [showPassword, setShowPassword] = React.useState(false)
  const [agree, setAgree] = React.useState(false);
  
  const handleBack = () => {
    navigation.navigate('Launch');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  
  const handleTandC = () => {
    const url = 'https://docs.google.com/document/d/1Exe9C7DKJF1SQjJcJEZbetjcwKWOQDIFlMkUsRzEGRY/edit?usp=sharing'; 
    Linking.openURL(url);
  };

  const handleGoogleLogin = () => {
    const url = 'https://accounts.google.com/';
    Linking.openURL(url);
  };  

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: "center"
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

        <Text style={{ marginTop: 25, marginLeft: 120, color: 'black', fontSize: 16 }}>Sign Up</Text>
      </TouchableOpacity>
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 30
        }}
      >
        {/* Full Name */}
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
            placeholder="Name"
            placeholderTextColor='#91919F'
            selectionColor='#91919F'
          />
        </View>

        {/* Email */}
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={{
              marginVertical: 10,
              borderBottomColor: '#91919F',
              borderBottomWidth: 1,
              height: 40,
              color: '#91919F',
              fontSize: 16
            }}
            placeholder="Email Address"
            placeholderTextColor='#91919F'
            selectionColor='#91919F'
          />
        </View>

      {/* Password */}
      <View style={{ marginTop: 20 }}>
        <TextInput
            style={{
                marginVertical: 10,
                borderBottomColor: '#91919F',
                borderBottomWidth: 1,
                height: 40,
                color: '#91919F',
                fontSize: 16
            }}
            placeholder="Password"
            placeholderTextColor='#91919F'
            selectionColor='#91919F'
            secureTextEntry={!showPassword}
        />
        <TouchableOpacity
            style={{
                position: 'absolute',
                right: 0,
                bottom: 10,
                height: 30,
                width: 30
            }}
            onPress={() => setShowPassword(!showPassword)}
        >
            <Image
                source={showPassword ? disableEye : eye}
                style={{
                    height: 20,
                    width: 20,
                    tintColor: '#91919F'
                }}
            />
        </TouchableOpacity>
      </View>
    </View>
    );
  }

  function renderBox() {
    return (
      <View style={ { alignItems: 'center', justifyContent: 'flex-start', marginRight: 70, marginLeft: 50 } }>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={agree}
            onPress={() => setAgree(!agree)}
            containerStyle={styles.checkbox}
            checkedColor='black'
          />
  
          <Text style={styles.label}>
          By continuing, you accept our{' '}
            <Text style={[styles.link, { textDecorationLine: 'underline' }]} onPress={handleTandC}>
            Terms of Service and Privacy Policy
            </Text>
            ?
          </Text>
        </View>
      </View>
    );
  }
  
  function renderSignUp() {
    return (
        <View style={ {margin: 10, marginLeft: 30, marginRight: 30} }>
            <TouchableOpacity
                style={{
                    height: 60,
                    backgroundColor: '#646B73',
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => navigation.navigate("Home")}
                /* onPress={() => console.log("Sign Up")} */
            >
                <Text style={{ color: '#FCFCFC', fontSize: 16 }}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={ {margin:15, textAlign: 'center'} }>Or</Text>
        </View>
        
    )
}

function renderGoogle() {
    return (
      <TouchableOpacity onPress={handleGoogleLogin}>
        <View style={{
          alignItems: 'center',
          marginTop: -20,
        }}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../assets/images/google.png')}
          />
          <StatusBar style="auto" />
        </View>
      </TouchableOpacity>
    );
  }

  function renderAccount() {
    return (
      <Text style={ [styles.label, { margin: 10, textAlign: 'center'}] }>
          Already have an account?{' '}
            <Text 
              style={[styles.link, { textDecorationLine: 'underline' }]}
              onPress={handleLogin}>
            Login
            </Text>
            ?
          </Text>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          {renderHeader()}
          {renderForm()}
          {renderBox()}
          {renderSignUp()}
          {renderGoogle()}
          {renderAccount()}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // Align items vertically in the middle
    marginBottom: 20,
  },

  checkbox: {
    alignSelf: 'center',
    marginRight: 8,  // Add margin between checkbox and label
  },

  label: {
    fontSize: 12,
    marginLeft: 0,  // Add margin between checkbox and label
  },

});

export default SignUp;