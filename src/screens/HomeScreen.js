import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import customStyle from '../MapStyle'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class Home extends Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    markers: [],
    key: 'AIzaSyD1dmZKGlPaI3GxShhbfuKmXBiqZy7mH-U',
    radius: '1500',
    activities: []
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    } else {
      alert('Location permission not granted');
    }
  };

  handleDineInPress = () => {

    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
    const location = `location=${this.state.mapRegion["latitude"]},${this.state.mapRegion["longitude"]}`;
    const radius = `&radius=${this.state.radius}`;
    const type = "&type=restaurant";
    const key = `&key=${this.state.key}`;

    fetch(url + location + radius + type + key)
      .then(response => response.json())
      .then(result => this.setState({ activities: result.results}))
  }

  render() {

    return (
      <View style={this.styles.container}>
        <MapView
            showsUserLocation={true}
            showsCompass={true}
            showsMyLocationButton={true}
            customMapStyle={customStyle}
            style={this.styles.map}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={this.state.mapRegion}
          >
          {this.state.activities.map(activity => {
            <Marker
            title={activity['name']}
            key={activity['index']}
            coordinate={activity['geometry']['location']}
            ></Marker>
          })}
          </MapView>
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
          <Text style={this.styles.text}>Choose a Search Result:</Text>
          <View style={this.styles.list}>
            <FlatList
              data={this.state.activities}
              renderItem={(activity) => {
                return <Text style={this.styles.text}>{`\u2022`} {activity['item']['name']}</Text>
              }}
              keyExtractor={(activity) => activity['index']}
            />
          </View>
      </View>
    );
  }

  styles = StyleSheet.create({ 
    container: {
        backgroundColor: '#141418',
        height: '100%'
    },
    text: {
        color: '#FFFFFF',
        padding: 12,
    },
    map: {
      height: '50%',
      width: '100%'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignSelf: 'center',
      width: '95%',
      marginBottom: 10    
    },
    button: {
      backgroundColor: "#23232e",
      borderRadius: 5
    },
    list: {
      width: '95%',
      height: '30%',
      alignSelf: 'center',
      backgroundColor: '#23232e',
      borderRadius: 5
    }
  })
}
