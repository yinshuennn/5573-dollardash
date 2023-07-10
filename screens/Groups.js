import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import group from '../assets/icons/group.png';
import bill from '../assets/icons/bill.png';
import budget from '../assets/icons/budget.png';

const Group = () => {

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleAddExpense = () => {
    navigation.navigate('AddNewExpense');
  }

  const navigation = useNavigation()

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

            {/* <Text style={{ marginTop: 25, marginLeft: 120, color: 'blacs */}
        </TouchableOpacity>
    )
  }

    function bottomPanel() {
      return (
        <View style={{ marginTop: 400, flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: "center",
          }}
          onPress={() => console.log("Home")}
        >
            <Image
              source={require('../assets/images/home(main).png')}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: '#646B73',
                marginLeft: 10,
                marginTop: 25,
              }}
            />
            <Text style={{ marginLeft: 10, marginTop: 5 }}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: "center",
          }}
          onPress={() => console.log("Transaction")}
        >
            <Image
              source={require('../assets/images/transaction.png')}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: '#A7A7A7',
                marginLeft:15,
                marginTop: 25,
              }}
            />
            <Text style={{ marginLeft: 10, marginTop: 5 }}>Transaction</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: "center",
          }}
          onPress={handleAddExpense}
        >
            <Image
              source={require('../assets/images/add.png')}
              resizeMode="contain"
              style={{
                width: 60,
                height: 60,
                tintColor: '#646B73',
                marginLeft: 10,
                marginTop: 25,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: "center",
          }}
          onPress={() => console.log("Groups")}
        >
            <Image
              source={require('../assets/images/groups.png')}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: '#A7A7A7',
                marginLeft: 25,
                marginTop: 25,
              }}
            />
            <Text style={{ marginLeft: 20, marginTop: 5 }}>Groups</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: "center",
          }}
          onPress={handleProfile}
        >
            <Image
              source={require('../assets/images/profile.png')}
              resizeMode="contain"
              style={{
                width: 35,
                height: 35,
                tintColor: '#A7A7A7',
                marginLeft: 25,
                marginRight: 10,
                marginTop: 25,
              }}
            />
            <Text style={{ marginLeft: 10, marginTop: 5 }}>Profile</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          {renderHeader()}
          {bottomPanel()}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  first: {
    fontSize: 15,
    marginTop: 50, 
    fontWeight: 'bold',
    fontSize: 25,
  },
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Group;