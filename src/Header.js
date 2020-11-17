import React from 'react';
import { View, StyleSheet, Text } from 'react-native'
export default function Header() {

    return(
        <View style={styles.header}>
            <Text style={styles.text}>What To Do?</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: '10%',
        backgroundColor: '#23232e'

    },
    text: {
        alignSelf: "flex-start",
        fontSize: 25,
        marginTop: 45,
        marginLeft: 15,
        color: '#FFFFFF'
    }
})