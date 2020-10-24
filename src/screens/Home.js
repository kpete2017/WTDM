import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';

export default function Home({ navigation }) {
    return (
      <View style={style.container}>
        <Text style={style.text}>Home Screen</Text>
        <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
      </View>
    );
}

const style = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141418',
    },
    text: {
        color: '#FFFFFF'
    }
})