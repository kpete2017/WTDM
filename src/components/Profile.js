import { StyleSheet, Text, Keyboard, View, TextInput, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Profile extends Component {

    state = {
        favoritesText: "",
        blacklistText: ""
    }


    handleAddFavorite = () => {
        Keyboard.dismiss;
        fetch("https://what-to-do-backend-v2.herokuapp.com/favorites", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.props.token}`
            },
            body: JSON.stringify({name: this.state.favoritesText})
        })
        .then(response => response.json())
        .then(results => console.log(results))
        .catch(e => console.log(e))
    }

    render() {
        return(
            <KeyboardAwareScrollView style={this.styles.containerView}>
                <Text style={this.styles.text}>Favorites</Text>
                <FlatList
                data={this.props.favorites}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Text style={this.styles.text}>{item.name}</Text>}
                style={this.styles.list}
                />
                <View style={this.styles.favContainer}>
                    <TextInput onChange={text => this.setState({favoritesText: text})} placeholder="Add new favorite"  placeholderColor="#FFFFFF" style={this.styles.favInput}/>
                    <TouchableOpacity onPress={() => this.handleAddFavorite()}>
                        <Text style={this.styles.button}>Add Favorite</Text>
                    </TouchableOpacity>
                </View>
                <Text style={this.styles.text}>Blacklist</Text>
                <FlatList
                data={this.props.blacklists}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Text style={this.styles.text}>{item.name}</Text>}
                style={this.styles.list}
                />
                <View style={this.styles.favContainer}>
                    <TextInput onChange={text => this.setState({blacklistText: text})} placeholder="Add new Blacklist"  placeholderColor="#FFFFFF" style={this.styles.favInput}/>
                    <TouchableOpacity onPress={Keyboard.dismiss}>
                        <Text style={this.styles.button}>Add Blacklist</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        )
    }

    styles = StyleSheet.create({
        containerView: {
            flex: 1,
            backgroundColor: '#141418'
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
        },
        button: {
            color: '#FFFFFF',
            backgroundColor: '#23232e',
            padding: 12,
            fontSize: 15,
            fontWeight: "700",
        },
        list: {
            height: 300,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#23232e',
            margin: 10
        },
        text: {
            color: '#FFFFFF',
            fontSize: 15,
            padding: 10,
            marginLeft: 7,
            fontWeight: "700"
        },
    })
}