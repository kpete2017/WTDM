import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
  
export default function MyDrawer() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'md-home'
            } else if(route.name === 'Profile') {
              iconName = 'md-person'
            } else {
              iconName = 'md-settings'
            }

            return <Ionicons name={iconName} size={size} color="white" />;
          },
        })}
        style={styles.tab}
        tabBarOptions = {{
          style: {
            backgroundColor: '#23232e',
            borderColor: '#23232e',
            borderTopColor: '#23232e',
            borderTopWidth: 0,
            borderWidth: 5
          },
          activeTintColor: '#df49a6',
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
    borderColor: '#23232e',
    backgroundColor: '#23232e'
  },
  text: {
    color: '#FFFFFF'
  }
})