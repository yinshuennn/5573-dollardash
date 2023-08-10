import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SelectedOptionProvider } from './SelectedOptionContext';
import LaunchScreen from './screens/Launch';
import LoginScreen from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import SendEmail from './screens/SendEmail';
import SignUpScreen from './screens/SignUp';
import Income from './screens/IncomeHome';
import Budget from './screens/BudgetHome';
import OnboardingComplete from './screens/OnboardingComplete';
import Home from './screens/Home';
import AddNewExpense from './screens/AddNewExpense';
import Profile from './screens/Profile';
import EditEmail from './screens/EditEmail';
import ChangePassword from './screens/ChangePassword';
import Notifications from './screens/Notifications';
import Groups from './screens/Groups';
import AllExpenses from './screens/AllExpenses';
import AllBudgets from './screens/AllBudgets';
import Incomes from './screens/Incomes';
import Pie from './screens/Pie';
import Bills from './screens/Bills';
import BillDetails from './screens/BillDetails';
import AddNewBill from './screens/AddNewBill'
import RepeatOptions from './screens/RepeatOptions'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SelectedOptionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Launch" component={LaunchScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen options={{ headerShown: false }} name="SendEmail" component={SendEmail} />
          <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Income" component={Income} />
          <Stack.Screen options={{ headerShown: false }} name="Budget" component={Budget} />
          <Stack.Screen options={{ headerShown: false }} name="OnboardingComplete" component={OnboardingComplete} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen options={{ headerShown: false }} name="Pie" component={Pie} />
          <Stack.Screen options={{ headerShown: false }} name="Groups" component={Groups} />
          <Stack.Screen options={{ headerShown: false }} name="AddNewExpense" component={AddNewExpense} />
          <Stack.Screen options={{ headerShown: false }} name="AllExpenses" component={AllExpenses} />
          <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
          <Stack.Screen options={{ headerShown: false }} name="EditEmail" component={EditEmail} />
          <Stack.Screen options={{ headerShown: false }} name="ChangePassword" component={ChangePassword} />
          <Stack.Screen options={{ headerShown: false }} name="Notifications" component={Notifications} />
          <Stack.Screen options={{ headerShown: false }} name="Bills" component={Bills} />
          <Stack.Screen options={{ headerShown: false }} name="BillDetails" component={BillDetails} />
          <Stack.Screen options={{ headerShown: false }} name="AddNewBill" component={AddNewBill} />
          <Stack.Screen options={{ headerShown: false }} name="RepeatOptions" component={RepeatOptions} />
          <Stack.Screen options={{ headerShown: false }} name="Incomes" component={Incomes} />
          <Stack.Screen options={{ headerShown: false }} name="AllBudgets" component={AllBudgets} />
        </Stack.Navigator>
      </NavigationContainer>  
    </SelectedOptionProvider>
  );
}
