import React, { useState } from "react";
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
import axios from 'axios';



export default function TutorProfileSetup({ route }) {
  const userId = route.params.ID;
  const [page2, setPage2] = useState(false);
    const [tutorDetails, setTutorDetails] = useState({
    userId: userId,  
    firstName: '',
    lastName: '',
    qualification: '',
    availability: [],
    description: '',
    experience: '',
    tutoringPreferences: [],
  });


  const navigation = useNavigation();


  const handleInputChange = (field, value) => {
    setTutorDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };


  const handleCreateTutorProfile = async () => {
    try {
      const response = await axios.post('http://192.168.43.142:3000/api/profileSetup', tutorDetails);

      console.log('Server Response:', response.data);

      // Navigate to the appropriate screen or handle success as needed
      navigation.navigate('TutorTab');
    } catch (error) {
      console.error('Error creating tutor profile:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f2f4fc",
        paddingVertical: 100,
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
              }} />
            </View>
            <View style={{ width: "100%" }}>
              <MyText
                text={"Experience"}
                style={{ paddingLeft: 5, paddingBottom: 5 }}
              />
              <MyInput style={{ height: 90 }}
               multiline={true}
               onChange={(value) => {
              handleInputChange("experience", value);
              }} />
            </View>
            <GapView length={40} />
            <MyButton
              label={"Complete Profile"}
              // onPress={() => {
              //   console.log("Prifle Setted Up:")
              //   console.log(tutorDetails);
              //   navigation.navigate("TutorTab");
              // }}
              onPress={handleCreateTutorProfile}

            />
          </>
        ) : (
          <>
            <View style={{ width: "100%" }}>
              <MyText
                text={"First Name"}
                style={{ paddingLeft: 5, paddingBottom: 5 }}
              />
              <MyInput onChange={(value) => {
                handleInputChange("firstName", value);
              }}/>
            </View>
            <View style={{ width: "100%" }}>
              <MyText
                text={"Last Name"}
                style={{ paddingLeft: 5, paddingBottom: 5 }}
              />
              <MyInput onChange={(value) => {
                handleInputChange("lastName", value);
              }}/>
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
                data={["Student_house", "Tutor_house"]}
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
  );
}
