import React, { Component } from 'react';
import { StyleSheet, Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Button, KeyboardAvoidingView, TouchableOpacity, FlatList} from 'react-native';

export default class profile extends Component {

    state = {
        isLoggedIn: false,
        username: '',
        password: '',
        user: []
    }

    onLoginPress = () => {
      const username = this.state.username;
      const password  = this.state.password
      const userData = { username, password }
      fetch("https://what-to-do-backend-v2.herokuapp.com/login", {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
      })
        .then(response => response.json())
        .then(result => this.setState({isLoggedIn: true, user: result}))
        .catch(e => console.log(e))
    }

    render() {
      console.log(this.state.user)
      if(this.state.isLoggedIn) {
          return(
              <KeyboardAvoidingView style={this.styles.containerView}>
                <Text style={this.styles.text}>Favorites</Text>
                <FlatList
                  data={this.state.user.favorites}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => <Text style={this.styles.text}>{item.name}</Text>}
                  style={this.styles.list}
                />
                <View style={this.styles.favContainer}>
                  <TextInput placeholder="Add new favorite"  placeholderColor="#FFFFFF" style={this.styles.favInput}/>
                  <TouchableOpacity>
                    <Text style={this.styles.button}>Add Favorite</Text>
                  </TouchableOpacity>
                </View>
                <Text style={this.styles.text}>Blacklist</Text>
                <FlatList
                  data={this.state.user.blacklists}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => <Text style={this.styles.text}>{item.name}</Text>}
                  style={this.styles.list}
                />
                <View style={this.styles.favContainer}>
                <TextInput placeholder="Add new Blacklist"  placeholderColor="#FFFFFF" style={this.styles.favInput}/>
                  <TouchableOpacity>
                    <Text style={this.styles.button}>Add Blacklist</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
          )
      } else {
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
                          onPress={() => this.onLoginPress()}
                          title="Login"
                          width='20'
                          />
                      </View>
                      </View>
                  </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
          )
        }
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
      list: {
        height: '20%',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#23232e',
        margin: 10
      },
      text: {
        color: '#FFFFFF',
        fontSize: 15,
        padding: 12,
        fontWeight: "700"
      },
      button: {
        color: '#FFFFFF',
        backgroundColor: '#23232e',
        padding: 12,
        fontSize: 15,
        fontWeight: "700",
      },
      favInput: {
        color: 'black',
        width: '65%',
        backgroundColor: '#fafafa'
      },
      favContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10
      }
    })
}
