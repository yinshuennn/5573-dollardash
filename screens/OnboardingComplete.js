import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';


const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      border: "transparent",
  },
};

const OnboardingComplete = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
    >
      <View>
        <Image
          style={{ width: 250, height: 250 }}
          source={require('../assets/images/OnboardComplete.png')}
        />
        <StatusBar style="auto" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingComplete;