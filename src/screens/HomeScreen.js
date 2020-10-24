import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';
import customStyle from '../MapStyle'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class Home extends Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    markers: [],
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  async getLocationAsync () {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status } = await Permissions.askAsync(
      Permissions.LOCATION
    );
    if (status === 'granted') {
      this.setState({ hasLocationPermissions: true });
      //  let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location) });
      // Center the map on the location we just fetched.
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
            region={this.state.mapRegion}
          >
            {this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={marker.latlng}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </MapView>
          <Text style={this.styles.text}>Pick An Activity:</Text>
          <View style={this.styles.buttonContainer}>
            <TouchableOpacity style={this.styles.button}>
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
      alignSelf: 'center',
      backgroundColor: '#23232e',
      height: '24%',
      borderRadius: 5
    }
  })
}