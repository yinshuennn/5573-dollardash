import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/Ionicons';
import BillIcon from 'react-native-vector-icons/FontAwesome5';
import { firebase } from '../firebase';

const Bills = () => {
  const navigation = useNavigation();
  const [bills, setBills] = useState([]);
  const [hasBills, setHasBills] = useState(false);

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handleAdd = () => {
    navigation.navigate('AddNewBill');
  };

  useEffect(() => {
    // Fetch bills from Firestore
    const unsubscribe = firebase
      .firestore()
      .collection('bills')
      .onSnapshot((snapshot) => {
        const billList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBills(billList);
        setHasBills(billList.length > 0);
      });

    return () => unsubscribe();
  }, []);

  const handleDelete = (billId) => {
    // Delete the bill from Firestore
    firebase.firestore().collection('bills').doc(billId).delete();
  };

  function renderHeader() {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
              marginTop: 25,
            }}
          />

          <Text style={{ marginTop: 25, marginLeft: 130, color: 'black', fontSize: 16 }}>Bills</Text>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={handleAdd}
          >
            <Icon
              name="add"
              color="black"
              size={30}
              style={{
              marginTop: 20,
              marginLeft: 135,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }

  function renderText() {
    return (
        <View style={[styles.container]}>
          <Text style={styles.text}>You don't have any Bills.</Text>
          <Text style={styles.text}>Start creating one and</Text>
          <Text style={styles.text}>never worry about deadlines again.</Text>
        </View>
      );
  }

  function renderBillIcons() {
    const BillIcon = ({ bill }) => {
        const handlePress = () => {
          navigation.navigate('BillDetails', { bill });
        };
    
        const deleteBill = () => {
          handleDelete(bill.id);
        };
    
        return (
          <TouchableOpacity style={styles.billIconContainer} onPress={handlePress}>
            <View style={styles.billIcon}>
            </View>
            <View style={styles.billDetailsContainer}>
                <Text style={styles.billName}>{bill.name}</Text>
              <TouchableOpacity onPress={deleteBill} style={styles.deleteButton}>
                <Icon name="trash-outline" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      };
    
      return (
        <FlatList
          data={bills}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BillIcon bill={item} />}
        />
      );
    }

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View>
            {renderHeader()}
            {hasBills ? renderBillIcons() : renderText()}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
};

export default Bills;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    billIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    billIcon: {
        marginTop: 20,
        marginLeft: 25,
        width: 60,
        height: 60,
        borderRadius: 40,
        backgroundColor: '#646B73',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#646B73',
        textAlign: 'center', 
    },
    billDetailsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    billName: {
        flex: 1,
        fontSize: 17,
        marginTop: 20,
        marginLeft: 10,
        color: 'black',
    },
    deleteButton: {
        marginRight: 25,
        marginTop: 20,
    },
})