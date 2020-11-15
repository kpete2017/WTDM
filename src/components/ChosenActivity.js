import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, ActivityIndicator, Platform } from 'react-native';
import getDirections from 'react-native-google-maps-directions'

export default class ChosenActivity extends Component {

    handleDirectionsPress = () => {
        const data = {
          source: {
            latitude: this.props.mapRegion.latitude,
            longitude: this.props.mapRegion.longitude
          },
          destination: {
            latitude: this.props.chosenActivity.coordinates.latitude,
            longitude: this.props.chosenActivity.coordinates.longitude
          },
          params: [
            {
              key: "travelmode",
              value: "driving"
            },
            {
              key: "dir_action",
              value: "navigate"
            }
          ]
        }
        getDirections(data)
    }

    render() {
        return(
        <View style={this.styles.chosenActivityContainer}>

          <TouchableOpacity style={this.styles.exitButton} onPress={() => this.props.handleExitButtonPress()}>
              <Text style={this.styles.text}>X</Text>
          </TouchableOpacity>

          <ScrollView style={this.styles.chosenItemDescription} persistentScrollbar={true}>
            <Text style={this.styles.textName}>{this.props.chosenActivity.name}</Text>
            <Image style={this.styles.image} source={{uri: this.props.chosenActivity.image_url}} />
            <Text style={this.styles.text}>{this.props.chosenActivity.location.address1} 
            {this.props.chosenActivity.location.city} {this.props.chosenActivity.location.state} {this.props.chosenActivity.location.zip_code}
            </Text>
            <Text style={this.styles.text}>Phone: {this.props.chosenActivity.phone} </Text>
            <Text style={this.styles.text}>Rating: {this.props.chosenActivity.rating} Stars {"\n"}Review Count: {this.props.chosenActivity.review_count}</Text>
            <Text style={this.styles.text}>Price: {this.props.chosenActivity.price}</Text>
            <Text style={this.styles.text}>Distance: {(this.props.chosenActivity.distance * 0.00062137).toFixed(2)} Miles</Text>
          </ScrollView> 

          <View style={this.styles.chosenButtonContainer}>
            <TouchableOpacity style={this.styles.chosenButton} onPress={() => this.handleDirectionsPress()}>
              <Text style={this.styles.text}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.styles.chosenButton} onPress={() => this.props.handleRandomPress()}>
              <Text style={this.styles.text}>Next Random</Text>
            </TouchableOpacity>
          </View>

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
        textName: {
          color: '#FFFFFF',
          fontSize: 20,
          padding: 12,
          fontWeight: "700",
          marginRight: 40
        },
        chosenActivityContainer: {
          backgroundColor: '#23232e',
          width: '50%',
          height: 430,
          zIndex: 1,
          position: 'absolute',
          top: 10,
          left: 5,
          borderRadius: 5
        },
        chosenButton: {
          backgroundColor: '#141418',
          borderRadius: 5,
          marginLeft: 7,
          marginRight: 7,
          marginTop: 5
        },
        chosenButtonContainer: {
          marginTop: 10,
          marginBottom: 10
        },
        exitButton: {
          alignSelf: 'flex-end',
          position: 'absolute',
          zIndex: 2,
          fontSize: 600,
          fontWeight: '700',
          backgroundColor: '#141418'
        },
        image: {
          height: 100,
          width: "85%",
          alignSelf: "center"
        }
      })
}