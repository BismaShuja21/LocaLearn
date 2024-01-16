
import React, { useState, useEffect } from 'react';
import { MyInput, MyText, TutorInfoModal } from "../../../components";
import { View, StyleSheet, Button, Modal, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";
// import tutors from "../../../components/tutors";
import * as Location from 'expo-location';
import axios from 'axios';
// import PersonInfoBox from './components/personinfo'; // Adjust the path based on your folder structure

const MapWithMarkers = ({ route }) => {
  const studentID = route.params.userID;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [tutors, setTutors] = useState([]); // State to hold tutors' locations
  const [userID, setUserID] = useState(null); // State to hold the user ID


  const navigation = useNavigation();



  // const fetchUserID = async () => {
  //   try {
  //     // Make a request to the server to fetch the userID based on studentID
  //     const response = await axios.get(`http://192.168.43.143/student/fetchUserID/${studentID}`);
  //     const fetchedUserID = response.data.userID;
  //     setUserID(fetchedUserID);
  //   } catch (error) {
  //     console.error('Error fetching userID:', error);
  //   }
  // };

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
    console.log(selectedLocation);
        navigation.navigate("ViewTutorProfileScreen", {tutor: selectedLocation});
      };


  const chatNowHandler = async () => {
    try {
      // await fetchUserID(); // Wait for fetchUserID to complete
      const userID = '65a5625039d219aeba1b879c';

      // Make a request to the server to check or create a chat
      const response = await axios.post('http://192.168.43.143:3000/chat/checkOrCreateChat', {
        tutorID: selectedLocation._id, // Replace with actual tutor ID
        studentID: userID, // Replace with actual student ID
      });

      const chat = response.data.chat;

      // Navigate to the chat screen with the chat details
      // navigation.navigate('StudentChat', { chat });
      // Inside the function or event where you want to navigate
    navigation.navigate("StudentChat", { chatID: chat._id, userID: userID });

    } catch (error) {
      console.error('Error checking or creating chat:', error);
    }
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
        `http://192.168.43.143:3000/tutor/tutors-nearby`,
        {
          params: {
            longitude: longitude,
            latitude: latitude,
          },
        }
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
            { label: "Chat Now", onPress: chatNowHandler },
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
