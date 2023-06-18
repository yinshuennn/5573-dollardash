import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import group from '../assets/icons/group.png';
import bill from '../assets/icons/bill.png';
import budget from '../assets/icons/budget.png';
import { Pressable } from 'react-native';
import { firebase } from '../firebase';

const AllExpenses = () => {

  const navigation = useNavigation()

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleAddExpense = () => {
    navigation.navigate('AddNewExpense');
  }

  const handleGroups = () => {
    navigation.navigate('Groups');
  }

  const handleBills = () => {
    navigation.navigate('Groups');
  }

  const handleBudget = () => {
    navigation.navigate('Groups');
  }

  const handleTransactionHistory = () => {
    navigation.navigate('AllExpenses');
  }

  function renderHeader() {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: "center",
                marginBottom: 10,
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

            <Text style={{ marginTop: 25, marginLeft: 120, color: 'black', fontSize: 16 }}>History</Text>
        </TouchableOpacity>
    )
  }

  function renderTransactionHistory() {
    const [users, setUsers] = useState([]);
    const expensesRef = firebase.firestore().collection('Expenses');

    useEffect(async () => {
      expensesRef
      .orderBy('createdAt', 'desc')
      .limit(3)
      .onSnapshot(
        querySnapshot => {
          const users = []
          querySnapshot.forEach((doc) => {
            const{ description, price, category } = doc.data()
            users.push({
              id: doc.id,
              description,
              price,
              category,
            })
          })
          setUsers(users)
        }
      )
    }, [])

    return (
      <ScrollView style={{ flex:1, marginBottom: 10 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            marginTop: 10,
          }}
          onPress={handleTransactionHistory}
        >
        </TouchableOpacity>
          
        <FlatList
          style={{height:'60%'}}
          data={users}
          numColumns={1}
          renderItem={({item}) => (
            <Pressable
              style={styles.container}>
                <View style={styles.contentContainer}>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <Text style={styles.price}>${item.price}</Text>
            </Pressable>
          )}
        />
      </ScrollView>
    )
  }

    function bottomPanel() {
      return (
        <View style={{ marginTop: 375, flexDirection: 'row', justifyContent: 'space-around' }}>
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
                width: 30,
                height: 30,
                tintColor: '#A7A7A7',
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
          onPress={handleTransactionHistory}
        >
            <Image
              source={require('../assets/images/transaction.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: '#646B73',
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
                width: 55,
                height: 55,
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
          onPress={handleGroups}
        >
            <Image
              source={require('../assets/images/groups.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
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
                width: 30,
                height: 30,
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
          {renderTransactionHistory()}
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
      backgroundColor:'#e5e5e5',
      padding: 15,
      borderRadius: 10,
      margin: 5,
      marginHorizontal: 25,
    },
    innerContainer: {
      alignItems:'center',
      flexDirection:'column', 
    },
    category: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      marginLeft: 5,
    },
    description: {
      fontSize: 14,
      marginTop: 8,
      alignSelf: 'flex-start',
      marginLeft: 5,
    },
    price: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'flex-end',
      marginTop: 8,
    },
    contentContainer: {
      flex: 1,
      marginRight: 16,
    },
  });

export default AllExpenses;