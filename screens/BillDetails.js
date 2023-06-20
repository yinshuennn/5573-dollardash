import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

const BillDetailsScreen = ({ route }) => {
    const { bill } = route.params;

    const navigation = useNavigation()

    const handleBack = () => {
        navigation.navigate('Bills');
    }

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

                    <Text style={{ marginTop: 25, marginLeft: 115, color: 'black', fontSize: 16 }}>Bill Details</Text>
                </TouchableOpacity>
            </View> 
        )
    }

    function renderMenu() {
        return (
            <View style={styles.container}>
              <Text style={styles.text}>Name: {bill.name}</Text>
              <Text style={styles.text}>Repeat Option: {bill.repeatOption}</Text>
            </View>
          );
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
};

export default BillDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 25,
    },
    text: {
        color: 'black',
        fontSize: 15,
        marginTop: 40,
    },
})