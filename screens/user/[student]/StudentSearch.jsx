import React, { useState, useEffect } from "react";
import { MyInput, MyText, TutorInfoModal } from "../../../components";
import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet, Modal } from "react-native";
import tutors from "../../../components/tutors";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const StudentSearch = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Check and request location permissions
    const getLocationPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const updatedLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCurrentLocation(updatedLocation);
        console.log(updatedLocation);
      } else {
        // Handle permission denied
        console.log("Location permission denied");
      }
    };

    getLocationPermission();
  }, []);

  useEffect(() => {
    setInitialRegion(calculateRegion());
  }, [currentLocation]);

  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  const viewProfileHandler = () => {
    navigation.navigate("ViewTutorProfileScreen");
  };


  // Calculate the bounding box (region) based on all locations
  const calculateRegion = () => {
    let minLat = Number.MAX_VALUE;
    let maxLat = -Number.MAX_VALUE;
    let minLng = Number.MAX_VALUE;
    let maxLng = -Number.MAX_VALUE;

    tutors.forEach((location) => {
      minLat = Math.min(minLat, location.latitude);
      maxLat = Math.max(maxLat, location.latitude);
      minLng = Math.min(minLng, location.longitude);
      maxLng = Math.max(maxLng, location.longitude);
    });

    const latitudeDelta = maxLat - minLat;
    const longitudeDelta = maxLng - minLng;

    return {
      latitude: currentLocation
        ? currentLocation.latitude
        : (minLat + maxLat) / 2,
      longitude: currentLocation
        ? currentLocation.longitude
        : (minLng + maxLng) / 2,
      latitudeDelta: latitudeDelta * 1.5,
      longitudeDelta: longitudeDelta * 1.5,
    };
  };

  const [initialRegion, setInitialRegion] = useState(calculateRegion());

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* Markers */}
        {tutors.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
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
          setModalVisible(false);
        }}
      >
        <TutorInfoModal
          info={selectedLocation}
          buttons={[
            { label: "View Profile", onPress: viewProfileHandler },
            { label: "Chat Now", onPress: () => {} },
            {
              label: "Close",
              onPress: () => {
                setModalVisible(false);
              },
              backgroundColor: "#e2b623",
            },
          ]}
        />
      </Modal>

      {/* <TutorInfoModal
        info={selectedLocation}
        visible={modalVisible}
        buttons={[
          { label: "Close" },
          { label: "Chat Now" },
          { label: "View Profile" },
        ]}
      
      /> */}
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
});

export default StudentSearch;
