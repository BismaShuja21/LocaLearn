// import React, { useState, useEffect } from "react";
// import { MyInput, MyText, TutorInfoModal } from "../../../components";
// import MapView, { Marker } from "react-native-maps";
// import { View, StyleSheet, Modal } from "react-native";
// import tutors from "../../../components/tutors";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";

// const StudentSearch = ({ navigation }) => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     // Check and request location permissions
//     const getLocationPermission = async () => {
//       const { status } = await Permissions.askAsync(Permissions.LOCATION);

//       if (status === "granted") {
//         const location = await Location.getCurrentPositionAsync({});
//         const updatedLocation = {
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//         };
//         setCurrentLocation(updatedLocation);
//         console.log(updatedLocation);
//       } else {
//         // Handle permission denied
//         console.log("Location permission denied");
//       }
//     };

//     getLocationPermission();
//   }, []);

//   useEffect(() => {
//     setInitialRegion(calculateRegion());
//   }, [currentLocation]);

//   const handleMarkerPress = (location) => {
//     setSelectedLocation(location);
//     setModalVisible(true);
//   };

//   const viewProfileHandler = () => {
//     navigation.navigate("ViewTutorProfileScreen");
//   };


//   // Calculate the bounding box (region) based on all locations
//   const calculateRegion = () => {
//     let minLat = Number.MAX_VALUE;
//     let maxLat = -Number.MAX_VALUE;
//     let minLng = Number.MAX_VALUE;
//     let maxLng = -Number.MAX_VALUE;

//     tutors.forEach((location) => {
//       minLat = Math.min(minLat, location.latitude);
//       maxLat = Math.max(maxLat, location.latitude);
//       minLng = Math.min(minLng, location.longitude);
//       maxLng = Math.max(maxLng, location.longitude);
//     });

//     const latitudeDelta = maxLat - minLat;
//     const longitudeDelta = maxLng - minLng;

//     return {
//       latitude: currentLocation
//         ? currentLocation.latitude
//         : (minLat + maxLat) / 2,
//       longitude: currentLocation
//         ? currentLocation.longitude
//         : (minLng + maxLng) / 2,
//       latitudeDelta: latitudeDelta * 1.5,
//       longitudeDelta: longitudeDelta * 1.5,
//     };
//   };

//   const [initialRegion, setInitialRegion] = useState(calculateRegion());

//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} initialRegion={initialRegion}>
//         {/* Markers */}
//         {tutors.map((location) => (
//           <Marker
//             key={location.id}
//             coordinate={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//             }}
//             title={location.name}
//             onPress={() => handleMarkerPress(location)}
//           />
//         ))}
//       </MapView>

//       {/* Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(false);
//         }}
//       >
//         <TutorInfoModal
//           info={selectedLocation}
//           buttons={[
//             { label: "View Profile", onPress: viewProfileHandler },
//             { label: "Chat Now", onPress: () => {} },
//             {
//               label: "Close",
//               onPress: () => {
//                 setModalVisible(false);
//               },
//               backgroundColor: "#e2b623",
//             },
//           ]}
//         />
//       </Modal>

//       {/* <TutorInfoModal
//         info={selectedLocation}
//         visible={modalVisible}
//         buttons={[
//           { label: "Close" },
//           { label: "Chat Now" },
//           { label: "View Profile" },
//         ]}
      
//       /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default StudentSearch;








import React, { useState, useEffect } from 'react';
import { MyInput, MyText, TutorInfoModal } from "../../../components";
import { View, StyleSheet, Button, Modal, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";
// import tutors from "../../../components/tutors";
import * as Location from 'expo-location';
import axios from 'axios';
// import PersonInfoBox from './components/personinfo'; // Adjust the path based on your folder structure

const MapWithMarkers = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [tutors, setTutors] = useState([]); // State to hold tutors' locations


  const navigation = useNavigation();


  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        console.log("Location permission granted");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const viewProfileHandler = () => {
        navigation.navigate("ViewTutorProfileScreen");
      };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      updateAddress(coords.latitude, coords.longitude);
    } catch (error) {
      console.warn("Error getting location:", error);
    }
  };

  const updateAddress = async (latitude, longitude) => {
    try {
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (addressResponse && addressResponse.length > 0) {
        const { name, street, postalCode, city, region, country } = addressResponse[0];
        const formattedAddress = `${name || street || postalCode || ""}, ${city || region || country}`;
        // You can use setAddress(formattedAddress); here if needed
      } else {
        // setAddress("");
        console.log("No address details found");
      }
    } catch (error) {
      console.warn("Error updating address:", error);
    }
  };


  const fetchTutorsNearby = async () => {
    try {
      const { latitude, longitude } = currentLocation;
      const response = await axios.get(
        `http://192.168.43.142:3000/tutor/tutors-nearby`,
        {
          params: {
            longitude: longitude,
            latitude: latitude,
          },        }
      );
      setTutors(response.data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };


  useEffect(() => {
    requestLocationPermission();
    getCurrentLocation(); // Optionally set the initial location
  }, []);

  useEffect(() => {
    if (currentLocation) {
      setInitialRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      fetchTutorsNearby();
    }
  }, [currentLocation]);

  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

    return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* Markers */}
        {tutors.map((tutor) => (
          <Marker
            key={tutor._id}
            coordinate={{
              latitude: tutor.location.coordinates[1],
              longitude: tutor.location.coordinates[0],
            }}
            title={tutor.firstName}
            onPress={() => handleMarkerPress(tutor)}
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

export default MapWithMarkers;
