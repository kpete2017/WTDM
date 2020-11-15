import React, {Component} from 'react';
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import customStyle from '../MapStyle';

export default class Map extends Component {
    render() {
        return(
            <MapView
            showsUserLocation={true}
            customMapStyle={customStyle}
            style={this.styles.map}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={this.props.mapRegion}
            region={this.props.mapRegion}
            animated={true}
            showsMyLocationButton={true}
          >
          {this.props.markers.map(activity => {
            const LatLng = {
              latitude: activity.coordinates.latitude,
              longitude: activity.coordinates.longitude
            };
            return <Marker
            key={activity.id}
            coordinate={LatLng}
            onPress={() => this.props.handleActivityPress(activity)}
            pinColor = {"#df49a6"}
            ></Marker>
          })}
        </MapView>
        )
    }

    styles = StyleSheet.create({
        map: {
            height: 450,
            width: '100%',
            zIndex: -1,
        },
    })
}