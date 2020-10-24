import * as React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import Home from '../screens/Home'
  
function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications Screen</Text>
      </View>
    );
}
  
function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
}
  
const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
      <Drawer.Navigator 
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={style.drawer}
      drawerContentOptions={{
        inactiveTintColor: 'white',
      }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Notifications" component={Notifications} />
      </Drawer.Navigator>
    );
}

const style = StyleSheet.create({
    drawer: {
        backgroundColor: '#23232e',
        width: "50%"
    },
    text: {
        color: '#FFFFFF'
    }
})