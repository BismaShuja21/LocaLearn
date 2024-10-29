import React, { useState, useEffect } from "react";
import { MyInput, MyText, TutorInfoModal } from "../../../components";
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import axios from "axios";
import { useSelector } from "react-redux";
import { LightTheme, DarkTheme } from "../../../theme/theme";

const MapWithMarkers = ({ route }) => {
  const studentID = route.params.userID;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [userID, setUserID] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [dummyLocations, setDummyLocations] = useState([]);
  const theme = useSelector((state) => state.theme.theme);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;

  const navigation = useNavigation();
  const dummyData = [
    {
      id: 1,
      name: "Malir Cantt",
      latitude: 24.9611,
      longitude: 67.2237,
    },
    {
      id: 2,
      name: "NED University",
      latitude: 24.9316,
      longitude: 67.1134,
    },
    {
      id: 3,
      name: "Karachi University",
      latitude: 24.9434,
      longitude: 67.1294,
    },
    {
      id: 4,
      name: "Clifton",
      latitude: 24.827847230640817,
      longitude: 67.0258423590166,
    },
    {
      id: 5,
      name: "DHA Phase 8",
      latitude: 24.767871449230185,
      longitude: 67.06215469980667,
    },
    {
      id: 6,
      name: "Korangi",
      latitude: 24.83848652016906,
      longitude: 67.120875445847,
    },
    {
      id: 7,
      name: "Gulshan-e-Jauhar Block 1",
      latitude: 24.927767251195757,
      longitude: 67.12280944683364,
    },
    {
      id: 8,
      name: "Gulshan-e-Jauhar Block 2",
      latitude: 24.929697986820905,
      longitude: 67.13018524937691,
    },
    {
      id: 9,
      name: "Gulshan-e-Jauhar Block 3",
      latitude: 24.92577416817418,
      longitude: 67.13206120709062,
    },
    {
      id: 10,
      name: "Gulshan-e-Jauhar Block 4",
      latitude: 24.93086726297164,
      longitude: 67.13790486517411,
    },
    {
      id: 11,
      name: "Gulshan-e-Jauhar Block 5",
      latitude: 24.92915493100249,
      longitude: 67.1441275895311,
    },
    {
      id: 12,
      name: "Gulshan-e-Jauhar Block 6",
      latitude: 24.932382772081795,
      longitude: 67.14665676322417,
    },
    {
      id: 13,
      name: "Gulshan-e-Jauhar Block 7",
      latitude: 24.935256823579234,
      longitude: 67.15229135597329,
    },
    {
      id: 14,
      name: "Gulshan-e-Jauhar Block 8",
      latitude: 24.93148368019575,
      longitude: 67.15674686449682,
    },
    {
      id: 15,
      name: "Shahrah-e-Faisal",
      latitude: 24.8819561833702,
      longitude: 67.11212806766619,
    },
    {
      id: 16,
      name: "Pakistan Chowk",
      latitude: 24.8628,
      longitude: 67.0056,
    },
    {
      id: 17,
      name: "Haidery",
      latitude: 24.9178,
      longitude: 67.0752,
    },
    {
      id: 18,
      name: "Saddar",
      latitude: 24.861797704408477,
      longitude: 67.02960339087798,
    },
    {
      id: 19,
      name: "Nazimabad",
      latitude: 24.91149133426919,
      longitude: 67.03200987003532,
    },
    {
      id: 20,
      name: "Surjani Town",
      latitude: 25.0088,
      longitude: 67.1396,
    },
    {
      id: 21,
      name: "Landhi",
      latitude: 24.8576,
      longitude: 67.1644,
    },
    {
      id: 22,
      name: "Kharadar",
      latitude: 24.851,
      longitude: 66.9999,
    },
    {
      id: 23,
      name: "KPT",
      latitude: 24.8135,
      longitude: 66.9885,
    },
    {
      id: 24,
      name: "Jamshed Quarters",
      latitude: 24.882,
      longitude: 67.0215,
    },
    {
      id: 25,
      name: "Malahar",
      latitude: 24.9437,
      longitude: 67.0568,
    },
    {
      id: 26,
      name: "Gulshan-e-Iqbal",
      latitude: 24.91738900099056,
      longitude: 67.09187192425175,
    },
    {
      id: 27,
      name: "Gulshan-e-Maymar",
      latitude: 25.02222020674381,
      longitude: 67.13368011802216,
    },
  ];

  const darkMapStyle = [
    {
      elementType: "geometry",
      stylers: [{ color: "#212121" }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#f2f2f2" }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#212121" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#181818" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ color: "#787878" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#3d85c6" }],
    },
  ];

  const fetchUserID = async () => {
    try {
      const response = await axios.get(
        `http://  10.57.156.30/student/fetchUserID/${studentID}`
      );
      const fetchedUserID = response.data.userID;
      setUserID(fetchedUserID);
    } catch (error) {
      console.error("Error fetching userID:", error);
    }
  };

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
    navigation.navigate("ViewTutorProfileScreen", { tutor: selectedLocation });
  };

  const chatNowHandler = async () => {
    try {
      const response = await axios.post("/checkOrCreateChat", {
        tutorID: selectedLocation._id,
        studentID: userID,
      });

      const chat = response.data.chat;
      navigation.navigate("StudentChat", { chatID: chat._id, userID: userID });
    } catch (error) {
      console.error("Error checking or creating chat:", error);
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
        const { name, street, postalCode, city, region, country } =
          addressResponse[0];
        const formattedAddress = `${name || street || postalCode || ""}, ${
          city || region || country
        }`;
        // Use formattedAddress if needed
      } else {
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
        `http://  10.57.156.30:3000/tutor/tutors-nearby`,
        {
          params: {
            longitude: longitude,
            latitude: latitude,
          },
        }
      );
      setTutors(response.data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredLocations([]);
    } else {
      const filtered = dummyLocations.filter((location) =>
        location.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };

  const handleMarkerPress = (location) => {
    setSelectedLocation(location);
    setModalVisible(true);
  };

  const handleSearchItemPress = (item) => {
    setSearchText(item.name);
    setRegion({
      latitude: item.latitude,
      longitude: item.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setFilteredLocations([]);
  };

  useEffect(() => {
    fetchUserID();
    requestLocationPermission();
    getCurrentLocation();
    setDummyLocations(dummyData);
  }, []);

  useEffect(() => {
    if (currentLocation) {
      setRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      fetchTutorsNearby();
    }
  }, [currentLocation]);

  return (
    <View style={styles.container}>
      {/* Map View */}
      {region && (
        <MapView
          style={styles.map}
          customMapStyle={currentTheme.dark === true ? darkMapStyle : null}
          region={region}
        >
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
          {filteredLocations.map((location) => (
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
      )}

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: currentTheme.colors.background,
              color: currentTheme.colors.text,
            },
          ]}
          placeholder="Search location..."
          placeholderTextColor={currentTheme.colors.placeholder}
          value={searchText}
          onChangeText={handleSearch}
        />
        {/* Display search results as a list */}
        <View style={styles.searchResultsContainer}>
          <FlatList
            nestedScrollEnabled={true}
            data={filteredLocations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.searchItem,
                  {
                    borderColor: currentTheme.colors.border,
                    backgroundColor: currentTheme.colors.background,
                  },
                ]}
                onPress={() => handleSearchItemPress(item)}
              >
                <Text style={{ color: currentTheme.colors.text }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* Modal for displaying tutor information */}
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
  searchContainer: {
    position: "absolute",
    top: 50, // Adjust this value to position the search bar
    left: 10,
    right: 10,
    zIndex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 8,
    backgroundColor: "white",
  },
  searchItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  searchResults: {
    position: "absolute",
    top: 40, // Below the search input
    left: 10,
    right: 10,
    maxHeight: 200,
    zIndex: 1,
  },
});

export default MapWithMarkers;
