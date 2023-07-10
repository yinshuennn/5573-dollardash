import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import income from '../assets/icons/income.png';
import bill from '../assets/icons/bill.png';
import budget from '../assets/icons/budget.png';
import { Pressable } from 'react-native';
import { firebase, auth } from '../firebase';
const Home = () => {

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleAddExpense = () => {
    navigation.navigate('AddNewExpense');
  }

  const handleIncome = () => {
    navigation.navigate('Income');
  }

  const handleBills = () => {
    navigation.navigate('Groups');
  }

  const handleBudget = () => {
    navigation.navigate('AllBudgets');
  }

  const handleTransactionHistory = () => {
    navigation.navigate('AllExpenses');
  }

  const handlePie = () => {
    navigation.navigate('Pie');
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
        </TouchableOpacity>
    )
  }

  const featuresData = [
    {
        id: 1,
        icon: income,
        color: '0D0E0F',
        backgroundColor: '#FEFFBD',
        description: handleIncome,
        description2: 'Income',
    },
    {
        id: 2,
        icon: bill,
        color: '0D0E0F',
        backgroundColor: '#B8CFCE',
        description: handleBills,
        description2: 'Bills',
    },
    {
        id: 3,
        icon: budget,
        color: '0D0E0F',
        backgroundColor: '#EBD3F3',
        description: handleBudget,
        description2: 'Budget',
    },
]

    const [features, setFeatures] = React.useState(featuresData)

    function renderFeatures() {
      const Header = () => (
        <View style={{ marginTop: 30, marginBottom: 16, marginLeft: 25 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>At a glance</Text>
        </View>
      );
    
      const renderItem = ({ item }) => (
        <TouchableOpacity
          style={{ marginBottom: 16, width: 130, alignItems: 'center' }}
          onPress={item.description}
        >
          <View
            style={{
              height: 80,
              width: 90,
              marginBottom: 5,
              borderRadius: 10,
              backgroundColor: item.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                height: 30,
                width: 35,
              }}
            />

            <Text style={{ textAlign: 'center', flexWrap: 'wrap', fontSize: 14, marginTop: 8 }}>{item.description2}</Text>
          </View>
        </TouchableOpacity>
      );
    
      return (
        <View style={{ marginBottom: 0 }}>
          <Header />
          <FlatList
            data={featuresData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    }

    function renderTransactionHistory() {
      const [transactions, setTransactions] = useState([]);
      const expensesRef = firebase.firestore().collection('Expenses');
      const currentUser = auth.currentUser;
    
      useEffect(() => {
        if (currentUser) {
          const unsubscribe = expensesRef
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt', 'desc')
            .limit(3)
            .onSnapshot((querySnapshot) => {
              const transactions = [];
              querySnapshot.forEach((doc) => {
                const { description, price, category } = doc.data();
                transactions.push({
                  id: doc.id,
                  description,
                  price,
                  category,
                });
              });
              setTransactions(transactions);
            });
    
          return () => unsubscribe();
        }
      }, [currentUser]);
    
      return (
        <ScrollView style={{ flex: 1 }}>
          {/* Transaction History header */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              marginTop: 10,
            }}
            onPress={() => navigation.navigate('AllExpenses')}
          >
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>
              Transaction History
            </Text>
            <Text style={{ color: 'grey', marginRight: 15 }}>See more</Text>
          </TouchableOpacity>
    
          {/* Conditional rendering based on transactions */}
          {transactions.length === 0 ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ marginTop: 20, marginBottom: 15, fontSize: 12, color: 'grey' }}>
                There are no past transactions.
                {'\n'}
                Start tracking your expenses!
              </Text>
            </View>
          ) : (
            <FlatList
              style={{ height: '30%' }}
              data={transactions}
              numColumns={1}
              renderItem={({ item }) => (
                <Pressable style={styles.container}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.category}>{item.category}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  <Text style={styles.price}>${item.price}</Text>
                </Pressable>
              )}
            />
          )}
        </ScrollView>
      );
    }
    

    function renderAnalytics() {
      return (
          <View style={{ margin: 20, marginTop: 10, marginBottom: 0 }}>
              <TouchableOpacity
                  style={{
                      height: 60,
                      backgroundColor: '#646B73',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                  onPress={handlePie}
              >
                  <Text style={{ color: '#FCFCFC', fontSize: 16, fontWeight: 'bold' }}>View Analytics</Text>
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
          onPress={() => console.log("Home")}
        >
            <Image
              source={require('../assets/images/home(main).png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
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
          {renderFeatures()}
          {renderTransactionHistory()}
          {renderAnalytics()}
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

export default Home;