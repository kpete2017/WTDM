import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ProfileScreen from '../screens/ProfileScreen'


const Tab = createBottomTabNavigator();
  
export default function MyDrawer() {
    return (
      <Tab.Navigator

        style={styles.tab}
        tabBarOptions = {{
          style: {
            backgroundColor: '#23232e',
            borderColor: '#23232e',
            borderTopWidth: 0
          },
          activeTintColor: '#df49a6'
        }}
      >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>

  );
}

const styles = StyleSheet.create({
  tab: {
    width: '100%',
    margin: 0,
    borderColor: '#23232e'
  },
  text: {
    color: '#FFFFFF'
  }
})