import React from 'react';
import { StatusBar } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import ProductListScreen from '../screens/ProductListScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
    <>
    <StatusBar
    backgroundColor="#fff" 
    barStyle="dark-content"
  />
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login"
       component={LoginScreen}  
        options={{ headerShown: false }} />
      <Stack.Screen name="ProductList" 
      component={ProductListScreen}  
       options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  </>

);

export default AppNavigator;