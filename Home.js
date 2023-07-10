import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const Welcome = ({ navigation }) => {

  const handleBack = () => {
    navigation.navigate('Login');
  };

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

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          {renderHeader()}
          {renderText()}
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