import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './src/components/MyDrawer'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}