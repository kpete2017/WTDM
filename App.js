import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavigationTab from './src/components/NavigationTab'
import Header from './src/Header'

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <NavigationTab />
    </NavigationContainer>
  );
}