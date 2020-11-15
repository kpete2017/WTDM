import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class ListResult extends Component {
    render() {
        return(
            <View style={this.styles.list}>
            {this.props.activities.map(activity => {
                if(activity.coordinates) {
                return <TouchableOpacity key={activity.id} onPress={() => this.props.handleActivityPress(activity)}>
                <Text style={this.styles.text}>{`\u2022`} {activity.name}</Text>
                </TouchableOpacity>
                }   
            })}
            </View>
        )
    }

    styles = StyleSheet.create({ 
        text: {
            color: '#FFFFFF',
            fontSize: 15,
            padding: 12,
            fontWeight: "700"
        },
        list: {
          width: '95%',
          height: 'auto',
          alignSelf: 'center',
          backgroundColor: '#23232e',
          borderRadius: 5,
          marginBottom: 10,
        },
    })
}