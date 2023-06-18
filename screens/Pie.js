import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PieChart from 'react-native-pie-chart';
import { firebase } from '../firebase';

const Pie = ({ navigation }) => {
  const handleBack = () => {
    navigation.navigate('Home');
  };

  function renderHeader() {
    return (
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

        {/* <Text style={{ marginTop: 25, marginLeft: 80, color: 'black', fontSize: 16 }}>
          Expenditure Analytics
        </Text> */}
      </TouchableOpacity>
    );
  }

  const TestChart = () => {
    const [expenses, setExpenses] = useState([]);
  
    useEffect(() => {
      const expensesRef = firebase.firestore().collection('Expenses');
  
      expensesRef
        .orderBy('createdAt', 'desc')
        .limit(3)
        .onSnapshot((querySnapshot) => {
          const expensesData = [];
          querySnapshot.forEach((doc) => {
            const { description, price, category } = doc.data();
            expensesData.push({
              id: doc.id,
              description,
              price,
              category,
            });
          });
          setExpenses(expensesData);
        });
  
      return () => expensesRef(); // Cleanup the snapshot listener
    }, []);
  
    const widthAndHeight = 250;
  
    if (expenses.length === 0) {
      return (
        <View style={styles.container}>
          <Text>No expense data available.</Text>
        </View>
      );
    }
  
    const categoryData = expenses.reduce((data, expense) => {
      const { category, price } = expense;
  
      if (data[category]) {
        data[category] += parseFloat(price);
      } else {
        data[category] = parseFloat(price);
      }
  
      return data;
    }, {});
  
    const total = Object.values(categoryData).reduce((sum, value) => sum + value, 0);
  
    const data = Object.entries(categoryData).map(([label, value]) => ({
      label,
      value,
      percentage: ((value / total) * 100).toFixed(2),
    }));
  
    const colors = generateSliceColors(data.length);
  
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Expenditure Analytics</Text>
          <PieChart widthAndHeight={widthAndHeight} series={data.map((item) => item.value)} sliceColor={colors} />
          <View style={styles.legend}>
            {data.map(({ label, percentage }, index) => (
              <View key={label} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: colors[index] }]} />
                <Text style={styles.legendLabel}>
                  {label} ({percentage}%)
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  const generateSliceColors = (numColors) => {
    const colors = [
      '#fd7f6f',
      '#7eb0d5',
      '#b2e061',
      '#bd7ebe',
      '#ffb55a',
      '#ffee65',
      '#beb9db',
      '#fdcce5',
      '#8bd3c7',
    ];

    if (numColors <= colors.length) {
      return colors.slice(0, numColors);
    }

    const generatedColors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = Math.floor((360 / numColors) * i);
      const color = `hsl(${hue}, 100%, 50%)`;
      generatedColors.push(color);
    }

    return generatedColors;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          {renderHeader()}
          <TestChart />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendLabel: {
    fontSize: 14,
  },
});

export default Pie;
