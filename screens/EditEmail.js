import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../firebase';

const EditEmail = () => {

    const navigation = useNavigation()

    const handleBack = () => {
        navigation.navigate('Profile');
    }

    const [newEmail, setNewEmail] = useState('');
    const [confirmNewEmail, setConfirmNewEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        if (newEmail !== confirmNewEmail) {
            setErrorMessage('Emails do not match!');
            return;
        }

        const user = auth.currentUser;

        user
        .updateEmail(newEmail)
        .then(() => {
            navigation.navigate('Profile')
            Alert.alert('Email edited!')
        })
        .catch(error => {
            if (error.code === 'auth/requires-recent-login') {
                setErrorMessage('Please log in again to change your email.');
            } else if (error.code === 'auth/invalid-email') {
                setErrorMessage('Invalid email!')
            } else {
                setErrorMessage(error.message)
            }

        });
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
    
                <Text style={{ marginTop: 25, marginLeft: 135, color: 'black', fontSize: 16 }}>Edit Email</Text>
            </TouchableOpacity>
        )
    }

    function renderMenu() {
        return (
            <View style={{margin:20}}>

                <View style={styles.action}>
                    <TextInput
                        placeholder="New Email"
                        placeholderTextColor="#666666"
                        keyboardType="email-address"
                        onChangeText={text => setNewEmail(text)}
                        value={newEmail}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.action}>
                    <TextInput
                        placeholder="Confirm New Email"
                        placeholderTextColor="#666666"
                        keyboardType="email-address"
                        onChangeText={text => setConfirmNewEmail(text)}
                        value={confirmNewEmail}
                        style={styles.textInput}
                    />
                </View>

                {errorMessage ? (
                    <Text style={{ color: 'red' }}>{errorMessage}</Text>
                ) : null}

                <TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
                    <Text style={styles.panelButtonTitle}>Submit</Text>
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

export default EditEmail;

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
        borderBottomWidth: 2,
        borderBottomColor: '#EAEAEA',
        paddingBottom: 10,
      },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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