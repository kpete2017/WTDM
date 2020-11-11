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
        height: '12%',
        backgroundColor: '#23232e'

    },
    text: {
        alignSelf: "flex-start",
        textAlign: "center",
        fontSize: 25,
        marginTop: '15%',
        marginLeft: 15,
        color: '#FFFFFF'
    }
})