import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import customStyle from '../MapStyle';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class Home extends Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    key: '',
    radius: '2500',
    activities: [],
    isActivityChosen: false,
    chosenActivity: [],
    markers: [],
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  async getLocationAsync () {
    const { status } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    if (status === 'granted') {
      this.setState({ hasLocationPermissions: true });
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        mapRegion: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        },
      });
    } else {
      alert('Location permission not granted');
    }
  };

  handleDineInPress = () => {
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const location = `location=${this.state.mapRegion["latitude"]},${this.state.mapRegion["longitude"]}`;
    const radius = `&radius=${this.state.radius}`;
    const type = "&type=restaurant";
    const key = `&key=${this.state.key}`;
    const dineInUrl = url + location + radius + type + key;
    fetch(dineInUrl)
      .then(response => response.json())
      .then(result => this.setState({ activities: result.results, markers: result.results }))
      .catch( e => console.log(e))
  }

  handleActivityPress = (activity) => {
    this.setState({
      mapRegion: {
        latitude: activity['geometry']['location']['lat'],
        longitude: activity['geometry']['location']['lng']  - .0045,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015
      },
      isActivityChosen: true,
      markers: [activity],
      chosenActivity: activity
    })
    this.scroll.scrollTo({x: 0, y: 0, animated: true})
  }

  handleRandomPress = () => {
    if(this.state.activities.length > 0) {
      let randomNumberPick = Math.round(Math.random() * this.state.activities.length);
      this.handleActivityPress(this.state.activities[randomNumberPick - 1]);
    } else {
      alert("Please select an activity first")
    }
  }

  render() {
    return (
      <ScrollView 
      style={this.styles.container}
      ref={(c) => {this.scroll = c}}
      >
        <MapView
            showsUserLocation={true}
            showsMyLocationButton={true}
            customMapStyle={customStyle}
            style={this.styles.map}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={this.state.mapRegion}
            region={this.state.mapRegion}
            animated={true}
          >
          {this.state.markers.map(activity => {
            const LatLng = {
              latitude: activity['geometry']['location']['lat'],
              longitude: activity['geometry']['location']['lng']
            };
            return <Marker
            title={activity['name']}
            key={activity['place_id']}
            coordinate={LatLng}
            icon={activity['icon']}
            ></Marker>
          })}
          </MapView>
          {this.state.isActivityChosen ? 
          <ScrollView style={this.styles.activityContainer}>
            <Text style={this.styles.text}>{this.state.chosenActivity['name']}</Text>

          </ScrollView> 
          : 
          null
          }
          <Text style={this.styles.text}>Pick An Activity:</Text>
          <View style={this.styles.buttonContainer}>
            <TouchableOpacity style={this.styles.button} onPress={() => this.handleDineInPress()}>
              <Text style={this.styles.text}>Dine In</Text>
            </TouchableOpacity >
            <TouchableOpacity style={this.styles.button}>
              <Text style={this.styles.text}>Fast Food</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.styles.button}>
              <Text style={this.styles.text}>Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.styles.button}>
              <Text style={this.styles.text}>Outdoor</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={this.styles.randomButton} onPress={() => this.handleRandomPress()}>
            <Text style={this.styles.text}>Choose Random</Text>
          </TouchableOpacity>
          <Text style={this.styles.text}>Choose a Search Result:</Text>
          <View style={this.styles.list}>
            {this.state.activities.map(activity => {
              return <TouchableOpacity onPress={() => this.handleActivityPress(activity)}>
                <Text style={this.styles.text} key={activity['place_id']}>{`\u2022`} {activity['name']}</Text>
              </TouchableOpacity>
            })}
          </View>
      </ScrollView>
    );
  }

  styles = StyleSheet.create({ 
    container: {
        backgroundColor: '#141418',
        height: 'auto'
    },
    text: {
        color: '#FFFFFF',
        fontSize: 15,
        padding: 12,
        fontWeight: "700"
    },
    map: {
      height: 450,
      width: '100%',
      zIndex: -1
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
    list: {
      width: '95%',
      height: 'auto',
      alignSelf: 'center',
      backgroundColor: '#23232e',
      borderRadius: 5,
      marginBottom: 10
    },
    randomButton: {
      backgroundColor: '#23232e',
      width: '95%',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    activityContainer: {
      backgroundColor: '#23232e',
      width: '50%',
      height: 430,
      zIndex: 1,
      position: 'absolute',
      top: 10,
      left: 5
    }
  })
}
