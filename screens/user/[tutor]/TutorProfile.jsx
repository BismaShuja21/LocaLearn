import React, { useState, useEffect } from "react";
import {
  View,
  Switch,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { LightTheme, DarkTheme } from "../../../theme/theme";
import { setLightTheme, toggleTheme } from "../../../redux/themeSlice";

export default function TutorProfileSetup({ route }) {
  const userID = route.params.userID;
  console.log(userID);
  const dispatch = useDispatch();
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [dummyLocations, setDummyLocations] = useState([]);

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
    area: false,
  });

  const [values, setValues] = useState({
    firstName: "Robert",
    lastName: "Brown",
    qualification: ["Bachelors"],
    tutoringPreferences: ["Student's Space"],
    availability: ["Monday", "Tuesday"],
    subjects: ["Chemistry", "Biology", "Mathematics"],
    description:
      "Hi, I'm Robert, an A-level graduate offering tutoring for students from grade 5 to A-levels in Karachi. I focus on personalized learning to help you succeed in all subjects.",
    experience: "2 years",
    area: "Gulistan-e-Jauhar Block 1",
    address: "Gulistan-e-Jauhar Block 1, House # 101 ",
  });

  const theme = useSelector((state) => state.theme.theme);
  const currentTheme = theme === "light" ? LightTheme : DarkTheme;
  const [tutor, setTutor] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [searchText, setSearchText] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [dummyAreas, setDummyAreas] = useState([
    {
      id: 1,
      name: "Malir Cantt",
    },
    {
      id: 2,
      name: "NED University",
    },
    {
      id: 3,
      name: "Karachi University",
    },
    {
      id: 4,
      name: "Clifton",
    },
    {
      id: 5,
      name: "DHA Phase 8",
    },
    {
      id: 6,
      name: "Korangi",
    },
    {
      id: 7,
      name: "Gulistan-e-Jauhar Block 1",
    },
    {
      id: 8,
      name: "Gulistan-e-Jauhar Block 2",
    },
    {
      id: 9,
      name: "Gulistan-e-Jauhar Block 3",
    },
    {
      id: 10,
      name: "Gulistan-e-Jauhar Block 4",
    },
    {
      id: 11,
      name: "Gulistan-e-Jauhar Block 5",
    },
    {
      id: 12,
      name: "Gulistan-e-Jauhar Block 6",
    },
    {
      id: 13,
      name: "Gulistan-e-Jauhar Block 7",
    },
    {
      id: 14,
      name: "Gulistan-e-Jauhar Block 8",
    },
    {
      id: 15,
      name: "Shahrah-e-Faisal",
    },

    {
      id: 17,
      name: "Haidery",
    },
    {
      id: 18,
      name: "Saddar",
    },
    {
      id: 19,
      name: "Nazimabad",
    },
    {
      id: 20,
      name: "Surjani Town",
    },
    {
      id: 21,
      name: "Landhi",
    },
    {
      id: 22,
      name: "Kharadar",
    },
    {
      id: 23,
      name: "KPT",
    },
    {
      id: 24,
      name: "Jamshed Quarters",
    },
    {
      id: 25,
      name: "Malahar",
    },
    {
      id: 26,
      name: "Gulshan-e-Iqbal Block 1",
    },
    {
      id: 27,
      name: "Gulshan-e-Iqbal Block 2",
    },
    {
      id: 28,
      name: "Gulshan-e-Iqbal Block 3",
    },
    {
      id: 29,
      name: "Gulshan-e-Iqbal Block 4",
    },
    {
      id: 30,
      name: "Gulshan-e-Iqbal Block 5",
    },
    {
      id: 31,
      name: "Gulshan-e-Iqbal Block 6",
    },
    {
      id: 32,
      name: "Gulshan-e-Iqbal Block 7",
    },
    {
      id: 33,
      name: "Gulshan-e-Iqbal Block 8",
    },
    {
      id: 34,
      name: "Gulshan-e-Iqbal Block 9",
    },
    {
      id: 35,
      name: "Gulshan-e-Iqbal Block 10",
    },
    {
      id: 36,
      name: "Pakistan Chowk",
    },
    {
      id: 37,
      name: "Mazar-e-Quaid",
    },
    {
      id: 38,
      name: "Frere Hall",
    },
    {
      id: 39,
      name: "Sea View",
    },
    {
      id: 40,
      name: "Hawksbay",
    },
    {
      id: 41,
      name: "Mohatta Palace",
    },
    {
      id: 42,
      name: "Empress Market",
    },
    {
      id: 43,
      name: "Chowrangi",
    },
    {
      id: 44,
      name: "Jinnah International Airport",
    },
    {
      id: 45,
      name: "National Stadium",
    },
    {
      id: 46,
      name: "Lyari",
    },
    {
      id: 47,
      name: "Shah Faisal Colony",
    },
    {
      id: 48,
      name: "North Nazimabad",
    },
    {
      id: 49,
      name: "Gulshan-e-Hadeed",
    },
    {
      id: 50,
      name: "Kokrapar",
    },
    {
      id: 51,
      name: "Gulshan-e-Maymar",
    },
    // Add more famous areas as needed
  ]);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await fetch(
          `http://10.57.17.49/tutor/getTutorEdit?userID=${userID}`
        );
        const data = await response.json();

        if (!response.ok || !data.success) {
          console.error("Error response:", response);
          return;
        }

        const tutorData = data.tutor;

        // Set form values with fetched data
        setValues({
          firstName: tutorData.firstName || "N/A",
          lastName: tutorData.lastName || "N/A",
          qualification: tutorData.qualification || [],
          tutoringPreferences: tutorData.tutorPreference || [],
          availability: tutorData.availability || [],
          subjects: tutorData.subjects || [],
          description: tutorData.description || "",
          experience: tutorData.experience || "",
          address: tutorData.location?.coordinates || "",
        });

        setTutor(tutorData);
      } catch (error) {
        console.error("Error fetching tutor data:", error);
      }
    };

    fetchTutorData();
  }, []);
  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredAreas([]); // Clear search results when input is empty
    } else {
      const filtered = dummyAreas.filter((area) =>
        area.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAreas(filtered);
    }
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area.name); // Set selected area to TextInput
    setSearchText(area.name); // Update searchText with selected area
    setFilteredAreas([]); // Hide search results
  };

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
      style={[
        {
          flex: 1,
          paddingVertical: 80,
          width: "100%",
          height: "100%",
          paddingHorizontal: 20,
        },
        { backgroundColor: currentTheme.colors.background },
      ]}
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
            style={{
              paddingLeft: 5,
              paddingBottom: 5,
            }}
          />
          <MyInput
            text={values.firstName}
            editable={isEditMode.firstName}
            inputStyle={{
              color: isEditMode.firstName ? currentTheme.colors.text : "grey",
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
              color: isEditMode.lastName ? currentTheme.colors.text : "grey",
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
                style={{
                  width: "90%",
                  borderColor: currentTheme.colors.border,
                }}
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
                style={{
                  width: "90%",
                  borderColor: currentTheme.colors.border,
                }}
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
                style={{
                  width: "90%",
                  borderColor: currentTheme.colors.border,
                }}
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
                style={{
                  width: "90%",
                  borderColor: currentTheme.colors.border,
                }}
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
          <MyText text={"Area"} style={{ paddingLeft: 5, paddingBottom: 5 }} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isEditMode.area ? (
              // When in edit mode, show the TextInput
              <TextInput
                value={searchText} // Using searchText for the value
                editable={isEditMode.area}
                style={[
                  styles.input,
                  {
                    flex: 1, // Take available space
                    color: currentTheme.colors.text,
                    backgroundColor: currentTheme.colors.background,
                  },
                ]}
                placeholder="Search area..."
                placeholderTextColor={currentTheme.colors.placeholder}
                onChangeText={handleSearch}
              />
            ) : (
              // When not in edit mode, show the MyInput
              <MyInput
                text={values.area} // Use updated area value
                editable={false}
                inputStyle={{
                  color: "grey",
                }}
                rightIcon={{
                  name: "edit", // Edit icon
                  size: 20,
                  color: "grey",
                }}
                onIconPress={() => handleEditPress("area")} // Toggle to edit mode
              />
            )}

            {isEditMode.area && (
              <TouchableOpacity
                onPress={() => {
                  // Check if searchText is not empty before confirming
                  if (searchText) {
                    // Update values.area with the selected area name
                    setValues((prevValues) => ({
                      ...prevValues,
                      area: searchText, // Update area to selected value
                    }));

                    handleAreaSelect({ name: searchText }); // Set the selected area based on search text
                  }
                  handleEditPress("area"); // Toggle off edit mode
                }}
                style={{ marginLeft: 10 }} // Spacing between TextInput and icon
              >
                <MaterialIcons
                  name="check"
                  size={20}
                  color={currentTheme.dark ? "grey" : "black"} // Ensures it evaluates to a valid string
                />
              </TouchableOpacity>
            )}
          </View>

          {isEditMode.area && filteredAreas.length > 0 && (
            <FlatList
              data={filteredAreas}
              keyExtractor={(item) => item.id.toString()}
              style={[styles.searchResults, { maxHeight: 150 }]}
              nestedScrollEnabled={true} // Enable nested scrolling for FlatList
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.searchItem,
                    {
                      borderColor: currentTheme.colors.border,
                      backgroundColor: currentTheme.colors.background,
                      width: "90%",
                      color: currentTheme.colors.text,
                      position: "relative",
                    },
                  ]}
                  onPress={() => {
                    // When an area is selected from the list
                    setValues((prevValues) => ({
                      ...prevValues,
                      area: item.name, // Update area to the selected item's name
                    }));
                    handleEditPress("area"); // Toggle off edit mode
                  }}
                >
                  <MyText style={{ color: currentTheme.colors.text }}>
                    {item.name}
                  </MyText>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

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
                  color: currentTheme.colors.text,
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
              color: isEditMode.experience ? currentTheme.colors.text : "grey",
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
              color: isEditMode.description ? currentTheme.colors.text : "grey",
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <MyText
            text={"Dark Mode"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <Switch
            trackColor={{ false: "#767577", true: "#f2f2f2" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={() => dispatch(toggleTheme(), toggleSwitch())}
            value={isEnabled}
          />
        </View>

        <GapView length={15} />
        <MyButton
          label={"Logout"}
          onPress={() => {
            navigation.navigate("SignIn");
            dispatch(setLightTheme());
          }}
        />
      </View>
      <GapView length={100} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 20,
  },
  searchItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
  searchResults: {
    maxHeight: 150, // Limit the height for search results
    marginTop: 5,
  },
});
