import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';
import logo from '../assets/images/Logo.png';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import { auth, db } from '../firebase';

const Profile = () => {

    const [image, setImage] = useState(logo);

    const navigation = useNavigation()

    const handleLogout = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    };

    const handleHome = () => {
        navigation.navigate('Home');
    };

    const handleEditEmail = () => {
        navigation.navigate('EditEmail');
    }

    const handleChangePassword = () => {
        navigation.navigate('ChangePassword');
    }

    const handleNotifications = () => {
        navigation.navigate('Notifications');
    }

    const handleAddExpense = () => {
        navigation.navigate('AddNewExpense');
    }

    const handleBudget = () => {
        navigation.navigate('AllBudgets');
    }
    
    const userName = '';
    const userId = auth.currentUser?.uid;
    if (userId) {
    db.collection('users').doc(userId).get()
        .then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            userName = userData.name;
            console.log('User name retrieved:', userName);
            // Use the user's name in your application logic
        } else {
            console.log('User document not found');
        }
        })
        .catch((error) => {
        console.error('Error retrieving user name from Firestore:', error);
        });
    } else {
    console.log('User ID not available');
    }

    /*
    renderPictureInner = () => (
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
          </View>
          <TouchableOpacity 
            style={[styles.panelButton, { marginTop: -10, marginVertical: 5}]} 
            onPress={() => {}}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.panelButton, { marginVertical: 5}]} 
            onPress={() => {}}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.panelButton, { marginVertical: 5}]}
            onPress={() => this.bs2.current.snapTo(1)}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
      */

    renderLogoutInner = () => (
        <View style={styles.panel}>
            <View style={{alignItems: 'center'}}>
                <Text style={styles.panelTitle}>Logout</Text>
                <Text style={styles.panelSubtitle}>Are you sure you want to Logout?</Text>
            </View>
            <TouchableOpacity 
                style={[styles.panelButton, { marginVertical: 15}]} 
                onPress={handleLogout}>
                <Text style={styles.panelButtonTitle}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.panelButton, { marginVertical: 15}]} 
                onPress={() => this.bs1.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>No</Text>
            </TouchableOpacity>
        </View>
    );

    renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
    );

    bs1 = React.createRef();
    bs2 = React.createRef();
    fall = new Animated.Value(1);
    
    return (
        <SafeAreaProvider>
          <SafeAreaView>
            <ScrollView>

            {/* Logout Bottom Sheet*/}
            <BottomSheet
                ref={this.bs1}
                snapPoints={[330, 0]}
                renderContent={this.renderLogoutInner}
                renderHeader={this.renderHeader}
                initialSnap={1}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
            />

            {/* Change Picture Bottom Sheet */}
            {/*
            <BottomSheet
                ref={this.bs2}
                snapPoints={[330, 0]}
                renderContent={this.renderPictureInner}
                renderHeader={this.renderHeader}
                initialSnap={1}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
    /> */}

                {/* user info */}
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ImageBackground
                                source={require('../assets/images/Logo.png')}
                                style={{
                                    height: 100, 
                                    width: 100,
                                    marginTop: 20,
                                }}
                                imageStyle={{borderRadius: 15}}
                            >
                                {/*
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Icon 
                                        name="camera" 
                                        size={35}   
                                        color='#fff' 
                                        style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10,
                                        }} 
                                    />
                                    </View> */}
                            </ImageBackground>
                            </View>
                        </TouchableOpacity>

                        <View style={{marginTop: 50, marginLeft: 20}}>
                            <Text style={styles.emailText}>{auth.currentUser?.email}</Text>
                        </View>
                    </View>

                    {/* menu */}
                    <TouchableOpacity onPress={handleEditEmail}>
                        <View style={styles.menuItem}>
                            <Icon name="mail" color="#646B73" size={30}/>
                            <Text style={styles.menuItemText}>Edit email</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleChangePassword}>
                        <View style={styles.menuItem}>
                            <Icon name="lock1" color="#646B73" size={30}/>
                            <Text style={styles.menuItemText}>Change password</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleNotifications}>
                        <View style={styles.menuItem}>
                            <Icon name="notification" color="#646B73" size={30}/>
                            <Text style={styles.menuItemText}>Notifcations</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.bs1.current.snapTo(0)}>
                        <View style={styles.menuItem}>
                            <Icon name="logout" color="red" size={30}/>
                            <Text style={styles.menuItemText}>Logout</Text>
                        </View>
                    </TouchableOpacity>

                    {/* bottom panel */}
                    <View style={{ marginTop: 220, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity
                        style={{
                        marginLeft: -30,
                        flexDirection: 'column',
                        alignItems: "center",
                        }}
                        onPress={handleHome}
                        >
                        <Image
                            source={require('../assets/images/home(main).png')}
                            resizeMode="contain"
                            style={{
                            width: 35,
                            height: 35,
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
                        marginRight: -30,
                        flexDirection: 'column',
                        alignItems: "center",
                        }}
                        onPress={() => console.log("Profile")}
                    >
                        <Image
                            source={require('../assets/images/profile.png')}
                            resizeMode="contain"
                            style={{
                            width: 35,
                            height: 35,
                            tintColor: '#646B73',
                            marginLeft: 25,
                            marginRight: 10,
                            marginTop: 25,
                            }}
                        />
                        <Text style={{ marginLeft: 10, marginTop: 5 }}>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    emailText: {
        marginTop: 10,
        fontSize: 13,
        lineHeight: 14,
        fontWeight: 'bold',
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
        fontWeight: 'bold',
    },
    panelSubtitle: {
        color: 'black',
        height: 35,
        marginTop: 10,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 15,
        backgroundColor: '#646B73',
        alignItems: 'center',
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    bottomSheetInner: {
        backgroundColor: '#fff',
        padding: 16,
        height: 330,
    },
    bottomSheetHeader: {
        backgroundColor: '#fff',
        padding: 16,
        height: 60,
        alignItems: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        marginTop: 15,
        paddingVertical: 20,
        paddingHorizontal: 0,
    },
    menuItemText: {
        color: 'black',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
})

export default Profile;
