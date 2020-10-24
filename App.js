import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './src/components/MyDrawer'
import Header from './src/Header'

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <MyDrawer />
    </NavigationContainer>
  );
}