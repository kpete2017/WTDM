import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, ActivityIndicator, Platform } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import customStyle from '../MapStyle';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import getDirections from 'react-native-google-maps-directions'

const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'

export default class Home extends Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    key: 'AIzaSyCTG8tfRBCabaCP-enskC2akmNVBvaOAAs',
    radius: '2500',
    activities: [],
    isActivityChosen: false,
    chosenActivity: [],
    markers: [],
    isLoading: false
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  async getLocationAsync () {
    this.setState({ isLoading: true})
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
          latitudeDelta: 0.035,
          longitudeDelta: 0.035,
          
        },
        isLoading: false
      });
    } else {
      alert('Location permission not granted');
      this.setState({isLoading: false});
    }
  };

  handleDineInPress = () => {
    this.setState({isLoading: true});
    this.resetMapDelta();
    const location = `location=${this.state.mapRegion.latitude},${this.state.mapRegion.longitude}`;
    const radius = `&radius=${this.state.radius}`;
    const type = '&keyword=restaurant';
    const key = `&key=${this.state.key}`;
    const dineInUrl = url + location + radius + type + key;
    this.fetchUrl(dineInUrl);
  }

  handleFastFoodPress = () => {
    this.setState({isLoading: true});
    this.resetMapDelta();
    const location = `location=${this.state.mapRegion.latitude},${this.state.mapRegion.longitude}`;
    const radius = `&radius=${this.state.radius}`;
    const type = '&keyword=fast%20food';
    const key = `&key=${this.state.key}`;
    const fastFoodUrl = url + location + radius + type  + key;
    this.fetchUrl(fastFoodUrl);
  }

  handleShoppingPress = () => {
    this.setState({isLoading: true});
    this.resetMapDelta();
    const location = `location=${this.state.mapRegion.latitude},${this.state.mapRegion.longitude}`;
    const radius = `&radius=${this.state.radius}`;
    const type = '&keyword=clothing%20store';
    const key = `&key=${this.state.key}`;
    const shoppingUrl = url + location + radius + type  + key;
    this.fetchUrl(shoppingUrl);
  }

  handleOutdoorPress = () => {
    this.setState({isLoading: true});
    this.resetMapDelta();
    const location = `location=${this.state.mapRegion.latitude},${this.state.mapRegion.longitude}`;
    const radius = `&radius=${this.state.radius}`;
    const type = '&keyword=park';
    const key = `&key=${this.state.key}`;
    const fastFoodUrl = url + location + radius + type  + key;
    this.fetchUrl(fastFoodUrl);
  }

  resetMapDelta = () => {
    this.setState({
      mapRegion: {
        latitude: this.state.mapRegion.latitude,
        longitude: this.state.mapRegion.longitude,
        latitudeDelta: 0.055,
        longitudeDelta: 0.055
      }
    })
  }

  fetchUrl = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        this.setState({ 
          activities: result.results, 
          markers: result.results, 
          isLoading: false, 
        })
      })
      .catch( e => console.log(e))
  }

  handleActivityPress = (activity) => {
    this.setState({
      mapRegion: {
        latitude: activity.geometry.location.lat,
        longitude: activity.geometry.location.lng  - .0045,
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
      randomNumberPick = randomNumberPick === 20 ? 1 : randomNumberPick;
      try {
        this.handleActivityPress(this.state.activities[randomNumberPick - 1]);
      }
      catch {
        this.handleRandomPress();
      }
    } else {
      alert("Please select an activity first");
    }
  }

  handleDirectionsPress = () => {
    const data = {
      source: {
        latitude: this.state.mapRegion.latitude,
        longitude: this.state.mapRegion.longitude
      },
      destination: {
        latitude: this.state.chosenActivity.geometry.location.lat,
        longitude: this.state.chosenActivity.geometry.location.lng
      },
      params: [
        {
          key: "travelmode",
          value: "driving"        // may be "walking", "bicycling" or "transit" as well
        },
        {
          key: "dir_action",
          value: "navigate"       // this instantly initializes navigation using the given travel mode
        }
      ]
    }
    getDirections(data)
  }

  render() {
    return (
      <ScrollView 
        style={this.styles.container}
        ref={(c) => {this.scroll = c}}
      >
        {this.state.isLoading === true
        ? 
        <View style={this.styles.loadingContainer}>
          <ActivityIndicator style={this.styles.activityIndicator} size="large"/>
        </View> 
        :
        <MapView
            showsUserLocation={true}
            customMapStyle={customStyle}
            style={this.styles.map}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={this.state.mapRegion}
            region={this.state.mapRegion}
            animated={true}
            showsMyLocationButton={true}
          >
          {this.state.markers.map(activity => {
            const LatLng = {
              latitude: activity.geometry.location.lat,
              longitude: activity.geometry.location.lng
            };
            return <Marker
            title={activity.name}
            key={activity.place_id}
            coordinate={LatLng}
            ></Marker>
          })}
        </MapView>
        }
        {this.state.isActivityChosen ? 
        <View style={this.styles.chosenActivityContainer}>
          <TouchableOpacity style={this.styles.exitButton} onPress={() => this.setState({isActivityChosen: false})}>
              <Text style={this.styles.text}>X</Text>
          </TouchableOpacity>
          <ScrollView style={this.styles.chosenItemDescription}>
            <Text style={this.styles.textName}>{this.state.chosenActivity.name}</Text>
            <Text style={this.styles.text}>{this.state.chosenActivity.vicinity}</Text>
            <Text style={this.styles.text}>Rating: {this.state.chosenActivity.rating} Stars</Text>
            <Text style={this.styles.text}>Price Level: {this.state.chosenActivity.price_level}</Text>
          </ScrollView> 
          <View style={this.styles.chosenButtonContainer}>
            <TouchableOpacity style={this.styles.chosenButton} onPress={() => this.handleDirectionsPress()}>
              <Text style={this.styles.text}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.styles.chosenButton} onPress={() => this.handleRandomPress()}>
              <Text style={this.styles.text}>Get Random</Text>
            </TouchableOpacity>
          </View>
        </View>
          : 
          null
        }
        <Text style={this.styles.text}>Pick An Activity:</Text>
        <View style={this.styles.buttonContainer}>
          <TouchableOpacity style={this.styles.button} onPress={() => this.handleDineInPress()} disabled={this.state.isLoading}>
            <Text style={this.styles.text} >Dine In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.styles.button} onPress={() => this.handleFastFoodPress()} disabled={this.state.isLoading}>
            <Text style={this.styles.text}>Fast Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.styles.button} onPress={() => this.handleShoppingPress()} disabled={this.state.isLoading}>
            <Text style={this.styles.text}>Shopping</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.styles.button} onPress={() => this.handleOutdoorPress()} disabled={this.state.isLoading}>
            <Text style={this.styles.text}>Outdoor</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={this.styles.randomButton} onPress={() => this.handleRandomPress()} disabled={this.state.isLoading}>
          <Text style={this.styles.text}>Choose Random</Text>
        </TouchableOpacity>
        <Text style={this.styles.text}>Choose a Search Result:</Text>
        <View style={this.styles.list}>
          {this.state.activities.map(activity => {
            if(activity.geometry) {
              return <TouchableOpacity onPress={() => this.handleActivityPress(activity)}>
              <Text style={this.styles.text} key={activity.place_id}>{`\u2022`} {activity.name}</Text>
            </TouchableOpacity>
            }   
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
    textName: {
      color: '#FFFFFF',
      fontSize: 15,
      padding: 12,
      fontWeight: "700",
      marginRight: 40
    },
    map: {
      height: 450,
      width: '100%',
      zIndex: -1,
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
    },
    chosenActivityContainer: {
      backgroundColor: '#23232e',
      width: '50%',
      height: 350,
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
    loadingContainer: {
      height: 450,
      width: '100%',
      backgroundColor: '#242f3e',
      alignContent: "center",
    },
    activityIndicator: {
      marginTop: '50%'
    },
    exitButton: {
      alignSelf: 'flex-end',
      position: 'absolute',
      zIndex: 2,
      fontSize: 600,
      fontWeight: '700',
      backgroundColor: '#141418'
    },
  })
}
