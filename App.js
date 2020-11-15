import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import NavigationTab from './src/components/NavigationTab'
import Header from './src/Header'
import Home from './src/screens/HomeScreen'
import { View } from 'react-native'

export default function App() {
  return (
    // Finished navigation bar for future profile and setting screens
    // <NavigationContainer>
    //   <Header />
    //   <NavigationTab />
    // </NavigationContainer>
    
    <View>
      <Header />
      <Home />
    </View>
  );
}