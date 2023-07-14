import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { Pressable } from 'react-native';
import { firebase, auth } from '../firebase';
import { set } from 'react-native-reanimated';

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

  const handleBills = () => {
    navigation.navigate('Groups');
  }

  const handleEditIncome = () => {
    navigation.navigate('IncomeHome');
  }

  const handleTransactionHistory = () => {
    navigation.navigate('AllExpenses');
  }

  const handleBudget = () => {
    navigation.navigate('AllBudgets');
  }

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          justifyContent: 'center',
        }}
      >
        <Text style={{ marginTop: 25, color: 'black', fontSize: 16, fontWeight: 'bold' }}>
          Income
        </Text>
      </TouchableOpacity>
    );
  }
  

  function renderIncome() {
    const [incomes, setIncome] = useState([]);
    const incomeRef = firebase.firestore().collection('Income');
    const currentUser = auth.currentUser;

    const deleteIncome = (incomeId) => {
      incomeRef
        .doc(incomeId)
        .delete()
        .then(() => {
          console.log('Income deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting Income: ', error);
        });
    };
  
    useEffect(() => {
      if (currentUser) {
        const unsubscribe = incomeRef
          .where('userId', '==', currentUser.uid)
          .orderBy('createdAt', 'desc')
          .onSnapshot((querySnapshot) => {
            const incomes = [];
            querySnapshot.forEach((doc) => {
              const { income } = doc.data();
              incomes.push({
                id: doc.id,
                income,
              });
            });
            setIncome(incomes);
          });
  
        return () => unsubscribe();
      }
    }, [currentUser]);
  
    return (
      <ScrollView style={{ flex: 1 }}>
        {/* Conditional rendering based on income */}
        {incomes.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginTop: 20, fontSize: 12, color: 'grey' }}>
              You have not added your income!
            </Text>
          </View>
        ) : (
          <FlatList
          style={{ height: '30%' }}
          data={incomes}
          numColumns={1}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.contentContainer}>
                <Text style={styles.category}>Income</Text>
              </View>
              <Text style={styles.price}>${item.income}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteIncome(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </ScrollView>
    );
  }

  function renderEditIncomeButton() {
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
                onPress={handleEditIncome}
            >
                <Text style={{ color: '#FCFCFC', fontSize: 16 }}>Update Income</Text>
            </TouchableOpacity>
        </View>
    )
  } 

  function BottomPanel() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity
        style={{
          flexDirection: 'column',
          alignItems: "center",
        }}
        onPress={handleBack}
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
        onPress={handleBudget}
      >
          <Image
            source={require('../assets/icons/budget.png')}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: '#A7A7A7',
              marginLeft: 25,
              marginTop: 25,
            }}
          />
          <Text style={{ marginLeft: 20, marginTop: 5 }}>Budget</Text>
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
      <SafeAreaView style={{ flex: 1 }}>
        {renderHeader()}
        <ScrollView style={{ flex: 1 }}>
          {renderIncome()}
          {renderEditIncomeButton()}
        </ScrollView>
        <BottomPanel />
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