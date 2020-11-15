import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, ActivityIndicator, Platform } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import customStyle from '../MapStyle';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ChosenActivity from '../components/ChosenActivity'

const url  = 'https://api.yelp.com/v3/businesses/search?'

export default class Home extends Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    key: 'rKNTSz5yG3Hol4ulUI_IA5AiWrrhghjyWBItID9kjO2RRCqv3hshbvB49rN-2NHgbD8MSRqC_ixLhjKRFxTaC-ryOpONaV0Y9S5Tq89Ah0h-h0sqFEMlrzo4-3WxX3Yx',
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

  handleSearchPress = (activityType) => {
    this.setState({isLoading: true, isActivityChosen: false});
    this.resetMapDelta();
    const latitude = `latitude=${this.state.mapRegion.latitude}`;
    const longitude = `&longitude=${this.state.mapRegion.longitude}`;
    const radius = `&radius=${this.state.radius}`;
    const open  = `&open_now=true`
    const term = `&term=${activityType}`;
    const limit =  '&limit=50'
    const finalUrl = url + latitude + longitude + radius + open + term  + limit;
    this.fetchUrl(finalUrl);
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
    fetch(url, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.state.key}`
      },
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ 
          activities: result.businesses, 
          markers: result.businesses, 
          isLoading: false, 
        })
      })
      .catch( e => console.log(e))
  }

  handleActivityPress = (activity) => {
    this.setState({
      mapRegion: {
        latitude: activity.coordinates.latitude,
        longitude: activity.coordinates.longitude  - .0045,
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
      this.handleActivityPress(this.state.activities[randomNumberPick - 1]);
    } else {
      alert("Please select an activity first");
    }
  }

  handleExitButtonPress = () => {
    this.setState({isActivityChosen: false})
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
              latitude: activity.coordinates.latitude,
              longitude: activity.coordinates.longitude
            };
            return <Marker
            key={activity.id}
            coordinate={LatLng}
            onPress={() => this.handleActivityPress(activity)}
            pinColor = {"#df49a6"}
            ></Marker>
          })}
        </MapView>
        }
        {this.state.isActivityChosen ? 
          <ChosenActivity 
          mapRegion={this.state.mapRegion} 
          chosenActivity={this.state.chosenActivity} 
          handleRandomPress={this.handleRandomPress}
          handleExitButtonPress={this.handleExitButtonPress}
          />
        : 
          null
        }
        <Text style={this.styles.text}>Pick An Activity:</Text>
        <View style={this.styles.buttonContainer}>
          <TouchableOpacity style={this.styles.button} onPress={() => this.handleSearchPress("restaurant")} disabled={this.state.isLoading}>
            <Text style={this.styles.text} >Dine In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.styles.button} onPress={() => this.handleSearchPress("fastfood")} disabled={this.state.isLoading}>
            <Text style={this.styles.text}>Fast Food</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.styles.button} onPress={() => this.handleSearchPress("shopping")} disabled={this.state.isLoading}>
            <Text style={this.styles.text}>Shopping</Text>
          </TouchableOpacity>
          <TouchableOpacity style={this.styles.button} onPress={() => this.handleSearchPress("park")} disabled={this.state.isLoading}>
            <Text style={this.styles.text}>Outdoor</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={this.styles.randomButton} onPress={() => this.handleRandomPress()} disabled={this.state.isLoading}>
          <Text style={this.styles.text}>Choose Random</Text>
        </TouchableOpacity>
        <Text style={this.styles.text}>Choose a Search Result:</Text>
        <View style={this.styles.list}>
          {this.state.activities.map(activity => {
            if(activity.coordinates) {
              return <TouchableOpacity onPress={() => this.handleActivityPress(activity)}>
              <Text style={this.styles.text} key={activity.id}>{`\u2022`} {activity.name}</Text>
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
        height: '100%'
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
      marginBottom: 10,
    },
    randomButton: {
      backgroundColor: '#23232e',
      width: '95%',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    loadingContainer: {
      height: 450,
      width: '100%',
      backgroundColor: '#242f3e',
      alignContent: "center",
    },
    activityIndicator: {
      marginTop: '50%'
    }
  })
}
