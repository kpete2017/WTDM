import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class ActivityButtons extends Component {

    render() {
        return(
            <View style={this.styles.buttonContainer}>
                <TouchableOpacity style={this.styles.button} onPress={() => this.props.handleSearchPress("restaurant")} disabled={this.props.isLoading}>
                    <Text style={this.styles.text} >Dine In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.styles.button} onPress={() => this.props.handleSearchPress("fast-food")} disabled={this.props.isLoading}>
                    <Text style={this.styles.text}>Fast Food</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.styles.button} onPress={() => this.props.handleSearchPress("shopping")} disabled={this.props.isLoading}>
                    <Text style={this.styles.text}>Shopping</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.styles.button} onPress={() => this.props.handleSearchPress("park")} disabled={this.props.isLoading}>
                    <Text style={this.styles.text}>Outdoor</Text>
                </TouchableOpacity>
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
        buttonContainer: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: '95%',
          marginBottom: 10    
        },
        button: {
          backgroundColor: '#23232e',
          borderRadius: 5
        },
    })
}