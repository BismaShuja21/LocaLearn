import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Modal, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapWithMarkers = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  const locations = [
    { id: 1, name: 'Location 1', latitude: 24.8607, longitude: 67.0011 },
    { id: 2, name: 'Location 2', latitude: 24.8556, longitude: 67.0419 },
  ];

  // Calculate the bounding box (region) based on all locations
  const calculateRegion = () => {
    let minLat = Number.MAX_VALUE;
    let maxLat = -Number.MAX_VALUE;
    let minLng = Number.MAX_VALUE;
    let maxLng = -Number.MAX_VALUE;

    locations.forEach((location) => {
      minLat = Math.min(minLat, location.latitude);
      maxLat = Math.max(maxLat, location.latitude);
      minLng = Math.min(minLng, location.longitude);
      maxLng = Math.max(maxLng, location.longitude);
    });

    const latitudeDelta = maxLat - minLat;
    const longitudeDelta = maxLng - minLng;

    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: latitudeDelta * 1.5,  // Adjust the factor as needed
      longitudeDelta: longitudeDelta * 1.5, // Adjust the factor as needed
    };
  };

  const [initialRegion, setInitialRegion] = useState(calculateRegion());

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* Markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            onPress={() => handleMarkerPress(location)}
          />
        ))}
      </MapView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{selectedLocation ? selectedLocation.name : 'No location selected'}</Text>
            {/* Add more details here */}
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default MapWithMarkers;
