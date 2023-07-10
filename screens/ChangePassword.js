import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import disableEye from '../assets/icons/disable_eye.png';
import eye from '../assets/icons/eye.png';
import { auth } from '../firebase';

const EditEmail = () => {

    const navigation = useNavigation()

    const handleBack = () => {
        navigation.navigate('Profile');
    }

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const handleSubmit = () => {
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        const user = auth.currentUser;

        user
        .updatePassword(newPassword)
        .then(() => {
            navigation.navigate('Profile')
        })
        .catch(error => {
            if (error.code === 'auth/requires-recent-login') {
                setErrorMessage('Please log in again to change your password.');
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
    
                <Text style={{ marginTop: 25, marginLeft: 85, color: 'black', fontSize: 16 }}>Change Password</Text>
            </TouchableOpacity>
        )
    }

    function renderMenu() {
        return (
            <View style={{margin:20}}>
                
                {/*
                <View style={styles.action}>
                    <TextInput
                        placeholder="Old Password"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? disableEye : eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: '#91919F'
                            }}
                        />
                    </TouchableOpacity>
                </View>
                        */}

                <View style={styles.action}>
                    <TextInput
                        placeholder="New Password"
                        placeholderTextColor="#666666"
                        onChangeText={text => setNewPassword(text)}
                        value={newPassword}
                        style={styles.textInput}
                        secureTextEntry={!showPassword1}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword1(!showPassword1)}
                    >
                        <Image
                            source={showPassword1 ? disableEye : eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: '#91919F'
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.action}>
                    <TextInput
                        placeholder="Confirm New Password"
                        placeholderTextColor="#666666"
                        onChangeText={text => setConfirmNewPassword(text)}
                        value={confirmNewPassword}
                        style={styles.textInput}
                        secureTextEntry={!showPassword2}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword2(!showPassword2)}
                    >
                        <Image
                            source={showPassword2 ? disableEye : eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: '#91919F'
                            }}
                        />
                    </TouchableOpacity>
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