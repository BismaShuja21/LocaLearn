import React, { useState } from "react";
import { View } from "react-native";
import { GapView, MyButton, MyInput, MyText } from "../../../components";
import { Form } from "../../../assets/vectors";
import { useNavigation } from "@react-navigation/native";
import StudentProfile from "./StudentProfile";
import axios from 'axios';



export default function StudentProfileSetup({ route }) {
  const userId = route.params.ID;
  const [studentDetails, setStudentDetails] = useState({
    userId: userId,  
    firstName: '',
    lastName: '',
    age: '',
    grade: '',
  });

  const navigation = useNavigation();

  const handleInputChange = (field, value) => {
    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };


  const handleCreateStudentProfile = async () => {
    try {
      const response = await axios.post('http://192.168.43.143:3000/student/profileSetup', studentDetails);

      console.log('Server Response:', response.data);

      // Navigate to the appropriate screen or handle success as needed
      navigation.navigate('StudentTab', {userID: userId});
    } catch (error) {
      console.error('Error creating tutor profile:', error);
    }
  };


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f2f4fc",
        paddingVertical: 120,
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

        <View style={{ width: "100%" }}>
          <MyText
            text={"First Name"}
            style={{ paddingLeft: 5, paddingBottom: 5 }}
          />
          <MyInput  onChange={(value) => {
                handleInputChange("firstName", value);
              }} />
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
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "47%" }}>
            <MyText text={"Age"} style={{ paddingLeft: 5, paddingBottom: 5 }} />
            <MyInput onChange={(value) => {
                handleInputChange("age", value);
              }}/>
          </View>
          <View style={{ width: "47%" }}>
            <MyText
              text={"Grade"}
              style={{ paddingLeft: 5, paddingBottom: 5 }}
            />
            <MyInput onChange={(value) => {
                handleInputChange("grade", value);
              }}/>
          </View>
        </View>
        <GapView length={30} />
        <MyButton
          label={"Submit"}
          // onPress={() => {
          //   navigation.navigate("StudentTab");
          // }}
          onPress={handleCreateStudentProfile}

        />
      </View>
    </View>
  );
}
