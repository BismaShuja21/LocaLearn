import React, { useState, useEffect } from "react";
import { View } from "react-native";
import {
  MyInput,
  MyButton,
  MyText,
  GapView,
  MyDropdown,
} from "../../../components";
import { Form } from "../../../assets/vectors";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function TutorProfileSetup({ route }) {
  const userID = route.params.userID;
  console.log(userID);

  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [isMapViewVisible, setIsMapViewVisible] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 24.8607, // Latitude of Karachi
    longitude: 67.0011, // Longitude of Karachi
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isEditMode, setIsEditMode] = useState({
    firstName: false,
    lastName: false,
    qualification: false,
    tutoringPreferences: false,
    subjects: false,
    availability: false,
    description: false,
    experience: false,
    address: false,
  });

  const [values, setValues] = useState({
    firstName: "Akhtar",
    lastName: "Ahmed",
    qualification: ["Masters"],
    tutoringPreferences: ["Student's Space"],
    availability: ["Monday"],
    subjects: ["Chemistry", "Biology"],
    description: "Hi i am a teacher",
    experience: "4 years",
    address: "NED University of Engineering & Technology, Karachi",
  });




  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    // Fetch tutor data when the component mounts
    const fetchTutorData = async () => {
      try {
        const response = await fetch(`http://192.168.43.143/tutor/getTutorEdit?userID=${userID}`);
        const data = await response.json();
        console.log(data);
    
        if (!response.ok || !data.success) {
          console.error('Error response:', response);
          // Handle the error here, maybe show an error message
          return;
        }
    
        // Update the tutor state with the fetched tutor data
        setTutor(data.tutor);
        console.log(tutor);
      } catch (error) {
        console.error('Error fetching tutor data:', error);
      }
    };
    
    fetchTutorData();
  }, []);




  const handleInputChange = (field, text) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: text,
    }));
  };

  const handleDropdownChange = (field, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleMultiSelectChange = (field, selectedItems) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: selectedItems,
    }));
  };

  const handleEditPress = (field) => {
    setIsEditMode((prevMode) => ({
      ...prevMode,
      [field]: !prevMode[field],
    }));
  };

  const handleCheckPress = (field) => {
    setIsEditMode((prevMode) => ({
      ...prevMode,
      [field]: false,
    }));
  };

  const toggleMapView = () => {
    setIsMapViewVisible(!isMapViewVisible);
  };

  const confirmLocation = () => {
    // Additional logic to handle location confirmation
    setIsEditMode((prevMode) => ({
      ...prevMode,
      address: false,
    }));
    setIsMapViewVisible(false);
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
        setValues((prevValues) => ({
          ...prevValues,
          address: formattedAddress,
        }));
      }
      // else {
      //   setAddress("");
      //   console.log("No address details found");
      // }
    } catch (error) {
      console.warn("Error updating address:", error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#f2f4fc",
        paddingVertical: 80,
        width: "100%",
        height: "100%",
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
          text={"Your Profile"}
          size={20}
          weight="600"
          style={{ textAlign: "center", paddingVertical: 10 }}
        />

        <View style={{ width: "100%" }}>
          <MyText
            text={"First Name"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            text={values.firstName}
            editable={isEditMode.firstName}
            inputStyle={{
              color: isEditMode.firstName ? "black" : "grey",
            }}
            rightIcon={{
              name: isEditMode.firstName ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() => handleEditPress("firstName")}
            onChange={(text) => handleInputChange("firstName", text)}
          />
        </View>
        <View style={{ width: "100%" }}>
          <MyText
            text={"Last Name"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            text={values.lastName}
            editable={isEditMode.lastName}
            inputStyle={{
              color: isEditMode.lastName ? "black" : "grey",
            }}
            rightIcon={{
              name: isEditMode.lastName ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() => handleEditPress("lastName")}
            onChange={(text) => handleInputChange("lastName", text)}
          />
        </View>

        <View style={{ width: "100%" }}>
          <MyText
            text={"Subjects"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          {isEditMode.subjects ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MyDropdown
                style={{ width: "90%" }}
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
                zIndex={9}
                onSelect={(value) => handleDropdownChange("subjects", value)}
                multiSelect={false}
                disabled={!isEditMode.subjects}
              />
              <MaterialIcons
                name="done"
                size={25}
                color="grey"
                onPress={() => handleCheckPress("subjects")}
              />
            </View>
          ) : (
            <MyInput
              text={values.subjects.join(", ")}
              editable={false}
              inputStyle={{
                color: "grey",
              }}
              rightIcon={{
                name: isEditMode.subjects ? "check" : "edit",
                size: 20,
                color: "grey",
              }}
              onIconPress={() => handleEditPress("subjects")}
            />
          )}
        </View>
        <View style={{ width: "100%" }}>
          <MyText
            text={"Qualification"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          {isEditMode.qualification ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MyDropdown
                style={{ width: "90%" }}
                placeholder="Qualification--"
                data={["Masters", "Bachelors", "Undergraduate"]}
                zIndex={9}
                onSelect={(value) =>
                  handleDropdownChange("qualification", value)
                }
                multiSelect={false}
                disabled={!isEditMode.qualification}
              />
              <MaterialIcons
                name="done"
                size={25}
                color="grey"
                onPress={() => handleCheckPress("qualification")}
              />
            </View>
          ) : (
            <MyInput
              text={values.qualification.join(", ")}
              editable={false}
              inputStyle={{
                color: "grey",
              }}
              rightIcon={{
                name: isEditMode.qualification ? "check" : "edit",
                size: 20,
                color: "grey",
              }}
              onIconPress={() => handleEditPress("qualification")}
            />
          )}
        </View>
        <View style={{ width: "100%" }}>
          <MyText
            text={"Tutoring Preferences"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          {isEditMode.tutoringPreferences ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MyDropdown
                style={{ width: "90%" }}
                placeholder="Preferences--"
                data={["Student's Space", "Tutor's Space"]}
                zIndex={8}
                onSelect={(value) =>
                  handleDropdownChange("tutoringPreferences", value)
                }
                multiSelect
                disabled={!isEditMode.tutoringPreferences}
              />
              <MaterialIcons
                name="done"
                size={25}
                color="grey"
                onPress={() => handleCheckPress("tutoringPreferences")}
              />
            </View>
          ) : (
            <MyInput
              text={values.tutoringPreferences.join(", ")}
              editable={false}
              inputStyle={{
                color: "grey",
              }}
              rightIcon={{
                name: isEditMode.tutoringPreferences ? "done" : "edit",
                size: 20,
                color: "grey",
              }}
              onIconPress={() => handleEditPress("tutoringPreferences")}
            />
          )}
        </View>

        <View style={{ width: "100%" }}>
          <MyText
            text={"Availability"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          {isEditMode.availability ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <MyDropdown
                style={{ width: "90%" }}
                placeholder="Days--"
                data={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]}
                zIndex={7}
                onSelect={(value) =>
                  handleMultiSelectChange("availability", value)
                }
                multiSelect
                disabled={!isEditMode.availability}
              />
              <MaterialIcons
                name="done"
                size={20}
                color="grey"
                onPress={() => handleCheckPress("availability")}
              />
            </View>
          ) : (
            <MyInput
              text={values.availability.join(", ")}
              editable={false}
              inputStyle={{
                color: "grey",
              }}
              rightIcon={{
                name: isEditMode.availability ? "done" : "edit",
                size: 20,
                color: "grey",
              }}
              onIconPress={() => handleEditPress("availability")}
            />
          )}
        </View>

        {/* <View style={{ width: "100%" }}>
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
        <View style={{ width: "100%" }}>
          <MyText
            text={"Address"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            text={values.address}
            editable={isEditMode.address}
            inputStyle={{
              color: isEditMode.address ? "black" : "grey",
            }}
            rightIcon={{
              name: isEditMode.address ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() => handleEditPress("address")}
            onChange={(text) => handleInputChange("address", text)}
          />
        </View> */}

        <View style={{ width: "100%" }}>
          <MyText
            text={"Address"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />

          {isEditMode.address ? (
            // In edit mode, show MapView
            <View>
              <MyInput
                text={values.address}
                editable={isEditMode.address}
                inputStyle={{
                  color: "grey",
                }}
                rightIcon={{
                  name: isEditMode.address ? "check" : "edit",
                  size: 20,
                  color: "grey",
                }}
                onIconPress={() => handleEditPress("address")}
                onChange={(text) => handleInputChange("address", text)}
              />
              {isMapViewVisible && (
                <View>
                  <MapView
                    style={{ width: "100%", height: 200, marginTop: 10 }}
                    region={mapRegion}
                    onRegionChangeComplete={(region) => {
                      setMapRegion(region);
                      updateAddress(region.latitude, region.longitude);
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
                  <View style={{ alignItems: "center" }}>
                    <MyButton
                      label="Confirm Location"
                      style={{ marginVertical: 10, width: "90%" }}
                      onPress={confirmLocation}
                    />
                  </View>
                </View>
              )}
              <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
                <MyButton
                  label={
                    isMapViewVisible ? (
                      <MaterialIcons name="close" size={15} />
                    ) : (
                      "View on Map"
                    )
                  }
                  onPress={toggleMapView}
                  style={{
                    width: isMapViewVisible ? "15%" : "80%",
                    position: isMapViewVisible ? "absolute" : "fixed",
                    // borderRadius: isMapViewVisible ? 100 : 20,
                    top: isMapViewVisible ? -250 : 0,
                    right: isMapViewVisible ? 20 : 0,
                    marginVertical: isMapViewVisible ? 0 : 10,
                  }}
                />
              </View>
            </View>
          ) : (
            // Not in edit mode, show only the address
            <MyInput
              text={values.address}
              editable={false}
              inputStyle={{
                color: "grey",
              }}
              rightIcon={{
                name: isEditMode.address ? "check" : "edit",
                size: 20,
                color: "grey",
              }}
              onIconPress={() => handleEditPress("address")}
            />
          )}
        </View>

        <View style={{ width: "100%" }}>
          <MyText
            text={"Experience"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            multiline={true}
            text={values.experience}
            editable={isEditMode.experience}
            inputStyle={{
              color: isEditMode.experience ? "black" : "grey",
              alignItems: "flex-start",
            }}
            rightIcon={{
              name: isEditMode.experience ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() => handleEditPress("experience")}
            onChange={(text) => handleInputChange("experience", text)}
          />
        </View>

        <View style={{ width: "100%" }}>
          <MyText
            text={"Description"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput
            multiline={true}
            text={values.description}
            editable={isEditMode.description}
            inputStyle={{
              color: isEditMode.description ? "black" : "grey",
            }}
            rightIcon={{
              name: isEditMode.description ? "check" : "edit",
              size: 20,
              color: "grey",
            }}
            onIconPress={() => handleEditPress("description")}
            onChange={(text) => handleInputChange("description", text)}
          />
        </View>

        <GapView length={15} />
        <MyButton
          label={"Logout"}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        />
      </View>
      <GapView length={100} />
    </ScrollView>
  );
}
