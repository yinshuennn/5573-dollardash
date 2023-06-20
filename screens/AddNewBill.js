import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/AntDesign';
import { auth, firebase } from '../firebase';

const AddNewBill = ({ route }) => {

    const navigation = useNavigation()

    const handleBack = () => {
        navigation.navigate('Bills');
    }

    const handleRepeatOptions = () => {
        navigation.navigate('RepeatOptions');
    }

    const [billName, setBillName] = useState('');
    const { selectedOption } = route.params || {};

    const handleDone = () => {
        // Save the data to Firestore
        const userId = auth.currentUser.uid; // Assuming you have authenticated the user
        const billsRef = firebase.firestore().collection('bills');
      
        const newBill = {
          name: billName,
          repeatOption: selectedOption,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
      
        billsRef
          .add(newBill)
          .then((docRef) => {
            console.log('Bill saved to Firestore with ID:', docRef.id);
            // Optionally, you can reset the form values after saving

            navigation.navigate('Bills'); // Navigate to the bills page
          })
          .catch((error) => {
            console.error('Error saving bill to Firestore:', error);
          });
      };

    function renderHeader() {
        return (
            <View>
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
    
                    <Text style={{ marginTop: 25, marginLeft: 100, color: 'black', fontSize: 16 }}>Create New Bill</Text>
                </TouchableOpacity>
            </View> 
        )
    }

    function renderMenu() {
        return (
            <View style={{margin:20}}>

                <View style={[styles.action, { borderBottomWidth: 2 }]}>
                    <TextInput
                        placeholder="Name of Bill"
                        placeholderTextColor="#666666"
                        onChangeText={text => setBillName(text)}
                        value={billName}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.action}>
                    <Text style={styles.textInput}>Repeat</Text>
                    <TouchableOpacity
                        onPress={handleRepeatOptions}
                        style={{ flexDirection: 'row', alignItems: 'center'}}
                    >
                        <Text style={{ marginRight: 10, color: '#646B73' }}>{selectedOption || 'Select an option'}</Text>
                        <Icon 
                                name="right" 
                                color="black" 
                                size={15}
                            />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={styles.commandButton} 
                    onPress={handleDone}
                >
                    <Text style={styles.panelButtonTitle}>Done</Text>
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <SafeAreaProvider>
          <SafeAreaView>
            <ScrollView>
              {renderHeader()}
              {renderMenu()}
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default AddNewBill;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
        borderBottomColor: '#EAEAEA',
        paddingBottom: 10,
      },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: 'black',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#646B73',
        alignItems: 'center',
        marginTop: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});