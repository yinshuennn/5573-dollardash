import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { Pressable } from 'react-native';
import { firebase, auth } from '../firebase';

const AllBudgets = () => {

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

  const handleBudget = () => {
    navigation.navigate('Groups');
  }

  const handleAddBudget = () => {
    navigation.navigate('BudgetHome');
  }

  const handleTransactionHistory = () => {
    navigation.navigate('AllExpenses');
  }

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
          justifyContent: 'center', // Corrected "centre" to "center"
        }}
      >
        <Text style={{ marginTop: 25, color: 'black', fontSize: 16, fontWeight: 'bold' }}>
          Budgets
        </Text>
      </TouchableOpacity>
    );
  }
  

  function renderBudgetHistory() {
    const [budgets, setBudgets] = useState([]);
    const budgetsRef = firebase.firestore().collection('Budget');
    const currentUser = auth.currentUser;
  
    const deleteBudget = (budgetId) => {
      budgetsRef
        .doc(budgetId)
        .delete()
        .then(() => {
          console.log('Budget deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting budget: ', error);
        });
    };
  
    useEffect(() => {
      if (currentUser) {
        const unsubscribe = budgetsRef
          .where('userId', '==', currentUser.uid)
          .orderBy('createdAt')
          .onSnapshot((querySnapshot) => {
            const budgets = [];
            querySnapshot.forEach((doc) => {
              const { budget, category } = doc.data();
              budgets.push({
                id: doc.id,
                budget,
                category,
              });
            });
            setBudgets(budgets);
          });
  
        return () => unsubscribe();
      }
    }, [currentUser]);
  
    return (
      <ScrollView style={{ flex: 1 }}>
        {/* Conditional rendering based on budgets */}
        {budgets.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginTop: 20, fontSize: 12, color: 'grey' }}>
              There are no budgets set.
              {'\n'}
              Start budgeting now!
            </Text>
          </View>
        ) : (
          <FlatList
            style={{ height: '30%' }}
            data={budgets}
            numColumns={1}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <View style={styles.contentContainer}>
                  <Text style={styles.description}>{item.category}</Text>
                </View>
                <Text style={styles.price}>${item.budget}</Text>
                <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteBudget(item.id)}
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
  
  function renderAddBudgetButton() {
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
                onPress={handleAddBudget}
            >
                <Text style={{ color: '#FCFCFC', fontSize: 16 }}>Add New Budget</Text>
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
              tintColor: '#646B73',
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
          {renderBudgetHistory()}
          {renderAddBudgetButton()}
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

export default AllBudgets;