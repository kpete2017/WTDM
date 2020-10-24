import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import customStyle from '../MapStyle'

export default function Home({ navigation }) {
    return (
      <View style={styles.container}>
        <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={customStyle}
            style={styles.map}
            provider={MapView.PROVIDER_GOOGLE}
          />
      </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        backgroundColor: '#141418',
        height: '100%'
    },
    text: {
        color: '#FFFFFF'
    },
    map: {
      height: '50%',
      width: '100%'
    }
})