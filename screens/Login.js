import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import disableEye from '../assets/icons/disable_eye.png';
import eye from '../assets/icons/eye.png';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';

const Login = () => {

  const [showPassword, setShowPassword] = React.useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate('SignUp');
      })
      .catch(error => alert(error.message))
  }

  const handleBack = () => {
    navigation.navigate('Launch');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
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

            <Text style={{ marginTop: 25, marginLeft: 120, color: 'black', fontSize: 16 }}>Login</Text>
        </TouchableOpacity>
    )
  }

  function renderForm() {
    return (
      <View style={{
        marginTop: 30,
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
          value={email}
          onChangeText={text => setEmail(text)}
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
          value={password}
          onChangeText={text => setPassword(text)}
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

  function renderButton() {
    return (
        <View style={{ margin: 40 }}>
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
                <Text style={{ color: '#FCFCFC', fontSize: 16 }}>Login</Text>
            </TouchableOpacity>
        </View>
    )
  } 

  function renderForget() {
    return (
      <View style={{ marginHorizontal: 60, marginTop: -30 }}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: '#EAEAEA',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={handleForgotPassword}
        >
          <Text style={{ color: '#646B73', fontSize: 16, fontWeight: 'bold' }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /*
  function renderSignUp() {
    return (
      <View style={{
        marginHorizontal: 60, 
        marginTop: -20,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => navigation.navigate("Sign Up")}
        >
          <Text style={{ color: '#646B73', fontSize: 16 }}>
            Don't have an account yet?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  */

  function renderSignUp() {
    return (
      <Text style={ [styles.label, { margin: 10, textAlign: 'center'}] }>
          Don't have an account yet?{' '}
            <Text 
              style={[styles.link, { textDecorationLine: 'underline' }]}
              onPress={handleSignUp}>
            SignUp
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
        {renderButton()}
        {renderForget()}
        {renderSignUp()}
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

export default Login;