import { StyleSheet, Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Button, KeyboardAvoidingView } from 'react-native';
import React, { Component } from 'react';

export default class login extends Component {

    state= {
        username: "",
        password: ""
    }

    render() {
        return(
            <KeyboardAvoidingView style={this.styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={this.styles.loginScreenContainer}>
                        <View style={this.styles.loginFormView}>
                            <Text style={this.styles.logoText}>What To Do?</Text>
                                <TextInput placeholder="Username" autoCapitalize='none' onChangeText={text => this.setState({username: text})} placeholderColor="#c4c3cb" style={this.styles.loginFormTextInput} />
                                <TextInput placeholder="Password" onChangeText={text => this.setState({password: text})} placeholderColor="#c4c3cb" style={this.styles.loginFormTextInput} secureTextEntry={true}/>
                                <Button
                                style={this.styles.loginButton}
                                onPress={() => this.props.onLoginPress(this.state.username, this.state.password)}
                                title="Login"
                                width='20'
                                />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }

    styles = StyleSheet.create({
        containerView: {
            flex: 1,
            backgroundColor: '#141418'
        },
        loginScreenContainer: {
          flex: 1,
        },
        logoText: {
          fontSize: 40,
          fontWeight: "800",
          marginTop: 150,
          marginBottom: 30,
          textAlign: 'center',
          color: 'white'
        },
        loginFormView: {
          flex: 1
        },
        loginFormTextInput: {
          height: 43,
          fontSize: 14,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#eaeaea',
          backgroundColor: '#fafafa',
          paddingLeft: 10,
          marginLeft: 15,
          marginRight: 15,
          marginTop: 5,
          marginBottom: 5,
        
        },
        loginButton: {
          borderRadius: 5,
          height: 45,
          marginTop: 10,
          
        },
    })
}