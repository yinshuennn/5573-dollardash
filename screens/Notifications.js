import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';

const NotificationsScreen = () => {

    const navigation = useNavigation()

    const handleBack = () => {
        navigation.navigate('Profile');
    }

    const [toggled1, setToggled1] = React.useState(false);
    const [toggled2, setToggled2] = React.useState(false);
    const [toggled3, setToggled3] = React.useState(false);

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
    
                <Text style={{ marginTop: 25, marginLeft: 104, color: 'black', fontSize: 16 }}>Notifications</Text>
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaProvider>
          <SafeAreaView>
            <ScrollView>
              {renderHeader()}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginLeft: 20, marginTop: 5 }}>
                  <Text style={styles.title}>Expense Alert</Text>
                  <Text style={styles.subtitle}>Get notifications about your expenses</Text>
                </View>
                <Switch
                  style={styles.switch}
                  value={toggled1}
                  onValueChange={setToggled1}
                  trackColor={{ true: '#646B73', false: '#EAEAEA'}}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginLeft: 20 }}>
                  <Text style={styles.title}>Budget Alert</Text>
                  <Text style={styles.subtitle}>Get notifications when you're</Text>
                  <Text>exceeding your budget</Text>
                </View>
                <Switch
                  style={styles.switch}
                  value={toggled2}
                  onValueChange={setToggled2}
                  trackColor={{ true: '#646B73', false: '#EAEAEA'}}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, marginLeft: 20 }}>
                  <Text style={styles.title}>Bill Alert</Text>
                  <Text style={styles.subtitle}>Get notifications when your bill is</Text>
                  <Text>almost due</Text>
                </View>
                <Switch
                  style={styles.switch}
                  value={toggled3}
                  onValueChange={setToggled3}
                  trackColor={{ true: '#646B73', false: '#EAEAEA'}}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 100,
  },
  title: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 5,
  },
  switch: {
    marginTop: 30, 
    marginRight: 20,
  }
});