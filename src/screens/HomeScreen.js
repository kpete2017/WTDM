import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, ActivityIndicator, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import ChosenActivity from '../components/ChosenActivity';
import Map from '../components/Map';
import ActivityButtons from '../components/ActivityButtons';
import ListResults from '../components/ListResults';


const url  = 'https://api.yelp.com/v3/businesses/search?'

export default class Home extends Component {

  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    key: 'rKNTSz5yG3Hol4ulUI_IA5AiWrrhghjyWBItID9kjO2RRCqv3hshbvB49rN-2NHgbD8MSRqC_ixLhjKRFxTaC-ryOpONaV0Y9S5Tq89Ah0h-h0sqFEMlrzo4-3WxX3Yx',
    radius: '5000',
    activities: [],
    isActivityChosen: false,
    chosenActivity: [],
    markers: [],
    isLoading: false,
    customSearch: ""
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
      alert('Please grant location permission');
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
      try {
        this.handleActivityPress(this.state.activities[randomNumberPick - 1]);
      }
      catch(e) {
        this.handleRandomPress();
      }
    } else {
      alert("Please select an activity first");
    }
  }

  handleExitButtonPress = () => {
    this.setState({isActivityChosen: false});
  }

  handleCustomSearch = () => {
    let str = this.state.customSearch;
    str = str.toLowerCase().replace(/\s/g, '');
    this.handleSearchPress(str);
  }

  render() {
    return (
      <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "position"} keyboardVerticalOffset={Platform.select({ios: 120, android: -300})} style={{backgroundColor: '#141418'}}>
        <ScrollView style={this.styles.container} ref={(c) => {this.scroll = c}} nestedScrollEnabled = {true}>
          {this.state.isLoading === true ? 
            <View style={this.styles.loadingContainer}>
              <ActivityIndicator style={this.styles.activityIndicator} size="large" animating={true}/>
            </View> 
          :
            <Map  
            mapRegion={this.state.mapRegion}
            markers={this.state.markers}
            handleActivityPress={this.handleActivityPress}
            />
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
          <ActivityButtons 
            isLoading={this.state.isLoading} 
            handleSearchPress={this.handleSearchPress}
          />

          <Text style={this.styles.subText}>Search Custom Activity</Text>
          <View style={{display: "flex", flexDirection: "row", width: "95%", justifyContent: "center", alignSelf: "center", marginBottom: 20}}>
            <TextInput onChangeText={text => this.setState({customSearch: text})} placeholder="Custom Activity"  placeholderColor="#FFFFFF" style={this.styles.customInput}/>
            <TouchableOpacity onPress={() => this.handleCustomSearch()}>
                <Text style={this.styles.button}>Search</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={this.styles.randomButton} onPress={() => this.handleRandomPress()} disabled={this.state.isLoading}>
            <Text style={this.styles.text}>Choose Random</Text>
          </TouchableOpacity>
          <Text style={this.styles.text}>Or Choose a Search Result:</Text>
          <ListResults activities={this.state.activities} handleActivityPress={this.handleActivityPress}/>
        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  styles = StyleSheet.create({ 
    container: {
        backgroundColor: '#141418',
        height: '100%',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 15,
        padding: 12,
        fontWeight: "700"
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
    },
    customInput: {
      color: 'black',
      backgroundColor: '#fafafa',
      width: "80%"
    },
    button: {
      color: '#FFFFFF',
      backgroundColor: '#23232e',
      padding: 12,
      fontSize: 15,
      fontWeight: "700",
    },
    subText: {
      color: '#FFFFFF',
        fontSize: 15,
        padding: 5,
        paddingLeft: 12,
        fontWeight: "700"
    }
  })
}
