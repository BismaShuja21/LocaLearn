import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  MyInput,
  MyButton,
  MyText,
  GapView,
  MyDropdown,
} from "../../../components";
import { Form } from "../../../assets/vectors";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { useEffect } from "react";
import * as Location from "expo-location";

export default function TutorProfileSetup() {
  const [page2, setPage2] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 24.8607, // Latitude of Karachi
    longitude: 67.0011, // Longitude of Karachi
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [address, setAddress] = useState("");
  const [tutorDetails, setTutorDetails] = useState({
    firstName: "",
    lastName: "",
    qualification: "",
    availability: [],
    description: "",
    experience: "",
  });
  const navigation = useNavigation();

  const handleInputChange = (field, value) => {
    setTutorDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
    console.log(tutorDetails);
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

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setMapRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
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
        setAddress(formattedAddress);
      } else {
        setAddress("");
        console.log("No address details found");
      }
    } catch (error) {
      console.warn("Error updating address:", error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    getCurrentLocation(); // Optionally set the initial location
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "#f2f4fc",
          paddingTop: 100,
          paddingBottom: 30,
          width: "100%",
          height: "100%",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            alignSelf: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Form width={150} height={120} style={{ marginLeft: 20 }} />
          <MyText
            text={"Please Enter details to proceed"}
            size={20}
            style={{ textAlign: "center", paddingVertical: 10 }}
          />
          {page2 ? (
            <>
              <View style={{ width: "100%" }}>
                <MyText
                  text={"Availability"}
                  style={{ paddingLeft: 5, paddingBottom: 5 }}
                />
                <MyDropdown
                  placeholder="Days--"
                  data={[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thurday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ]}
                  zIndex={8}
                  onSelect={(value) => {
                    handleInputChange("availability", value);
                    console.log(value);
                  }}
                  multiSelect
                />
              </View>
              <View style={{ width: "100%" }}>
                <MyText
                  text={"Description"}
                  style={{ paddingLeft: 5, paddingBottom: 5 }}
                />
                <MyInput
                  style={{ height: 90 }}
                  multiline={true}
                  onChange={(value) => {
                    handleInputChange("description", value);
                  }}
                />
              </View>
              <View style={{ width: "100%" }}>
                <MyText
                  text={"Experience"}
                  style={{ paddingLeft: 5, paddingBottom: 5 }}
                />
                <MyInput
                  style={{ height: 90 }}
                  multiline={true}
                  onChange={(value) => {
                    handleInputChange("experience", value);
                  }}
                />
              </View>
              <GapView length={40} />
              <MyButton
                label={"Complete Profile"}
                onPress={() => {
                  console.log("Prifle Setted Up:");
                  console.log(tutorDetails);
                  navigation.navigate("TutorTab");
                }}
              />
            </>
          ) : (
            <>
              <View style={{ width: "100%" }}>
                <MyText
                  text={"First Name"}
                  style={{ paddingLeft: 5, paddingBottom: 5 }}
                />
                <MyInput
                  onChange={(value) => {
                    handleInputChange("firstName", value);
                  }}
                />
              </View>
              <View style={{ width: "100%" }}>
                <MyText
                  text={"Last Name"}
                  style={{ paddingLeft: 5, paddingBottom: 5 }}
                />
                <MyInput
                  onChange={(value) => {
                    handleInputChange("lastName", value);
                  }}
                />
              </View>
              <View style={{ width: "100%" }}>
                <MyText
                  text={"Qualification"}
                  style={{ paddingLeft: 5, paddingBottom: 5 }}
                />
                <MyDropdown
                  placeholder="Qualification--"
                  data={["Masters", "Bacehelors", "Undergraduate"]}
                  zIndex={9}
                  // onSelect={(value) => {
                  //   console.log("data", value);
                  // }}
                  onSelect={(value) => {
                    handleInputChange("qualification", value);
                  }}
                />
              </View>
              <View style={{ width: "100%" }}>
                <MyText
                  text={"Tutoring Preferences"}
                  style={{ paddingLeft: 5, paddingBottom: 5 }}
                />
                <MyDropdown
                  placeholder="Preferences--"
                  data={["Student's Space", "Tutor's Space"]}
                  zIndex={8}
                  // onSelect={(value) => {
                  //   console.log("data", value);
                  // }}
                  onSelect={(value) => {
                    handleInputChange("tutoringPreferences", value);
                  }}
                  multiSelect
                />
              </View>
              <View style={{ width: "100%" }}>
                <MyText
                  text={"Subjects"}
                  style={{ paddingLeft: 5, paddingBottom: 5 }}
                />
                <MyDropdown
                  placeholder="Subjects--"
                  data={[
                    "Biology",
                    "Chemistry",
                    "Computer Science",
                    "Calculus",
                    "Economics",
                    "English",
                    "Finance",
                    "Geography",
                    "History",
                    "Islamiat",
                    "Mathematics",
                    "Physics",
                    "Social Studies",
                    "Urdu",
                    "Others",
                  ]}
                  zIndex={6}
                  // onSelect={(value) => {
                  //   console.log("data", value);
                  // }}
                  onSelect={(value) => {
                    handleInputChange("tutoringPreferences", value);
                  }}
                  multiSelect
                />
              </View>
              <View style={{ width: "100%" }}>
                <MyText
                  text={"Address"}
                  style={{ paddingLeft: 5, paddingBottom: 5 }}
                />
                <MyInput
                  value={address}
                  placeholder={address}
                  onChange={(value) => {
                    setAddress(value);
                    console.log(value);
                  }}
                />
                <MapView
                  style={{ width: "100%", height: 200, marginTop: 10 }}
                  region={mapRegion}
                  onRegionChangeComplete={(region) => {
                    setMapRegion(region);
                    updateAddress(region.latitude, region.longitude);
                    console.log(region.latitude);
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: mapRegion.latitude,
                      longitude: mapRegion.longitude,
                    }}
                    title="Selected Location"
                  />
                </MapView>
              </View>

              <GapView length={30} />
              <MyButton
                label={"Proceed"}
                onPress={() => {
                  setPage2(true);
                }}
              />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
